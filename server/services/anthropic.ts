import Anthropic from '@anthropic-ai/sdk';
import type { Analysis } from '../../client/src/lib/types';

// the newest Anthropic model is "claude-3-5-sonnet-20241022" which was released October 22, 2024
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function analyze5SFromImages(imageBase64Array: string[]): Promise<Analysis> {
  try {
    const prompt = `Analyze these workplace images using 5S methodology and return a JSON object with the following structure:
{
  "overallScore": number,
  "scores": {
    "sort": number,
    "setInOrder": number,
    "shine": number,
    "standardize": number,
    "sustain": number
  },
  "suggestions": string
}

For each category, analyze:

Sort (Seiri):
[Analyze organization and unnecessary items]

Set in Order (Seiton):
[Analyze layout and item placement]

Shine (Seiso):
[Analyze cleanliness and maintenance]

Standardize (Seiketsu):
[Analyze processes and visual management]

Sustain (Shitsuke):
[Analyze adherence to standards]

Provide specific scores out of 100 for each category. Format suggestions with clear paragraph breaks using \\n\\n between sections.`;

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      temperature: 0.7,
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

    // Extract and validate response
    const responseText = response.content[0].text;
    try {
      // Remove any potential markdown formatting
      const jsonStr = responseText.replace(/```json\n?|\n?```/g, '').trim();
      const result = JSON.parse(jsonStr);
      
      // Validate response structure
      if (!result.overallScore || !result.scores || !result.suggestions) {
        throw new Error('Invalid response format');
      }
      
      // Validate score structure
      const requiredScores = ['sort', 'setInOrder', 'shine', 'standardize', 'sustain'];
      for (const score of requiredScores) {
        if (typeof result.scores[score] !== 'number') {
          throw new Error(`Missing or invalid score: ${score}`);
        }
      }
      
      return {
        ...result,
        location: '',
        department: '',
        workStation: '',
        imageUrls: [] // We'll handle image URLs on the client side
      } as Analysis;
    } catch (error) {
      console.error('Failed to parse Anthropic response:', responseText);
      throw new Error('Failed to analyze images: Invalid response format');
    }
  } catch (error) {
    console.error('Anthropic analysis failed:', error);
    throw new Error('Failed to analyze images');
  }
}
