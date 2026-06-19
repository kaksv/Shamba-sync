/**
 * Agent 1: Translator & Vision Agent
 * 
 * Responsibilities:
 * - Receive voice notes and transcribe them using Whisper (speech-to-text)
 * - Receive images and analyze for crop diseases using GPT-4o vision
 * - Translate between English, Swahili, Hausa, Yoruba, Kinyarwanda, and Luganda
 * - Output structured data for Agent 2 (Agronomist)
 */

import config from '../config/config.js';

class TranslatorVisionAgent {
  constructor() {
    this.name = config.agents.translatorVision.name;
    this.supportedLanguages = config.agents.translatorVision.supportedLanguages;
    this.supportedFormats = config.agents.translatorVision.supportedImageFormats;
    this.model = config.openai.model;
  }

  /**
   * Process a voice note: transcribe audio to text
   * @param {Buffer|string} audioData - Audio buffer or base64-encoded audio
   * @param {string} format - Audio format (e.g., 'ogg', 'mp3', 'wav')
   * @returns {Promise<{text: string, language: string, confidence: number}>}
   */
  async transcribeAudio(audioData, format = 'ogg') {
    console.log(`[${this.name}] Transcribing audio...`);
    
    // Note: In production, this would call OpenAI Whisper API.
    // For the demo/MVP, we simulate with a mock that works offline.
    // To use real Whisper: uncomment the OpenAI call below.
    
    const transcription = await this._callWhisper(audioData, format);
    
    console.log(`[${this.name}] Transcription: "${transcription.text}" (${transcription.language})`);
    return transcription;
  }

  /**
   * Internal Whisper API call
   */
  async _callWhisper(audioData, format) {
    // In production with a real OpenAI key:
    // const formData = new FormData();
    // formData.append('file', new Blob([audioData]), `audio.${format}`);
    // formData.append('model', config.openai.whisperModel);
    // const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${config.openai.apiKey}` },
    //   body: formData,
    // });
    // const result = await response.json();
    // return { text: result.text, language: result.language, confidence: 0.95 };

    // Mock for MVP/demo - simulates a farmer's voice note in Swahili
    return {
      text: "Mazao yangu ya nyanya yana majani manjano na yanaonekana kukauka. Nisaidie kutambua tatizo.",
      language: "sw",
      confidence: 0.92,
      translation: "My tomato plants have yellow leaves and look like they're drying up. Help me identify the problem."
    };
  }

  /**
   * Analyze a crop image for diseases
   * @param {string} imageBase64 - Base64-encoded image
   * @param {string} mimeType - Image MIME type
   * @returns {Promise<Object>} Structured disease analysis
   */
  async analyzeCropImage(imageBase64, mimeType = 'image/jpeg') {
    console.log(`[${this.name}] Analyzing crop image...`);

    const analysis = await this._callVisionAPI(imageBase64, mimeType);

    console.log(`[${this.name}] Diagnosis: ${analysis.disease} (${analysis.confidence}%)`);
    return analysis;
  }

  /**
   * Internal Vision API call
   */
  async _callVisionAPI(imageBase64, mimeType) {
    // In production with a real OpenAI key:
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${config.openai.apiKey}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     model: config.openai.model,
    //     messages: [{
    //       role: 'user',
    //       content: [
    //         { type: 'text', text: 'Analyze this crop image. Identify the plant species, any visible diseases or pests, severity level (low/medium/high), and visible symptoms. Respond in JSON format with fields: crop, disease, severity, symptoms[], confidence.' },
    //         { type: 'image_url', image_url: { url: `data:${mimeType};base64,${imageBase64}` } },
    //       ],
    //     }],
    //     max_tokens: config.openai.maxTokens,
    //     temperature: config.openai.temperature,
    //   }),
    // });
    // const result = await response.json();
    // return JSON.parse(result.choices[0].message.content);

    // Mock for MVP/demo
    return {
      crop: "tomato",
      disease: "Early Blight (Alternaria solani)",
      severity: "medium",
      symptoms: [
        "Yellowing of lower leaves",
        "Dark brown spots with concentric rings",
        "Leaf drying and curling at edges",
        "Stem lesions near soil line"
      ],
      confidence: 87,
      affectedArea: "30-40% of foliage affected"
    };
  }

  /**
   * Translate text between supported languages
   * @param {string} text - Text to translate
   * @param {string} sourceLang - Source language code
   * @param {string} targetLang - Target language code
   * @returns {Promise<string>} Translated text
   */
  async translate(text, sourceLang, targetLang) {
    console.log(`[${this.name}] Translating ${sourceLang} → ${targetLang}...`);

    // In production, use GPT-4o for translation:
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   ... similar to above with translation prompt ...
    // });

    // Mock translation map for demo
    const translations = {
      'sw': {
        'en': `Translation: "${text}" (Swahili to English)`,
        default: 'en'
      },
      'ha': {
        'en': `Translation: "${text}" (Hausa to English)`,
        default: 'en'
      },
      'yo': {
        'en': `Translation: "${text}" (Yoruba to English)`,
        default: 'en'
      },
    };

    if (translations[sourceLang]?.[targetLang]) {
      return translations[sourceLang][targetLang];
    }
    
    // If source is English, translate to target
    if (sourceLang === 'en' && targetLang !== 'en') {
      const languageNames = {
        'sw': 'Swahili', 'ha': 'Hausa', 'yo': 'Yoruba',
        'rw': 'Kinyarwanda', 'lg': 'Luganda'
      };
      return `Tafsiri: "${text}" (Kwa ${languageNames[targetLang] || targetLang})`;
    }

    return text; // Fallback
  }

  /**
   * Extract crop information from text when no image is provided
   * Uses LLM/NLP to parse crop mentions, symptoms, and issues from text
   */
  async _extractCropInfoFromText(text) {
    console.log(`[${this.name}] Extracting crop info from text...`);

    // In production, use GPT-4o:
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   ... body with prompt to extract crop, disease, symptoms from text ...
    // });

    // Mock NLP extraction - detect crop from keywords in text
    const textLower = text.toLowerCase();
    
    const cropKeywords = {
      'tomato': ['nyanya', 'tomato', 'tamatim', 'tumati'],
      'maize': ['mahindi', 'maize', 'corn', 'masara'],
      'beans': ['maharage', 'beans', 'njahi', 'bean'],
      'cassava': ['muhogo', 'cassava', 'mihogo'],
      'rice': ['mpunga', 'rice', 'mchele'],
      'coffee': ['kahawa', 'coffee', 'kawa'],
      'banana': ['ndizi', 'banana', 'matoke', 'gonja'],
      'cabbage': ['kabeji', 'cabbage', 'kabichi'],
      'potato': ['viazi', 'potato', 'ipa'],
      'onion': ['kitunguu', 'onion', 'gitunguru'],
    };

    let detectedCrop = 'unknown';
    for (const [crop, keywords] of Object.entries(cropKeywords)) {
      if (keywords.some(kw => textLower.includes(kw))) {
        detectedCrop = crop;
        break;
      }
    }

    // Detect possible disease from symptoms mentioned
    const symptomKeywords = {
      'yellow': ['manjano', 'yellow', 'njano', 'yellowing'],
      'wilting': ['kukauka', 'wilting', 'kunyauka', 'ukame'],
      'spots': ['spots', 'madoa', 'spot', 'mabaka'],
      'blight': ['blight', 'ukoma'],
      'rot': ['rot', 'kuoza', 'oza', 'bovu'],
      'mildew': ['mildew', 'kuvu'],
      'rust': ['rust', 'kutu'],
    };

    const detectedSymptoms = [];
    for (const [symptom, keywords] of Object.entries(symptomKeywords)) {
      if (keywords.some(kw => textLower.includes(kw))) {
        detectedSymptoms.push(symptom);
      }
    }

    return {
      crop: detectedCrop,
      disease: detectedSymptoms.length > 0 
        ? `Suspected: ${detectedSymptoms.join(', ')} (text-based analysis)`
        : "General crop issue (text analysis - upload image for precise diagnosis)",
      severity: "medium",
      symptoms: detectedSymptoms.length > 0 
        ? detectedSymptoms 
        : ["Describe symptoms in more detail or upload a photo"],
      confidence: detectedCrop !== 'unknown' ? 65 : 30,
      source: 'text-analysis',
      note: 'Analysis from text only. Upload a photo for precise disease diagnosis with vision AI.'
    };
  }

  /**
   * Main processing pipeline for Agent 1
   * Handles both voice and image inputs
   */
  async process(input) {
    const result = {
      type: input.type || 'voice', // 'voice' | 'image' | 'text'
      originalInput: input,
      transcription: null,
      visionAnalysis: null,
      language: null,
      timestamp: new Date().toISOString(),
    };

    // If voice/audio input: transcribe and detect language
    if (input.type === 'voice' && input.audio) {
      const transcription = await this.transcribeAudio(input.audio, input.audioFormat || 'ogg');
      result.transcription = transcription;
      result.language = transcription.language;
    }

    // If text input (e.g., from USSD or typed message, or mixed type with text)
    if ((input.type === 'text' || input.type === 'mixed') && input.text) {
      result.transcription = {
        text: input.text,
        language: input.language || 'en',
        confidence: 1.0,
      };
      result.language = input.language || 'en';
    }

    // If image: analyze for crop disease
    if (input.image) {
      result.visionAnalysis = await this.analyzeCropImage(input.image, input.mimeType);
    }

    // If the text is not English, translate it
    if (result.transcription && result.language !== 'en') {
      result.transcription.translation = await this.translate(
        result.transcription.text,
        result.language,
        'en'
      );
    }

    // If no image was provided but we have text, try to extract crop info from text
    // This allows text-only queries to still get basic analysis
    // Uses the translated text if available
    if (!input.image && result.transcription) {
      const textToAnalyze = result.transcription.translation || result.transcription.text;
      result.visionAnalysis = await this._extractCropInfoFromText(textToAnalyze);
    }

    return result;
  }
}

export default TranslatorVisionAgent;