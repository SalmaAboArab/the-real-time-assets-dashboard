
export const assets: BaseAsset[] = [
  { id: 1, name: 'Apple Inc.', symbol: 'AAPL', type: 'Stock', basePrice: 182.45, volume: '12.4M', marketCap: '2.8T', pe: 29.5, dividend: 0.52 },
  { id: 2, name: 'Microsoft Corp.', symbol: 'MSFT', type: 'Stock', basePrice: 378.91, volume: '8.2M', marketCap: '2.8T', pe: 35.2, dividend: 0.68 },
  { id: 3, name: 'Bitcoin', symbol: 'BTC', type: 'Crypto', basePrice: 43250.00, volume: '24.1B', marketCap: '845B', pe: null, dividend: 0 },
  { id: 4, name: 'Ethereum', symbol: 'ETH', type: 'Crypto', basePrice: 2280.50, volume: '12.8B', marketCap: '274B', pe: null, dividend: 0 },
  { id: 5, name: 'Vanguard S&P 500', symbol: 'VOO', type: 'ETF', basePrice: 412.33, volume: '3.5M', marketCap: '384B', pe: 24.1, dividend: 1.45 },
  { id: 6, name: 'SPDR Gold Shares', symbol: 'GLD', type: 'ETF', basePrice: 185.20, volume: '6.1M', marketCap: '58B', pe: null, dividend: 0 },
  { id: 7, name: 'Tesla Inc.', symbol: 'TSLA', type: 'Stock', basePrice: 248.50, volume: '15.3M', marketCap: '789B', pe: 78.4, dividend: 0 },
  { id: 8, name: 'US Treasury Bond', symbol: 'TLT', type: 'Bond', basePrice: 92.15, volume: '4.2M', marketCap: '45B', pe: null, dividend: 3.2 },
  { id: 9, name: 'Gold Futures', symbol: 'GC', type: 'Commodity', basePrice: 2045.80, volume: '180K', marketCap: null, pe: null, dividend: 0 },
  { id: 10, name: 'Crude Oil', symbol: 'CL', type: 'Commodity', basePrice: 78.25, volume: '520K', marketCap: null, pe: null, dividend: 0 },
  { id: 11, name: 'Amazon.com Inc.', symbol: 'AMZN', type: 'Stock', basePrice: 151.94, volume: '11.2M', marketCap: '1.6T', pe: 52.3, dividend: 0 },
  { id: 12, name: 'Nvidia Corp.', symbol: 'NVDA', type: 'Stock', basePrice: 722.48, volume: '18.7M', marketCap: '1.8T', pe: 115.2, dividend: 0.16 },
];


export const assetsTypes: AssetType[] = ['Stock', 'Crypto', 'ETF', 'Bond', 'Commodity'];

export const generateMockAssets = (): Asset[] => {
  return assets.map(asset => {
    const changePercent = (Math.random() - 0.5) * 5;
    const changeAmount = asset.basePrice * (changePercent / 100);
    const currentPrice = asset.basePrice + changeAmount;

    return {
      ...asset,
      price: currentPrice,
      change: changeAmount,
      changePercent: changePercent,
      dayHigh: currentPrice * 1.02,
      dayLow: currentPrice * 0.98,
      favorited: Math.random() > 0.7,
    };
  });
};