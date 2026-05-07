import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '../../../components/ui/button';
import { useRenderMetrics } from '@/hooks/useRenderMetrics';
import { DemoShell } from '../layout/DemoShell';
import { PERFORMANCE_MODULES } from '@/data/modules';
import { Switch } from '../../../components/ui/switch';
import { Label } from '../../../components/ui/label';

// Component that re-renders often
const ExpensiveChild = React.memo(({ id, onAction, name, isMemoized }: any) => {
  const renderStartTime = performance.now();
  // Simulate some overhead
  for(let i = 0; i < 500000; i++) {} 
  
  return (
    <div className="p-4 border rounded-lg bg-card shadow-sm flex flex-col items-center gap-2">
      <span className="text-xs text-muted-foreground font-mono">ID: {id}</span>
      <span className="font-bold">{name}</span>
      <Button size="sm" onClick={() => onAction(id)}>Action</Button>
    </div>
  );
}, (prev, next) => {
  // If we aren't testing memoization, we return false to force re-render
  if (!next.isMemoized) return false;
  return prev.name === next.name && prev.id === next.id;
});

export function MemoizationDemo() {
  const module = PERFORMANCE_MODULES.find(m => m.id === 'memoization')!;
  const metrics = useRenderMetrics('memoization');
  
  const [count, setCount] = useState(0);
  const [isOptimized, setIsOptimized] = useState(false);
  const [items, setItems] = useState([
    { id: 1, name: 'Component A' },
    { id: 2, name: 'Component B' },
    { id: 3, name: 'Component C' },
  ]);

  const memoizedAction = useCallback((id: number) => console.log('Action on', id), []);
  
  const handleAction = isOptimized 
    ? memoizedAction
    : (id: number) => console.log('Action on', id);

  const increment = () => {
    metrics.startBenchmark();
    setCount(c => c + 1);
    // Use setTimeout to allow browser to finish paint before measuring
    setTimeout(() => metrics.endBenchmark(), 0);
  };

  return (
    <DemoShell module={module} metrics={metrics}>
      <div className="flex flex-col gap-6 w-full items-center">
        <div className="flex items-center space-x-2 bg-muted p-4 rounded-xl border">
          <Switch id="optimize" checked={isOptimized} onCheckedChange={setIsOptimized} />
          <Label htmlFor="optimize" className="font-bold">
            {isOptimized ? "🚀 Optimization ON (Memo + Callback)" : "🐢 Optimization OFF (Full Tree Re-render)"}
          </Label>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Incrementing this count triggers parent re-render</p>
          <div className="flex items-center justify-center gap-4">
            <span className="text-4xl font-bold font-mono">{count}</span>
            <Button onClick={increment} size="lg">Increment State</Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full max-w-lg mt-4">
          {items.map(item => (
            <ExpensiveChild 
              key={item.id} 
              {...item} 
              onAction={handleAction} 
              isMemoized={isOptimized}
            />
          ))}
        </div>
        
        <p className="text-xs text-muted-foreground text-center max-w-sm italic">
          Try incrementing state with optimization OFF. You'll notice the "Last Render Time" increases as the parent forces all children to recalculate.
        </p>
      </div>
    </DemoShell>
  );
}
