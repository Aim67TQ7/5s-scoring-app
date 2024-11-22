import Anthropic from '@anthropic-ai/sdk';
import type { Analysis } from '../../client/src/lib/types';

// the newest Anthropic model is "claude-3-5-sonnet-20241022" which was released October 22, 2024
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Helper function for exponential backoff retry
async function retryWithExponentialBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      const delay = baseDelay * Math.pow(2, attempt);
      console.log(`Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error('Operation failed after maximum retries');
}

export async function analyze5SFromImages(imageBase64Array: string[]): Promise<Analysis> {
  try {
    const prompt = `As a 5S workplace organization expert, analyze these workplace images and provide a detailed assessment in this JSON format:

{
  "overallScore": number (0-100),
  "scores": {
    "sort": number (0-100),
    "setInOrder": number (0-100),
    "shine": number (0-100),
    "standardize": number (0-100),
    "sustain": number (0-100)
  },
  "categories": {
    "sort": {
      "findings": string[],
      "recommendations": [{
        "description": string,
        "timeframe": "immediate"|"short-term"|"long-term",
        "priority": "high"|"medium"|"low"
      }]
    },
    "setInOrder": {/* same structure */},
    "shine": {/* same structure */},
    "standardize": {/* same structure */},
    "sustain": {/* same structure */}
  },
  "suggestions": string
}

Evaluate each 5S category comprehensively using these detailed criteria:

1. Sort (Seiri) - Organization & Necessity:
Ensure workstations, equipment, and storage are clutter-free, with only necessary items present, including tools, parts, containers, and PPE. Remove unauthorized or outdated documents, trash, scrap, and personal items (except coats during cold weather). Verify that cleaning equipment and supplies are only in the required areas. Ensure floors, aisles, and work surfaces are free of debris. Confirm that inventory and WIP levels are within specified limits and excess parts or containers are not present.

2. Set in Order (Seiton) - Orderliness & Accessibility:
Ensure all equipment, tools, and storage are properly labeled and foot printed, including tables, bins, racks, toolboxes, and part containers. Verify that emergency equipment, including E-stops, first aid, exits, and hazardous materials, are clearly identified and easily accessible. Confirm that documentation, visual aids, and checklists are stored in labeled locations. Check that floors, aisles, and cleaning equipment are footprinted, labeled, and organized. Ensure personal items are in designated areas, and inventory and WIP levels are properly marked with minimum/maximum indicators. Review if all tools, fixtures, and gauges are in their assigned spots and labeled appropriately. 

3. Shine (Seiso) - Cleanliness & Maintenance:
Ensure all workstations, machines, equipment, tooling, and storage areas (including off-line and on-line materials, inventory, and quality defect holding areas) are clean and items are in their designated locations. Verify that PPE, WIP containers, tools, tool boards, and cabinets are organized and maintained properly. Confirm that posted information on performance and communication boards is up-to-date and clearly visible. Ensure pull systems are properly stocked and replenishment procedures are in place. Check that safety and quality controls are documented and displayed visually in relevant areas.

4. Standardize (Seiketsu) - Consistency & Control:
Ensure that systems or devices are in place to prevent work surfaces, stations, sub stations, floors, machines, equipment, furniture, tooling, inventories, WIP areas, tool boards, shelving, cabinets, and personal items from becoming disorganized or dirty. Implement strategies to maintain cleanliness and order in all areas.

5. Sustain (Shitsuke) - Culture & Continuous Improvement:
Ensure that 5S audits have been completed weekly for three consecutive months. Verify that posted countermeasures have been implemented on time. Check if unnecessary items are easily identifiable at a glance. Confirm that all employees can clearly articulate the 5S objectives for the area (score range: 0 or 0.4) This is a 0 score if none are observed.

Scoring Guidelines:
95-100: Exceptional (World-class implementation)
85-94: Advanced (Strong system with minor improvements needed)
75-84: Proficient (Good foundation with some gaps)
65-74: Developing (Basic implementation with significant opportunities)
Below 65: Requires immediate attention

For each category, provide:
1. Detailed evidence-based findings
2. Specific positive observations
3. Clear areas for improvement
4. Practical short-term solutions
5. Strategic long-term recommendations
6. Impact assessment on:
   - Safety
   - Efficiency
   - Quality
   - Employee engagement
   - Cost reduction

Format recommendations to clearly distinguish between:
- Quick wins (implementable within 1 week)
- Medium-term improvements (1-3 months)
- Long-term strategic changes (3+ months)

Include specific examples from the images to support your analysis. Format the suggestions section with clear breaks using \\n\\n between major points.`;

    const response = await retryWithExponentialBackoff(async () => {
      const result = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 4096,
        temperature: 0.3, // Lower temperature for more consistent JSON formatting
        messages: [{
        role: "user",
        content: [
          { type: "text", text: prompt },
          ...imageBase64Array.map(base64 => ({
            type: "image",
            source: {
              type: "base64",
              media_type: "image/jpeg" as const,
              data: base64
            }
          }))
        ]
      }]
    });
      return result;
    });

    // Extract and validate response
    const responseText = response.content[0].type === 'text' ? response.content[0].text : '';

    // Log full response for debugging
    console.log('Raw Anthropic response:', responseText);

    try {
      // Remove any potential markdown formatting
      const jsonStr = responseText.replace(/```json\n?|\n?```/g, '').trim();
      const result = JSON.parse(jsonStr);

      // Validate response structure
      if (!result.overallScore || !result.scores || !result.suggestions || !result.categories) {
        console.error('Invalid response structure:', result);
        throw new Error('Invalid response format - missing required fields');
      }

      // Validate score structure and categories
      const requiredScores = ['sort', 'setInOrder', 'shine', 'standardize', 'sustain'];
      for (const score of requiredScores) {
        if (typeof result.scores[score] !== 'number') {
          console.error(`Invalid score for ${score}:`, result.scores[score]);
          throw new Error(`Missing or invalid score: ${score}`);
        }
        if (!result.categories[score] || 
            !Array.isArray(result.categories[score].findings) ||
            !Array.isArray(result.categories[score].recommendations)) {
          console.error(`Invalid category details for ${score}:`, result.categories[score]);
          throw new Error(`Missing or invalid category details for: ${score}`);
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
