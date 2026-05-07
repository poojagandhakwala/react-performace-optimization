import React, { useState, useMemo } from 'react';
import { Button } from '../../../components/ui/button';
import { useRenderMetrics } from '@/hooks/useRenderMetrics';
import { DemoShell } from '../layout/DemoShell';
import { PERFORMANCE_MODULES } from '@/data/modules';
import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';

const HEAVY_ARRAY = Array.from({ length: 5000 }, () => Math.random());

export function CalculationDemo() {
  const module = PERFORMANCE_MODULES.find(m => m.id === 'calculation')!;
  const metrics = useRenderMetrics('calculation');
  const [isOptimized, setIsOptimized] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [count, setCount] = useState(0);

  const memoizedValue = useMemo(() => {
    // Force work
    let sum = 0;
    for(let i = 0; i < 2000000; i++) {
      sum += Math.sqrt(HEAVY_ARRAY[i % 5000]);
    }
    return sum;
  }, [nonce]);

  const heavyValue = isOptimized 
    ? memoizedValue
    : (() => {
        let sum = 0;
        for(let i = 0; i < 2000000; i++) {
          sum += Math.sqrt(HEAVY_ARRAY[i % 5000]);
        }
        return sum;
      })();

  const handleUpdate = () => {
    metrics.startBenchmark();
    setCount(c => c + 1);
    setTimeout(() => metrics.endBenchmark(), 0);
  };

  const triggerChange = () => {
    setNonce(n => n + 1);
  };

  return (
    <DemoShell module={module} metrics={metrics}>
       <div className="flex flex-col gap-6 w-full items-center text-center">
         <div className="flex items-center space-x-2 bg-muted p-4 rounded-xl border">
          <Switch id="optimize-calc" checked={isOptimized} onCheckedChange={setIsOptimized} />
          <Label htmlFor="optimize-calc" className="font-bold">
            {isOptimized ? "🚀 Optimized (useMemo)" : "🐢 Unoptimized (Re-calculates every frame)"}
          </Label>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Current Count: <span className="font-mono font-bold text-lg">{count}</span>
          </p>
          <div className="flex gap-2">
            <Button onClick={handleUpdate}>Update Unrelated State</Button>
            <Button variant="outline" onClick={triggerChange}>Change Dependency</Button>
          </div>
        </div>

        <div className="p-8 border rounded-2xl bg-primary/5 w-full max-w-sm">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Computed Result</p>
          <p className="text-2xl font-mono font-black truncate">{heavyValue.toFixed(2)}</p>
        </div>

        <p className="text-sm text-muted-foreground max-w-md">
          With optimization ON, "Update Unrelated State" is instant (sub-1ms) because the heavy loop is skipped. 
          With optimization OFF, every click costs ~20ms of CPU time.
        </p>
      </div>
    </DemoShell>
  );
}
