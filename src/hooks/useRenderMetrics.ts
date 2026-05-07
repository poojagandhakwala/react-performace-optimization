import { useCallback, useRef, useState } from 'react';

export function useRenderMetrics(name: string) {
  const [renderCount, setRenderCount] = useState(0);
  const startTime = useRef<number>(0);
  const [lastDuration, setLastDuration] = useState(0);

  const startBenchmark = useCallback(() => {
    startTime.current = performance.now();
  }, []);

  const endBenchmark = useCallback(() => {
    const end = performance.now();
    setLastDuration(end - startTime.current);
    setRenderCount(prev => prev + 1);
  }, []);

  const resetMetrics = useCallback(() => {
    setRenderCount(0);
    setLastDuration(0);
  }, []);

  return {
    renderCount,
    lastDuration,
    startBenchmark,
    endBenchmark,
    resetMetrics,
  };
}
