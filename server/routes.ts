import type { Express, static as expressStatic } from "express";
import express from "express";
import multer from "multer";
import { db } from "../db";
import { analyses } from "../db/schema";
import { analyze5SFromImages } from "./services/anthropic";
import sharp from "sharp";
import fs from 'fs/promises';
import path from 'path';
import { eq } from 'drizzle-orm';

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
  // Serve static images from reports directory
  app.use('/reports', express.static(path.join(process.cwd(), 'public', 'reports')));

  app.post('/api/analyze', upload.array('photos', 4), async (req, res) => {
    try {
      if (!req.files || !Array.isArray(req.files)) {
        return res.status(400).json({ error: 'No files uploaded' });
      }

      // Convert images to base64 for analysis
      const base64Images = await Promise.all(
        req.files.map(async (file) => {
          const buffer = await sharp(file.buffer)
            .jpeg({ quality: 80 })
            .toBuffer();
          return buffer.toString('base64');
        })
      );

      // Analyze images
      const analysis = await analyze5SFromImages(base64Images);

      // Store analysis in database
      const result = await db.insert(analyses).values({
        scores: analysis,
        imageUrls: [], // Will be updated after saving images
      }).returning();

      // Get the base URL for images
      const protocol = req.protocol;
      const host = req.get('host');
      const baseUrl = `${protocol}://${host}`;

      // Save images with analysis ID
      const savedImagePaths = await Promise.all(
        req.files.map(async (file, index) => {
          const timestamp = Date.now();
          const analysisId = result[0].id;
          const filename = `${analysisId}-${timestamp}-${index}.jpg`;
          const filepath = path.join(reportsDir, filename);
          
          await sharp(file.buffer)
            .jpeg({ quality: 80 })
            .toFile(filepath);
          
          return `${baseUrl}/reports/${filename}`;
        })
      );

      // Update analysis with image URLs
      await db.update(analyses)
        .set({ imageUrls: savedImagePaths })
        .where(eq(analyses.id, result[0].id));

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
      const results = await db.select().from(analyses).orderBy(desc(analyses.createdAt));
      res.json(results);
    } catch (error) {
      console.error('Failed to fetch analyses:', error);
      res.status(500).json({ error: 'Failed to fetch analyses' });
    }
  });
}
