import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchQuote, MetalQuote } from '../services/api';
import type { MetalSymbol } from '../constants/metals';

/**
 * Custom hook to fetch and manage the state of a single metal's price.
 */
export function useMetalPrice(symbol: MetalSymbol) {
  const [data, setData] = useState<MetalQuote | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Prevent setting state after unmount
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const load = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const quote = await fetchQuote(symbol);
      if (mounted.current) {
        setData(quote);
      }
    } catch (e: any) {
      if (mounted.current) {
        setError(e?.message || 'Failed to load');
      }
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
    }
  }, [symbol]);

  // Load once on mount and when symbol changes
  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}
