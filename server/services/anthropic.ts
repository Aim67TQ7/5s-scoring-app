import Anthropic from '@anthropic-ai/sdk';
import type { Analysis } from '../../client/src/lib/types';

// the newest Anthropic model is "claude-3-5-sonnet-20241022" which was released October 22, 2024
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function analyze5SFromImages(imageBase64Array: string[]): Promise<Analysis> {
  try {

    const prompt = `You are a 5S workplace organization expert. Analyze these workplace images using 5S methodology and return a JSON object with the following structure:

{
  "overallScore": number (0-100),
  "scores": {
    "sort": number (0-100),
    "setInOrder": number (0-100),
    "shine": number (0-100),
    "standardize": number (0-100),
    "sustain": number (0-100)
  },
  "categoryDetails": {
    "sort": {
      "score": number (0-100),
      "findings": string[],
      "recommendations": string[]
    },
    "setInOrder": {
      "score": number (0-100),
      "findings": string[],
      "recommendations": string[]
    },
    "shine": {
      "score": number (0-100),
      "findings": string[],
      "recommendations": string[]
    },
    "standardize": {
      "score": number (0-100),
      "findings": string[],
      "recommendations": string[]
    },
    "sustain": {
      "score": number (0-100),
      "findings": string[],
      "recommendations": string[]
    }
  },
  "priorityImprovements": [
    {
      "category": string,
      "issue": string,
      "impact": "high" | "medium" | "low",
      "recommendation": string,
      "estimatedEffort": "quick-win" | "medium-term" | "long-term"
    }
  ],
  "suggestions": string
}

For each 5S category, perform a detailed analysis using these criteria:

1. Sort (Seiri) - Evaluate the separation of necessary from unnecessary items:
- Workstation Essentials: Are only required tools, equipment, and materials present?
- Documentation: Are there outdated or unnecessary documents, manuals, or charts?
- Inventory Management: Is there excess inventory or WIP beyond immediate needs?
- Personal Items: Are personal belongings properly stored or removed?
- Safety Equipment: Is PPE appropriate and necessary for the work area?
- Storage Solutions: Are storage areas free from obsolete or redundant items?

2. Set in Order (Seiton) - Analyze the organization and efficiency of item placement:
- Visual Management: Are items clearly labeled and zones marked?
- Accessibility: Are frequently used items within easy reach?
- Flow Optimization: Does the layout support efficient work processes?
- Storage Systems: Are storage solutions appropriate and well-organized?
- Tool Organization: Are tools arranged logically and stored properly?
- Space Utilization: Is space used effectively without overcrowding?

3. Shine (Seiso) - Assess cleanliness and maintenance:
- Equipment Condition: Are machines, tools, and equipment clean and well-maintained?
- Work Area Cleanliness: Are floors, surfaces, and common areas clean?
- Cleaning Standards: Are cleaning schedules and responsibilities clearly defined?
- Preventive Maintenance: Are maintenance schedules followed and documented?
- Waste Management: Are waste disposal systems effective and maintained?
- Inspection Points: Are regular cleaning inspection points established?

4. Standardize (Seiketsu) - Review standardization of best practices:
- Visual Controls: Are visual aids and controls effectively implemented?
- Standard Procedures: Are work procedures standardized and documented?
- Workplace Organization: Are organizational systems consistently maintained?
- Color Coding: Is color coding used effectively for visual management?
- Communication Systems: Are communication boards up-to-date and organized?
- Best Practices: Are best practices documented and shared?

5. Sustain (Shitsuke) - Evaluate the maintenance of 5S practices:
- Audit Systems: Are regular 5S audits conducted and documented?
- Training Programs: Is there evidence of ongoing 5S training?
- Employee Engagement: Do employees demonstrate understanding and commitment?
- Continuous Improvement: Are improvement suggestions implemented?
- Performance Tracking: Are 5S metrics tracked and displayed?
- Management Support: Is there visible management support for 5S?

Scoring Guidelines:
- 90-100: Exceptional implementation
- 80-89: Strong implementation with minor improvements needed
- 70-79: Good implementation with some notable gaps
- 60-69: Basic implementation with significant improvement opportunities
- Below 60: Requires immediate attention and major improvements

For each category:
1. Provide specific observations based on visible evidence
2. List both positive findings and areas for improvement
3. Give actionable recommendations
4. Consider the impact on safety, efficiency, and quality
5. Prioritize recommendations based on impact and effort required

Format the suggestions with clear structure and paragraph breaks using \\n\\n between sections. Prioritize improvements based on their potential impact on workplace efficiency and safety.`;

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
