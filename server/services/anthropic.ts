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
[(Furniture & Equipment) Are work benches, carts, machines, equipment, cabinets, tool boxes, shelves, fixtures, structures clutter free of unnecessary items?
(PPE) Are all safety gloves, armguards, safety glasses, ear plugs, aprons, etc. in area necessary?
(Documents) Are unauthorized/outdated instructions, visual aids, inspection forms, work instructions etc removed from the work area?
(Floor & Walk Aisles) Are floors & workstation surfaces free of unnecessary hardware, parts, papers, cardboard, metal, pens, debris, trash etc.?
(Cleaning Equipment) Is all cleaning equipment & supplies such as rags, mops,  mop buckets, brooms, dust pans, cleaning solutions, floor mats etc.in area necessary?
(Tools, fixtures, gages, hand tools) Are only necessary tools needed to perform the workstation job (tools, fixtures, gauges, air wrenches, hand tools etc.) located in the area?
(Part Containers) Are only necessary part containers such as colored totes, wire baskets, tote pans, returnable totes or containers located in the area?
(Personal items) Have personal items such as (lunch boxes, drinks, newspapers, food, magazines) been removed from the immediate working area? NOTE: Coats/Jackets are allowed during cold weather due to doors frequent opening/closing of doors.
Has all trash, scrap, rework and  their containers been removed from the area?
(Inventory and Work In Process (WIP) ) Is the area free of excess inventory & parts?  Parts in excess of min/max levels or specified limits.  Have  excess containers or shelves to hold excess inventory?
Analyze organization and unnecessary items]

Set in Order (Seiton):
[(Furniture & Equipment) Are work benches, carts, machines, equipment, cabinets, tool boxes, shelves, fixtures, structures clutter free of unnecessary items?
(PPE) Are all safety gloves, armguards, safety glasses, ear plugs, aprons, etc. in area necessary?
(Documents) Are unauthorized/outdated instructions, visual aids, inspection forms, work instructions etc removed from the work area?
(Floor & Walk Aisles) Are floors & workstation surfaces free of unnecessary hardware, parts, papers, cardboard, metal, pens, debris, trash etc.?
(Cleaning Equipment) Is all cleaning equipment & supplies such as rags, mops,  mop buckets, brooms, dust pans, cleaning solutions, floor mats etc.in area necessary?
(Tools, fixtures, gages, hand tools) Are only necessary tools needed to perform the workstation job (tools, fixtures, gauges, air wrenches, hand tools etc.) located in the area?
(Part Containers) Are only necessary part containers such as colored totes, wire baskets, tote pans, returnable totes or containers located in the area?
(Personal items) Have personal items such as (lunch boxes, drinks, newspapers, food, magazines) been removed from the immediate working area? NOTE: Coats/Jackets are allowed during cold weather due to doors frequent opening/closing of doors.
Has all trash, scrap, rework and  their containers been removed from the area?
(Inventory and Work In Process (WIP) ) Is the area free of excess inventory & parts?  Parts in excess of min/max levels or specified limits.  Have  excess containers or shelves to hold excess inventory? Analyze layout and item placement]

Shine (Seiso):
[(Work Stations) Are all items on work stations in proper location and are they clean? (Personal Protective Equipment (PPE), WIP containers, tools, floors, desk, carts, fixtures rework areas etc.) 
(Machines, Equipment & Tooling) Are all equipment, work benches, tuggers, baskets, bins, totes etc. clean and in their designated location?
(On-line Production Material, Supplies & Parts Storage) Are all on-line production materials, supplies and part containers etc.  clean and in their designated location?
(Tool Boards) Are all tools etc. in the designated location on the tool boards and all tools & tool boards clean?
(Off-Line Storage) Are all items on racks, dies, carts fixtures, floors etc. in off-line storage areas clean and in their designated locations?
(On-Line Cabinets, Shelving) Are cabinets, files clean and in their designated location?
(Inventory Storage Areas such as staging areas, material holding areas and quality defect holding areas) Are inventory storage areas such as staging areas, material holding areas and quality defect holding areas/items clean and in their designated location?
(Information) Is all posted information on performance boards, communication boards, clean and in the right location?
(Pull System) Are all items in super markets/grocery stores in proper place and are their procedures in place to replenish the system?
(Safety and Quality Related Controls) Have visual aids for appropriate safety and quality concerns been documented visually? Analyze cleanliness and maintenance]

Standardize (Seiketsu):
[(Work Surfaces, Work Stations, Sub Stations and Floors) Have ideas or devices been installed to prevent work surfaces, work stations, sub stations and floors from becoming unorganized, messy or dirty?  
(Machines, Equipment, Furniture, Tooling etc.) Have ideas or devices been installed to prevent machines, equipment, furniture, tooling etc. from becoming unorganized, messy or dirty?
(Inventories & WIP areas) Have ideas or devices been installed to prevent on-line and off-line inventories & WIP areas from becoming unorganized, messy or dirty?  
(Tool Boards, Shelving & Cabinets) Have ideas or devices been implemented to prevent these areas from becoming unorganized messy or dirty?
(Personal Items)  Have ideas or devices been implemented to prevent these areas from becoming unorganized messy or dirty? Analyze processes and visual management]

Sustain (Shitsuke):
[Have 5S audits been completed per weekly for 3 straight months?
Have posted countermeasures been completed on time?
Visual control - Can all unnecessary items be distinguished at a glance?
Can all employees clearly articulate the 5S objectives of the area? (0 or .4 possible score) Analyze adherence to standards]

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
