// src/services/api.ts
import { BASE_CURRENCY, GOLDAPI_BASE, GOLDAPI_KEY, USE_MOCK } from '../constants/config';
import type { MetalSymbol } from '../constants/metals';

export type MetalQuote = {
  symbol: MetalSymbol; // XAU, XAG, XPT, XPD
  price: number;       // current price in local unit (10g, 1kg, etc.)
  currency: string;    // e.g., INR
  open: number;        // today open
  prevOpen?: number;   // previous session open (if available)
  prevClose?: number;  // previous session close
  high?: number;       // day high
  low?: number;        // day low
  timestamp: number;   // epoch seconds of last update
  provider: 'mock' | 'goldapi';
};

const sleep = (ms: number) =>
  new Promise<void>(res => setTimeout(() => res(), ms));

/* -------------------------------------------------------------------------- */
/*                           UNIT CONVERSIONS                                 */
/* -------------------------------------------------------------------------- */
const TROY_OUNCE_TO_GRAM = 31.1035;

function convertPrice(symbol: MetalSymbol, pricePerOz: number): number {
  switch (symbol) {
    case 'XAU': // Gold → 10g
      return pricePerOz;
    case 'XAG': // Silver → 1kg
      return pricePerOz;
    case 'XPT': // Platinum → 10g
    case 'XPD': // Palladium → 10g
      return pricePerOz;
    default:
      return pricePerOz;
  }
}

/* -------------------------------------------------------------------------- */
/*                               MOCK IMPLEMENTATION                          */
/* -------------------------------------------------------------------------- */
async function fetchMock(symbol: MetalSymbol): Promise<MetalQuote> {
  const bases: Record<MetalSymbol, number> = {
    XAU: 62000, // already per 10g for mock
    XAG: 75000, // per 1kg for mock
    XPT: 25000, // per 10g for mock
    XPD: 50000, // per 10g for mock
  };
  const base = bases[symbol];

  // Simulate network latency and small fluctuations
  await sleep(600 + Math.random() * 1200);
  const jitter = (Math.random() - 0.5) * base * 0.01; // ±1%
  const price = base + jitter;
  const open = base * (1 - 0.002);
  const prevClose = base * (1 - 0.01);
  const prevOpen = prevClose * 0.998;
  const high = Math.max(price, open) * 1.01;
  const low = Math.min(price, open) * 0.99;

  return {
    symbol,
    price,
    currency: BASE_CURRENCY,
    open,
    prevOpen,
    prevClose,
    high,
    low,
    timestamp: Math.floor(Date.now() / 1000),
    provider: 'mock',
  };
}

/* -------------------------------------------------------------------------- */
/*                         LIVE (goldapi.io) IMPLEMENTATION                   */
/* -------------------------------------------------------------------------- */
async function fetchGoldApi(symbol: MetalSymbol): Promise<MetalQuote> {
  if (!GOLDAPI_KEY) {
    throw new Error('GOLDAPI_KEY is missing. Add it to src/constants/config.ts');
  }

  const url = `${GOLDAPI_BASE}/${symbol}/${BASE_CURRENCY}`; // e.g., /XAU/INR
  const res = await fetch(url, {
    headers: {
      'x-access-token': GOLDAPI_KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }

  const data = await res.json();

  // Convert per-ounce → 10g/1kg depending on symbol
  const convertedPrice = convertPrice(symbol, data.price || data.ask || 0);
  const convertedOpen = convertPrice(symbol, data.open_price || 0);
  const convertedPrevOpen = data.prev_open
  ? convertPrice(symbol, data.prev_open)
  : data.prev_close_price
  ? convertPrice(symbol, data.prev_close_price)
  : convertPrice(symbol, data.open_price || 0);
  const convertedPrevClose = data.prev_close_price ? convertPrice(symbol, data.prev_close_price) : undefined;
  const convertedHigh = data.high_price ? convertPrice(symbol, data.high_price) : undefined;
  const convertedLow = data.low_price ? convertPrice(symbol, data.low_price) : undefined;

  return {
    symbol,
    price: convertedPrice,
    currency: data.currency || BASE_CURRENCY,
    open: convertedOpen,
    prevOpen: convertedPrevOpen,
    prevClose: convertedPrevClose,
    high: convertedHigh,
    low: convertedLow,
    timestamp: data.timestamp || Math.floor(Date.now() / 1000),
    provider: 'goldapi',
  };
}

/* -------------------------------------------------------------------------- */
/*                        UNIFIED EXPORT (mock/live)                          */
/* -------------------------------------------------------------------------- */
export async function fetchQuote(symbol: MetalSymbol): Promise<MetalQuote> {
  if (USE_MOCK) {
    return fetchMock(symbol);
  }
  return fetchGoldApi(symbol);
}
