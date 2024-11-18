import Anthropic from '@anthropic-ai/sdk';
import type { Analysis } from '../../client/src/lib/types';

// the newest Anthropic model is "claude-3-5-sonnet-20241022" which was released October 22, 2024
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function analyze5SFromImages(imageBase64Array: string[]): Promise<Analysis> {
  try {
    const prompt = `Analyze these workplace images using 5S methodology. For each category, provide detailed analysis with clear paragraph breaks:

Sort (Seiri):
[Analysis and score]

Set in Order (Seiton):
[Analysis and score]

Shine (Seiso):
[Analysis and score]

Standardize (Seiketsu):
[Analysis and score]

Sustain (Shitsuke):
[Analysis and score]

Provide scores out of 100 for each category and an overall score. Format suggestions with double line breaks between sections. Return in JSON format with keys: overallScore, scores (object), and suggestions (string with \n\n between sections).`;

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [{
        role: "user",
        content: [
          {
            type: "text",
            text: prompt
          },
          ...imageBase64Array.map(base64 => ({
            type: "image",
            source: {
              type: "base64",
              media_type: "image/jpeg",
              data: base64
            }
          }))
        ]
      }]
    });

    const result = JSON.parse(response.content[0].text);
    return {
      ...result,
      location: '',
      department: '',
      workStation: '',
      imageUrls: [] // We'll handle image URLs on the client side
    } as Analysis;
  } catch (error) {
    console.error('Anthropic analysis failed:', error);
    throw new Error('Failed to analyze images');
  }
}
