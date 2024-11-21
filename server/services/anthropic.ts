import Anthropic from '@anthropic-ai/sdk';
import type { Analysis } from '../../client/src/lib/types';

// the newest Anthropic model is "claude-3-5-sonnet-20241022" which was released October 22, 2024
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function analyze5SFromImages(imageBase64Array: string[]): Promise<Analysis> {
  try {
    const prompt = `As a 5S workplace organization expert, provide a comprehensive analysis of the workplace images. Structure your response in this JSON format:

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
      "shortTermRecommendations": string[],
      "longTermRecommendations": string[],
      "positiveObservations": string[],
      "areasForImprovement": string[]
    },
    "setInOrder": {/* same structure as sort */},
    "shine": {/* same structure as sort */},
    "standardize": {/* same structure as sort */},
    "sustain": {/* same structure as sort */}
  },
  "priorityImprovements": [{
    "category": string,
    "issue": string,
    "impact": "high"|"medium"|"low",
    "recommendation": string,
    "estimatedEffort": "quick-win"|"medium-term"|"long-term",
    "expectedBenefits": string[]
  }],
  "suggestions": string
}

Evaluate each 5S category comprehensively using these detailed criteria:

1. Sort (Seiri) - Organization & Necessity:
- Equipment Essentials: Are only required tools and equipment present?
- Inventory Management: Is there excess inventory or WIP materials?
- Document Control: Are documents current and necessary?
- Space Optimization: Is space used efficiently without clutter?
- Safety Equipment: Is PPE appropriate and properly maintained?

2. Set in Order (Seiton) - Efficiency & Access:
- Workflow Optimization: Is the layout conducive to efficient work?
- Visual Organization: Are items clearly labeled and zones marked?
- Tool Organization: Are tools arranged logically and stored properly?
- Access Efficiency: Are frequently used items easily accessible?
- Space Management: Is storage optimized and well-organized?

3. Shine (Seiso) - Cleanliness & Maintenance:
- Workplace Cleanliness: Are all areas clean and well-maintained?
- Equipment Care: Is equipment regularly cleaned and maintained?
- Cleaning Standards: Are cleaning procedures standardized?
- Inspection Integration: Are cleaning and inspection combined?
- Preventive Maintenance: Are maintenance schedules followed?

4. Standardize (Seiketsu) - Consistency & Control:
- Visual Controls: Are visual management tools effectively used?
- Work Instructions: Are procedures clearly documented?
- Quality Standards: Are quality checks standardized?
- Communication Systems: Are updates and changes well-communicated?
- Best Practices: Are improvements standardized across areas?

5. Sustain (Shitsuke) - Culture & Continuous Improvement:
- Training Programs: Is there evidence of ongoing 5S training?
- Audit Systems: Are regular audits conducted and documented?
- Employee Engagement: Is there active participation in 5S?
- Performance Tracking: Are metrics monitored and displayed?
- Continuous Improvement: Is there a system for implementing suggestions?

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

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      temperature: 0.7,
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

    // Extract and validate response
    const responseText = response.content[0].type === 'text' ? response.content[0].text : '';
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
