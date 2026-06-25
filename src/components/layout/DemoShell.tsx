import { OptimizationModule } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Badge } from '../../../components/ui/badge';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '../../../components/ui/button';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DemoShellProps {
  module: OptimizationModule;
  children: React.ReactNode;
  metrics: {
    renderCount: number;
    lastDuration: number;
    reset: () => void;
  };
}

export function DemoShell({ module, children, metrics }: DemoShellProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-secondary-foreground">Module</Badge>
          <div className="h-1 w-1 rounded-full bg-muted-foreground" />
          <span className="text-sm text-muted-foreground">{module.id}</span>
        </div>
        <h2 className="text-4xl font-bold tracking-tight">{module.title}</h2>
        <p className="text-xl text-muted-foreground max-w-3xl">
          {module.description}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-md">
          <CardHeader className="border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Interactive Playground</CardTitle>
                <CardDescription>Experiment with the optimization strategy live.</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={metrics.reset}>
                  <RotateCcw className="w-4 h-4 mr-2" /> Reset
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 min-h-[400px] flex items-center justify-center bg-dots">
            {children}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-primary/20 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Real-time Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">Re-renders</span>
                <span className="text-3xl font-mono text-primary font-bold">{metrics.renderCount}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">Last Render Time</span>
                <span className="text-xl font-mono text-secondary-foreground">{metrics.lastDuration.toFixed(2)}ms</span>
              </div>
              <div className="pt-4 border-t">
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    animate={{ width: `${Math.min(metrics.lastDuration * 2, 100)}%` }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">Visual bar indicates relative computational cost.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Implementation Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <div>
                <h4 className="font-semibold text-primary mb-1">Why it matters</h4>
                <p className="text-muted-foreground">{module.whyMatters}</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-1">When to use</h4>
                <p className="text-muted-foreground">{module.whenToUse}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <Tabs defaultValue="before" className="w-full">
          <CardHeader className="border-b pb-0 flex flex-row items-center justify-between space-y-0 py-2">
            <TabsList>
              <TabsTrigger value="before">Before Fix</TabsTrigger>
              <TabsTrigger value="after">Optimized Solution</TabsTrigger>
            </TabsList>
            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(module.afterCode)}>
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </Button>
          </CardHeader>
          <TabsContent value="before" className="m-0 border-none">
            <SyntaxHighlighter
              language="tsx"
              style={vscDarkPlus}
              customStyle={{ margin: 0, borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', fontSize: '13px' }}
            >
              {module.beforeCode}
            </SyntaxHighlighter>
          </TabsContent>
          <TabsContent value="after" className="m-0 border-none">
            <SyntaxHighlighter
              language="tsx"
              style={vscDarkPlus}
              customStyle={{ margin: 0, borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', fontSize: '13px' }}
            >
              {module.afterCode}
            </SyntaxHighlighter>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
