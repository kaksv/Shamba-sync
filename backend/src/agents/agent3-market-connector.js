/**
 * Agent 3: Market Connector Agent
 * 
 * Responsibilities:
 * - Check current local market prices for the farmer's crop
 * - Alert if it's a good time to sell (based on price trends)
 * - Connect farmers directly to buyers to avoid middlemen exploitation
 * - Track price trends across different markets in the region
 */

import config from '../config/config.js';

class MarketConnectorAgent {
  constructor() {
    this.name = config.agents.marketConnector.name;
    this.dataSources = config.agents.marketConnector.dataSources;
    this.updateInterval = config.agents.marketConnector.updateIntervalMinutes;
  }

  /**
   * Main processing: get market prices and selling advice
   * @param {Object} diagnosis - Output from Agent 1
   * @param {Object} treatmentPlan - Output from Agent 2
   * @param {string} region - Farmer's region
   * @returns {Promise<Object>} Market data and recommendations
   */
  async process(diagnosis, treatmentPlan, region = 'east-africa') {
    const crop = diagnosis.crop || treatmentPlan.crop;
    console.log(`[${this.name}] Checking market prices for: ${crop} in ${region}`);

    const marketData = await this._getMarketPrices(crop, region);

    console.log(`[${this.name}] Current price: ${marketData.currentPrice} ${marketData.currency}/${marketData.unit}`);

    const recommendation = this._generateSellRecommendation(marketData);

    const buyers = this._getLocalBuyers(crop, region);

    return {
      crop: crop,
      region: region,
      marketData: marketData,
      recommendation: recommendation,
      localBuyers: buyers,
      tips: [
        'Join a farmer cooperative to negotiate better collective prices',
        'Store harvested crops properly to sell when prices are highest',
        'Use the Soko Kilimo app to access real-time price information',
        'Consider value addition (drying, processing) to increase crop value',
      ],
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Get current market prices for the crop
   */
  async _getMarketPrices(crop, region) {
    // In production, this would call:
    // 1. Regional market information systems (e.g., East Africa Grain Council API)
    // 2. Local market board data feeds
    // 3. Web scraping of published market prices
    // 4. Crowd-sourced price data from farmer networks

    // Mock price database for MVP/demo
    const priceDB = {
      'east-africa': {
        'tomato': {
          currentPrice: 2500,
          unit: 'kg',
          currency: 'TZS',
          trend: 'up', // 'up' | 'down' | 'stable'
          trendStrength: 'moderate', // 'weak' | 'moderate' | 'strong'
          weekAgoPrice: 2200,
          monthAgoPrice: 2000,
          yearAgoPrice: 1800,
          highSeasonPrice: 3000,
          lowSeasonPrice: 1500,
          currentSeason: 'peak', // 'peak' | 'low' | 'mid'
          markets: [
            { name: 'Kariakoo Market (Dar es Salaam)', price: 2800, supply: 'medium' },
            { name: 'Kampala City Market', price: 3500, currency: 'UGX', supply: 'high' },
            { name: 'Nairobi Wakulima Market', price: 120, currency: 'KES', supply: 'low' },
            { name: 'Kigali Kimironko Market', price: 800, currency: 'RWF', supply: 'medium' },
          ],
          forecastNextMonth: 'prices expected to rise further as dry season approaches',
        },
        'maize': {
          currentPrice: 800,
          unit: 'kg',
          currency: 'TZS',
          trend: 'stable',
          trendStrength: 'weak',
          weekAgoPrice: 780,
          monthAgoPrice: 820,
          markets: [
            { name: 'Kariakoo Market', price: 850, supply: 'high' },
          ],
          forecastNextMonth: 'prices expected to remain stable',
        },
        'beans': {
          currentPrice: 3500,
          unit: 'kg',
          currency: 'TZS',
          trend: 'up',
          trendStrength: 'strong',
          weekAgoPrice: 3000,
          monthAgoPrice: 2800,
          markets: [
            { name: 'Kariakoo Market', price: 3800, supply: 'low' },
          ],
          forecastNextMonth: 'prices expected to continue rising',
        },
      },
      'west-africa': {
        'tomato': {
          currentPrice: 800,
          unit: 'kg',
          currency: 'NGN',
          trend: 'up',
          trendStrength: 'moderate',
          weekAgoPrice: 700,
          monthAgoPrice: 650,
          markets: [
            { name: 'Mile 12 Market (Lagos)', price: 900, supply: 'medium' },
          ],
          forecastNextMonth: 'prices expected to rise with planting season',
        },
      },
    };

    // Get region data, fallback to east-africa
    const regionData = priceDB[region] || priceDB['east-africa'];
    const cropData = regionData[crop.toLowerCase()];

    if (cropData) {
      return cropData;
    }

    // Fallback: return generic data
    return {
      currentPrice: 2000,
      unit: 'kg',
      currency: 'TZS',
      trend: 'stable',
      trendStrength: 'weak',
      weekAgoPrice: 1950,
      monthAgoPrice: 2000,
      markets: [
        { name: 'Local Market', price: 2000, supply: 'medium' },
      ],
      forecastNextMonth: 'Data limited. Check with your local market information system.',
    };
  }

  /**
   * Generate a sell recommendation based on market data
   */
  _generateSellRecommendation(marketData) {
    const recommendations = [];

    // Price trend analysis
    if (marketData.trend === 'up' && marketData.trendStrength === 'strong') {
      recommendations.push({
        action: 'HOLD',
        message: `Prices are rising strongly (${marketData.currentPrice} → was ${marketData.monthAgoPrice} last month). Consider waiting 1-2 weeks for optimal selling price.`,
        urgency: 'low',
      });
    } else if (marketData.trend === 'up' && marketData.trendStrength === 'moderate') {
      recommendations.push({
        action: 'SELL_SOON',
        message: `Prices are trending upward. Current price ${marketData.currentPrice} is ${Math.round((marketData.currentPrice - marketData.monthAgoPrice) / marketData.monthAgoPrice * 100)}% higher than last month. Good time to sell within the next week.`,
        urgency: 'medium',
      });
    } else if (marketData.trend === 'up') {
      recommendations.push({
        action: 'SELL',
        message: `Prices are slightly up. Current ${marketData.currentPrice} vs ${marketData.weekAgoPrice} last week. Reasonable time to sell.`,
        urgency: 'medium',
      });
    } else if (marketData.trend === 'down') {
      recommendations.push({
        action: 'SELL_NOW',
        message: `Prices are dropping! Current price ${marketData.currentPrice} is down from ${marketData.weekAgoPrice} last week. Sell now before prices fall further.`,
        urgency: 'high',
      });
    } else {
      recommendations.push({
        action: 'NEUTRAL',
        message: `Prices are stable at ${marketData.currentPrice}. Market conditions are normal. You can sell now or wait and monitor.`,
        urgency: 'low',
      });
    }

    // Seasonal analysis
    if (marketData.currentSeason === 'peak' && marketData.trend === 'up') {
      recommendations.push({
        action: 'TAKE_PROFIT',
        message: `We are in peak season with rising prices. Take advantage now - these conditions are favorable.`,
        urgency: 'high',
      });
    } else if (marketData.currentSeason === 'low') {
      recommendations.push({
        action: 'CONSIDER_STORAGE',
        message: `We are in low season for prices. If you can store your crop properly, consider waiting 4-6 weeks for better prices.`,
        urgency: 'low',
      });
    }

    // Supply analysis
    const lowSupplyMarkets = marketData.markets?.filter(m => m.supply === 'low');
    if (lowSupplyMarkets?.length > 0) {
      recommendations.push({
        action: 'ALTERNATIVE_MARKET',
        message: `${lowSupplyMarkets[0].name} has low supply and higher prices (${lowSupplyMarkets[0].price}). Consider transporting your crop there for a better deal.`,
        urgency: 'medium',
      });
    }

    // Check if middlemen are likely exploiting
    const marketSpread = Math.max(...(marketData.markets?.map(m => m.price) || [0])) 
                         - Math.min(...(marketData.markets?.map(m => m.price) || [0]));
    if (marketSpread > marketData.currentPrice * 0.3 && marketData.markets?.length > 1) {
      recommendations.push({
        action: 'BYPASS_MIDDLEMEN',
        message: `Price spread between markets is ${marketSpread}. Middlemen may be exploiting the gap. Consider direct selling to ${marketData.markets?.sort((a, b) => b.price - a.price)[0]?.name}.`,
        urgency: 'high',
      });
    }

    return {
      summary: recommendations[0]?.message || 'Market data limited.',
      details: recommendations,
      forecast: marketData.forecastNextMonth,
    };
  }

  /**
   * Get local buyers for the crop
   */
  _getLocalBuyers(crop, region) {
    // In production, this would query a database of registered buyers
    // Mock data for MVP
    const buyers = {
      'tomato': [
        {
          name: 'FreshProduce Co-op',
          type: 'cooperative',
          location: 'Regional hub',
          contact: 'Available upon subscription',
          price: 'Market rate + 5% premium for members',
          requirements: 'Minimum 50kg, sorted by maturity',
        },
        {
          name: 'Local School Feeding Program',
          type: 'institutional',
          location: 'District capital',
          contact: 'Available upon subscription',
          price: 'Fixed contract price',
          requirements: 'Regular weekly supply, graded produce',
        },
        {
          name: 'Womens Vegetable Collective',
          type: 'collective',
          location: 'Nearest town',
          contact: 'Available upon subscription',
          price: 'Negotiated weekly',
          requirements: 'Clean, sorted produce',
        },
      ],
    };

    return buyers[crop.toLowerCase()] || [
      {
        name: 'Local Market Vendors Association',
        type: 'association',
        location: 'Local market',
        contact: 'Visit your nearest market',
        price: 'Current market price',
        requirements: 'Standard market quality',
      },
    ];
  }
}

export default MarketConnectorAgent;