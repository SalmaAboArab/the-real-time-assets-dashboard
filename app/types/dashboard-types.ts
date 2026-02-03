type AssetType = 'Stock' | 'Crypto' | 'ETF' | 'Bond' | 'Commodity';

interface BaseAsset {
  id: number;
  name: string;
  symbol: string;
  type: AssetType;
  basePrice: number;
  volume: string;
  marketCap: string | null;
  pe: number | null;
  dividend: number;
}

interface Asset extends BaseAsset {
  price: number;
  change: number;
  changePercent: number;
  dayHigh: number;
  dayLow: number;
  favorited: boolean;
}

