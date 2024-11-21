import Anthropic from '@anthropic-ai/sdk';
import type { Analysis } from '../../client/src/lib/types';

// the newest Anthropic model is "claude-3-5-sonnet-20241022" which was released October 22, 2024
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function analyze5SFromImages(imageBase64Array: string[]): Promise<Analysis> {
  try {

    const prompt = `As a 5S expert, analyze these workplace images and provide a detailed assessment in this JSON format:

{
  "overallScore": number (0-100),
  "scores": { "sort": number, "setInOrder": number, "shine": number, "standardize": number, "sustain": number },
  "categoryDetails": {
    "[category]": {
      "score": number,
      "findings": string[],
      "recommendations": string[]
    }
  },
  "priorityImprovements": [{
    "category": string,
    "issue": string,
    "impact": "high|medium|low",
    "recommendation": string,
    "estimatedEffort": "quick-win|medium-term|long-term"
  }],
  "suggestions": string
}

Evaluate each 5S category using these integrated criteria:

1. Sort (Seiri):
- Necessity: Evaluate if only required tools, equipment, and materials are present
- Organization: Check for excess inventory, unnecessary documents, and proper storage
- Safety: Assess PPE appropriateness and removal of hazards

2. Set in Order (Seiton):
- Efficiency: Analyze workspace layout, tool accessibility, and flow optimization
- Visual Management: Check labeling, zoning, and storage systems
- Space Utilization: Evaluate organization methods and area optimization

3. Shine (Seiso):
- Cleanliness: Assess workspace, equipment, and tool maintenance
- Maintenance: Review cleaning schedules, waste management, and inspection processes
- Standards: Evaluate cleaning procedures and responsibility assignment

4. Standardize (Seiketsu):
- Process Documentation: Check for standardized procedures and visual controls
- Communication: Assess information sharing and visual management systems
- Consistency: Review organizational systems and best practices implementation

5. Sustain (Shitsuke):
- Engagement: Evaluate employee participation and understanding
- Monitoring: Check audit systems and performance tracking
- Improvement: Assess training programs and management support

Scoring Scale:
90-100: Exceptional | 80-89: Strong | 70-79: Good | 60-69: Basic | <60: Needs Improvement

For each category, provide:
1. Evidence-based observations
2. Key findings (positive and negative)
3. Prioritized, actionable recommendations
4. Impact assessment on safety and efficiency

Format suggestions with clear sections using \\n\\n breaks.`;

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
      if (!result.overallScore || !result.scores || !result.suggestions || !result.categoryDetails || !result.priorityImprovements) {
        throw new Error('Invalid response format');
      }
      
      // Validate score structure and category details
      const requiredScores = ['sort', 'setInOrder', 'shine', 'standardize', 'sustain'];
      for (const score of requiredScores) {
        if (typeof result.scores[score] !== 'number') {
          throw new Error(`Missing or invalid score: ${score}`);
        }
        if (!result.categoryDetails[score] || 
            typeof result.categoryDetails[score].score !== 'number' ||
            !Array.isArray(result.categoryDetails[score].findings) ||
            !Array.isArray(result.categoryDetails[score].recommendations)) {
          throw new Error(`Missing or invalid category details for: ${score}`);
        }
      }
      
      // Validate priority improvements
      if (!Array.isArray(result.priorityImprovements)) {
        throw new Error('Priority improvements must be an array');
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
