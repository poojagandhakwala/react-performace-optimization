import React, { useState, useDeferredValue, useMemo } from 'react';
import { Button } from '../../../components/ui/button';
import { useRenderMetrics } from '@/hooks/useRenderMetrics';
import { DemoShell } from '../layout/DemoShell';
import { PERFORMANCE_MODULES } from '@/data/modules';
import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';
import { Input } from '../ui/input';

const SlowList = React.memo(({ text }: { text: string }) => {
  const startTime = performance.now();
  // Artificial delay to make rendering slow
  while (performance.now() - startTime < 100) {}

  return (
    <div className="p-4 border rounded bg-card mt-4">
      <p className="text-sm text-muted-foreground uppercase tracking-widest text-[10px] mb-2">Slow Render Component</p>
      <h3 className="text-2xl font-bold">Results for: {text || '...'}</h3>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-8 bg-muted rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
});

export function DeferredDemo() {
  const module = PERFORMANCE_MODULES.find(m => m.id === 'deferred')!;
  const metrics = useRenderMetrics('deferred');
  const [isOptimized, setIsOptimized] = useState(true);
  const [query, setQuery] = useState("");
  
  const deferredQuery = useDeferredValue(query);
  const displayQuery = isOptimized ? deferredQuery : query;
  const isStale = query !== deferredQuery;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    metrics.startBenchmark();
    setQuery(e.target.value);
    setTimeout(() => metrics.endBenchmark(), 0);
  };

  return (
    <DemoShell module={module} metrics={metrics}>
       <div className="flex flex-col gap-6 w-full items-center">
         <div className="flex items-center space-x-2 bg-muted p-4 rounded-xl border">
          <Switch id="optimize-defer" checked={isOptimized} onCheckedChange={setIsOptimized} />
          <Label htmlFor="optimize-defer" className="font-bold">
            {isOptimized ? "🚀 useDeferredValue ON" : "🐢 Normal Prop Passing"}
          </Label>
        </div>

        <div className="w-full max-w-md space-y-2">
          <Label>Type to see the 'Stale UI' pattern</Label>
          <Input 
            value={query} 
            onChange={handleChange} 
            placeholder="Type quickly..." 
          />
        </div>

        <div className={isStale && isOptimized ? "opacity-50 grayscale transition-all" : "transition-all"}>
           <SlowList text={displayQuery} />
        </div>
        
        <p className="text-sm text-muted-foreground text-center max-w-md mt-4">
          In "Deferred" mode, the input remains silky smooth because the slow component renders on a lower priority. 
          The UI turns slightly transparent while it's "stale" (calculating the new version).
        </p>
      </div>
    </DemoShell>
  );
}
