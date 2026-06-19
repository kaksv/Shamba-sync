/**
 * Agent 2: Agronomist Agent
 * 
 * Responsibilities:
 * - Cross-reference detected crop disease with local treatment methods
 * - Provide organic and affordable treatment options specific to the farmer's region
 * - Consider local availability of treatments in East/West/Central/Southern Africa
 * - Recommend preventative measures
 */

import config from '../config/config.js';

class AgronomistAgent {
  constructor() {
    this.name = config.agents.agronomist.name;
    this.regions = config.agents.agronomist.regions;
  }

  /**
   * Main processing: take diagnosis from Agent 1 and produce treatment recommendations
   * @param {Object} diagnosis - Output from Agent 1 (translator & vision)
   * @param {string} region - Farmer's region (e.g., 'east-africa')
   * @returns {Promise<Object>} Treatment recommendations
   */
  async process(diagnosis, region = 'east-africa') {
    console.log(`[${this.name}] Generating treatment for: ${diagnosis.crop} - ${diagnosis.disease}`);
    console.log(`[${this.name}] Region: ${region}`);

    const treatments = await this._generateTreatments(diagnosis, region);

    console.log(`[${this.name}] Found ${treatments.organic.length + treatments.chemical.length} treatment options`);

    return {
      crop: diagnosis.crop,
      disease: diagnosis.disease,
      severity: diagnosis.severity,
      region: region,
      recommendations: treatments,
      preventativeMeasures: this._getPreventativeMeasures(diagnosis.crop, diagnosis.disease),
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Generate treatment recommendations based on crop, disease, and region
   */
  async _generateTreatments(diagnosis, region) {
    // In production, this calls GPT-4o with a knowledge base of African agricultural treatments:
    // const prompt = `You are an expert agronomist for smallholder farms in ${region}...
    //   Input: Crop=${diagnosis.crop}, Disease=${diagnosis.disease}, Severity=${diagnosis.severity}, Symptoms=${diagnosis.symptoms}
    //   Return JSON: { organic: [{name, description, ingredients, prepInstructions, applicationMethod, costEstimate, localAvailability}], 
    //                  chemical: [{name, description, activeIngredient, dosage, applicationMethod, safetyPrecautions, costEstimate, localAvailability}],
    //                  cultural: [{practice, description, bestTiming, difficulty}] }`;

    // Use GPT-4o call similar to Agent 1 pattern:
    // const response = await fetch('https://api.openai.com/v1/chat/completions', { ... body with prompt ... });
    // return JSON.parse(result.choices[0].message.content);

    // Mock knowledge base for MVP/demo - Early Blight treatment for tomatoes in East Africa
    const treatmentDB = {
      'tomato': {
        'Early Blight (Alternaria solani)': {
          organic: [
            {
              name: 'Neem Oil Spray',
              description: 'Natural fungicide made from neem tree seeds. Effective against early blight and many other fungal diseases.',
              ingredients: ['100ml neem oil (cold-pressed)', '10ml mild liquid soap (as emulsifier)', '10 liters water'],
              prepInstructions: 'Mix neem oil with soap, then slowly add to water while stirring. Use immediately.',
              applicationMethod: 'Spray on all plant surfaces, especially undersides of leaves. Apply every 7-10 days.',
              frequency: 'Every 7-10 days, at least 3 applications',
              costEstimate: '~1,500 TZS / ~50 KES per application',
              localAvailability: 'Readily available at local agrovet shops and farmer cooperatives',
            },
            {
              name: 'Baking Soda Solution (Sodium Bicarbonate)',
              description: 'Alters leaf pH to create an unfavorable environment for fungal growth.',
              ingredients: ['1 tablespoon baking soda', '1 teaspoon liquid soap', '4 liters water'],
              prepInstructions: 'Dissolve baking soda in water, add soap, mix well. Do not use metal containers.',
              applicationMethod: 'Spray on affected leaves. Test on a small area first. Apply in early morning.',
              frequency: 'Every 5-7 days',
              costEstimate: '~200 TZS / ~10 KES per batch',
              localAvailability: 'Available at any local shop or market',
            },
            {
              name: 'Compost Tea (Aerated)',
              description: 'Beneficial microorganisms from compost tea compete with and suppress fungal pathogens.',
              ingredients: ['1kg well-decomposed compost', '10 liters water (non-chlorinated)', '1 tablespoon molasses (optional)'],
              prepInstructions: 'Place compost in a cloth bag. Steep in water for 24-48 hours with aeration (stir every few hours).',
              applicationMethod: 'Foliar spray and soil drench. Apply in cool weather.',
              frequency: 'Every 14 days as preventive',
              costEstimate: '~500 TZS / ~30 KES per batch',
              localAvailability: 'Farmers can make their own. Compost widely available.',
            },
            {
              name: 'Garlic-Chili Pepper Spray',
              description: 'Strong antimicrobial and antifungal properties. Deters insects too.',
              ingredients: ['2 bulbs garlic (crushed)', '5 hot chili peppers (crushed)', '10 liters water', '1 tablespoon vegetable oil'],
              prepInstructions: 'Soak garlic and chili in water for 24 hours. Strain. Add oil. Mix well.',
              applicationMethod: 'Spray thoroughly on all plant parts. Reapply after rain.',
              frequency: 'Every 5-7 days',
              costEstimate: '~800 TZS / ~40 KES per batch',
              localAvailability: 'All ingredients available at local markets or home gardens.',
            },
          ],
          chemical: [
            {
              name: 'Mancozeb 80% WP',
              description: 'Broad-spectrum contact fungicide effective against early blight. Widely available in East Africa.',
              activeIngredient: 'Mancozeb 80%',
              dosage: '2g per liter of water',
              applicationMethod: 'Foliar spray. Ensure complete coverage. Wear protective gear.',
              safetyPrecautions: 'Wear gloves, mask, and long sleeves. Do not spray near water sources. Keep 14-day pre-harvest interval.',
              costEstimate: '~5,000 TZS / ~300 KES per 500g packet',
              localAvailability: 'Available at most agrovet shops',
            },
            {
              name: 'Copper Oxychloride 50% WP',
              description: 'Copper-based fungicide effective against blights. Suitable for organic farming where permitted.',
              activeIngredient: 'Copper Oxychloride 50%',
              dosage: '3g per liter of water',
              applicationMethod: 'Foliar spray. Do not use in very hot weather to avoid leaf burn.',
              safetyPrecautions: 'Avoid excessive accumulation in soil. Rotate with other fungicides. 7-day pre-harvest interval.',
              costEstimate: '~4,000 TZS / ~250 KES per 500g packet',
              localAvailability: 'Commonly available at agrovets',
            },
          ],
          cultural: [
            {
              practice: 'Crop Rotation',
              description: 'Do not plant tomatoes in the same location for 2-3 years. Rotate with legumes or grains.',
              bestTiming: 'At start of planting season',
              difficulty: 'low',
            },
            {
              practice: 'Mulching',
              description: 'Apply organic mulch (dried grass, straw) around plant base to prevent soil splash carrying fungal spores.',
              bestTiming: 'After transplanting, before soil contact',
              difficulty: 'low',
            },
            {
              practice: 'Pruning Lower Leaves',
              description: 'Remove bottom leaves that contact soil. Improve air circulation between plants.',
              bestTiming: 'Once plants reach 30cm height',
              difficulty: 'medium',
            },
            {
              practice: 'Drip Irrigation',
              description: 'Water at soil level, not on leaves. Moisture on leaves promotes fungal growth.',
              bestTiming: 'Morning watering preferred',
              difficulty: 'medium',
            },
          ],
        },
      },
    };

    // Try to find matching treatment
    const cropTreatments = treatmentDB[diagnosis.crop.toLowerCase()];
    if (cropTreatments && cropTreatments[diagnosis.disease]) {
      return cropTreatments[diagnosis.disease];
    }

    // Fallback: generate generic treatment from LLM pattern
    return {
      organic: [
        {
          name: 'General Organic Fungicide',
          description: 'A broad-spectrum organic treatment suitable for many crop diseases.',
          ingredients: ['Neem oil', 'Soap', 'Water'],
          prepInstructions: 'Standard mix procedure.',
          applicationMethod: 'Apply as foliar spray.',
          frequency: 'Every 7 days',
          costEstimate: '~1,000 TZS per application',
          localAvailability: 'Check with local agrovet',
        },
      ],
      chemical: [],
      cultural: [
        {
          practice: 'Sanitation',
          description: 'Remove and destroy affected plant parts. Clean tools between uses.',
          bestTiming: 'Immediately upon noticing symptoms',
          difficulty: 'low',
        },
      ],
    };
  }

  /**
   * Get preventative measures for the crop-disease combination
   */
  _getPreventativeMeasures(crop, disease) {
    // In production, this would query a knowledge base or LLM
    return [
      {
        measure: 'Use disease-resistant tomato varieties (e.g., Tanya, Assila, Roma VF)',
        difficulty: 'low',
        cost: 'moderate',
      },
      {
        measure: 'Maintain proper plant spacing (60cm between plants, 100cm between rows)',
        difficulty: 'low',
        cost: 'free',
      },
      {
        measure: 'Apply neem cake or compost at planting time to boost soil health',
        difficulty: 'low',
        cost: 'low',
      },
      {
        measure: 'Monitor crops weekly and remove first signs of disease immediately',
        difficulty: 'low',
        cost: 'free',
      },
      {
        measure: 'Use certified disease-free seeds from trusted suppliers',
        difficulty: 'low',
        cost: 'moderate',
      },
    ];
  }
}

export default AgronomistAgent;