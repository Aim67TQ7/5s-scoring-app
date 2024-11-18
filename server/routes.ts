import type { Express } from "express";
import multer from "multer";
import { db } from "../db";
import { analyses } from "../db/schema";
import { analyze5SFromImages } from "./services/anthropic";
import sharp from "sharp";
import fs from 'fs/promises';
import path from 'path';

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { 
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 4 
  }
});

// Create Reports directory if it doesn't exist
const reportsDir = path.join(process.cwd(), 'public', 'reports');
await fs.mkdir(reportsDir, { recursive: true });

export function registerRoutes(app: Express) {
  app.post('/api/analyze', upload.array('photos', 4), async (req, res) => {
    try {
      if (!req.files || !Array.isArray(req.files)) {
        return res.status(400).json({ error: 'No files uploaded' });
      }

      // Save images and get their paths
      const savedImagePaths = await Promise.all(
        req.files.map(async (file, index) => {
          const timestamp = Date.now();
          const filename = `${timestamp}-${index}.jpg`;
          const filepath = path.join(reportsDir, filename);
          
          // Save optimized image
          await sharp(file.buffer)
            .jpeg({ quality: 80 })
            .toFile(filepath);
          
          return `/reports/${filename}`;
        })
      );

      // Convert images to base64 for analysis
      const base64Images = await Promise.all(
        req.files.map(async (file) => {
          // Convert to JPEG and optimize
          const buffer = await sharp(file.buffer)
            .jpeg({ quality: 80 })
            .toBuffer();
          return buffer.toString('base64');
        })
      );

      // Analyze images
      const analysis = await analyze5SFromImages(base64Images);

      // Store analysis in database with image URLs
      const result = await db.insert(analyses).values({
        scores: analysis,
        imageUrls: savedImagePaths,
      });

      // Return analysis with image URLs
      res.json({
        ...analysis,
        imageUrls: savedImagePaths
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      res.status(500).json({ error: 'Failed to analyze images' });
    }
  });

  app.get('/api/analyses', async (req, res) => {
    try {
      const results = await db.select().from(analyses).orderBy(analyses.createdAt);
      res.json(results);
    } catch (error) {
      console.error('Failed to fetch analyses:', error);
      res.status(500).json({ error: 'Failed to fetch analyses' });
    }
  });
}
