import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { useRenderMetrics } from '@/hooks/useRenderMetrics';
import { DemoShell } from '../layout/DemoShell';
import { PERFORMANCE_MODULES } from '@/data/modules';
import { Switch } from '../../../components/ui/switch';
import { Label } from '../../../components/ui/label';
import { Slider } from '../../../components/ui/slider';

const DATA_COUNT = 5000;
const ITEM_HEIGHT = 48;
const CONTAINER_HEIGHT = 300;

const ITEMS = Array.from({ length: DATA_COUNT }, (_, i) => ({
  id: i,
  name: `Item #${i + 1}`,
  details: `Detailed description for item ${i + 1} with some extra metadata to increase DOM size.`
}));

export function VirtualizationDemo() {
  const module = PERFORMANCE_MODULES.find(m => m.id === 'virtualization')!;
  const metrics = useRenderMetrics('virtualization');
  const [isOptimized, setIsOptimized] = useState(true);
  const [numToRender, setNumToRender] = useState(500);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleItems = useMemo(() => {
    if (!isOptimized) return ITEMS.slice(0, numToRender);

    const startIdx = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - 2);
    const endIdx = Math.min(ITEMS.length, Math.ceil((scrollTop + CONTAINER_HEIGHT) / ITEM_HEIGHT) + 2);

    return ITEMS.slice(startIdx, endIdx).map(item => ({
      ...item,
      top: item.id * ITEM_HEIGHT
    }));
  }, [scrollTop, isOptimized, numToRender]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const handleBenchmark = () => {
    metrics.startBenchmark();
    setNumToRender(n => n + 1);
    setTimeout(() => metrics.endBenchmark(), 0);
  };

  return (
    <DemoShell module={module} metrics={metrics}>
      <div className="flex flex-col gap-6 w-full items-center">
        <div className="flex flex-col gap-4 w-full max-w-md bg-muted/30 p-6 rounded-2xl border">
          <div className="flex items-center justify-between">
            <Label htmlFor="optimize-list" className="font-bold">
              {isOptimized ? "🚀 Optimized (Custom Virtualization)" : "🐢 Normal Loop (Native DOM)"}
            </Label>
            <Switch id="optimize-list" checked={isOptimized} onCheckedChange={setIsOptimized} />
          </div>
          
          {!isOptimized && (
            <div className="space-y-4 pt-4 border-t">
              <div className="flex justify-between text-xs">
                <Label>Items to Render (Native)</Label>
                <span className="font-mono">{numToRender}</span>
              </div>
              <Slider 
                className="w-full"
                value={[numToRender]} 
                min={100} 
                max={2000} 
                step={100} 
                onValueChange={(v : number | readonly number[]) => setNumToRender(Array.isArrray(v) ? v[0] : v)} 
              />
            </div>
          )}
          
          <Button onClick={handleBenchmark} className="w-full">Run Render Benchmark</Button>
        </div>

        <div 
          className="w-full max-w-2xl border rounded-xl overflow-auto bg-background h-[300px] shadow-inner relative"
          onScroll={handleScroll}
        >
          {isOptimized ? (
            <div style={{ height: ITEMS.length * ITEM_HEIGHT, position: 'relative' }}>
              {visibleItems.map((item: any) => (
                <div 
                  key={item.id} 
                  style={{ 
                    position: 'absolute', 
                    top: item.top, 
                    height: ITEM_HEIGHT, 
                    width: '100%' 
                  }}
                  className="flex items-center px-4 border-b hover:bg-muted/50 transition-colors bg-card"
                >
                  <span className="w-12 font-mono text-xs text-muted-foreground">#{item.id}</span>
                  <span className="font-medium mr-4">{item.name}</span>
                  <span className="text-xs text-muted-foreground truncate flex-1">{item.details}</span>
                </div>
              ))}
            </div>
          ) : (
            <div>
               {visibleItems.map((item: any) => (
                 <div key={item.id} className="flex items-center px-4 h-[48px] border-b bg-card">
                    <span className="w-12 font-mono text-xs text-muted-foreground">#{item.id}</span>
                    <span className="font-medium mr-4">{item.name}</span>
                    <span className="text-xs text-muted-foreground truncate flex-1">{item.details}</span>
                 </div>
               ))}
            </div>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground text-center">
          In "Optimized" mode, we only mount ~10 DOM nodes regardless of list size (5,000 items). 
          This keeps memory usage constant and performance high.
        </p>
      </div>
    </DemoShell>
  );
}
