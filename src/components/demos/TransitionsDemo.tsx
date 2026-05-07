import React, { useState, useTransition, useMemo } from 'react';
import { Button } from '../../../components/ui/button';
import { useRenderMetrics } from '@/hooks/useRenderMetrics';
import { DemoShell } from '../layout/DemoShell';
import { PERFORMANCE_MODULES } from '@/data/modules';
import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';
import { Input } from '../ui/input';
import { Skeleton } from '../../../components/ui/skeleton';

// Generate a huge list for filtering
const LIST = Array.from({ length: 40000 }, (_, i) => `Entry #${i} - Value ${Math.random().toFixed(4)}`);

export function TransitionsDemo() {
  const module = PERFORMANCE_MODULES.find(m => m.id === 'transitions')!;
  const metrics = useRenderMetrics('transitions');
  const [isOptimized, setIsOptimized] = useState(true);
  const [query, setQuery] = useState("");
  const [filteredList, setFilteredList] = useState(LIST.slice(0, 50));
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    
    metrics.startBenchmark();
    
    if (isOptimized) {
      // Background update
      startTransition(() => {
        const result = LIST.filter(item => item.toLowerCase().includes(val.toLowerCase())).slice(0, 100);
        setFilteredList(result);
        metrics.endBenchmark();
      });
    } else {
      // Blocking update
      const result = LIST.filter(item => item.toLowerCase().includes(val.toLowerCase())).slice(0, 100);
      setFilteredList(result);
      metrics.endBenchmark();
    }
  };

  return (
    <DemoShell module={module} metrics={metrics}>
      <div className="flex flex-col gap-6 w-full items-center">
         <div className="flex items-center space-x-2 bg-muted p-4 rounded-xl border">
          <Switch id="optimize-trans" checked={isOptimized} onCheckedChange={setIsOptimized} />
          <Label htmlFor="optimize-trans" className="font-bold">
            {isOptimized ? "🚀 Using useTransition (Non-blocking)" : "🐢 Synchronous (Blocking UI Thread)"}
          </Label>
        </div>

        <div className="w-full max-w-md space-y-2">
          <Label>Search 40,000 items</Label>
          <div className="relative">
            <Input 
              value={query} 
              onChange={handleSearch} 
              placeholder="Start typing fast..." 
              className={isPending ? "border-primary opacity-80" : ""}
            />
            {isPending && (
              <div className="absolute right-3 top-2.5">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full max-w-xl h-[250px] overflow-auto border rounded-lg bg-card p-2 space-y-1">
          {isPending && filteredList.length > 0 && query !== "" ? (
             <div className="space-y-2 opacity-30">
                {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-6 w-full" />)}
             </div>
          ) : (
            filteredList.map((item, idx) => (
              <div key={idx} className="p-2 text-sm border-b last:border-b-0 hover:bg-accent rounded">
                {item}
              </div>
            ))
          )}
          {filteredList.length === 0 && (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
              No results found for "{query}"
            </div>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground text-center">
          In "Synchronous" mode, your typing will feel laggy because the search blocks the keystroke. 
          With "Transition", the UI remains perfectly responsive while the list calculates.
        </p>
      </div>
    </DemoShell>
  );
}
