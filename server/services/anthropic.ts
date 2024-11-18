import Anthropic from '@anthropic-ai/sdk';
import type { Analysis } from '../../client/src/lib/types';

// the newest Anthropic model is "claude-3-5-sonnet-20241022" which was released October 22, 2024
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function analyze5SFromImages(imageBase64Array: string[]): Promise<Analysis> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [{
        role: "user",
        content: [
          {
            type: "text",
            text: "Analyze these workplace images using 5S methodology (Sort, Set in Order, Shine, Standardize, Sustain). Provide scores out of 100 for each category and an overall score. Also provide improvement suggestions. Return the results in JSON format with keys: overallScore, scores (object with sort, setInOrder, shine, standardize, sustain), and suggestions."
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
    return result as Analysis;
  } catch (error) {
    console.error('Anthropic analysis failed:', error);
    throw new Error('Failed to analyze images');
  }
}
