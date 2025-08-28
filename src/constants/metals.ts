export type MetalSymbol = 'XAU' | 'XAG' | 'XPT' | 'XPD';

export const METALS: { symbol: MetalSymbol; name: string; loader: 'spinner' | 'dots' | 'bar' | 'pulse' }[] = [
  { symbol: 'XAU', name: 'Gold', loader: 'spinner' },
  { symbol: 'XAG', name: 'Silver', loader: 'dots' },
  { symbol: 'XPT', name: 'Platinum', loader: 'bar' },
  { symbol: 'XPD', name: 'Palladium', loader: 'pulse' },
];
