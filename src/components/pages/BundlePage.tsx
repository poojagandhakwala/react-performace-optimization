import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Box, Code, Package, FileCode } from 'lucide-react';

const DATA = [
  { name: 'react-dom', value: 130, color: '#2563eb' },
  { name: 'app-logic', value: 85, color: '#3b82f6' },
  { name: 'ui-lib', value: 45, color: '#60a5fa' },
  { name: 'utils', value: 25, color: '#93c5fd' },
  { name: 'vendor', value: 15, color: '#bfdbfe' },
];

export function BundlePage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Box className="text-blue-500" />
          Bundle Optimization
        </h2>
        <p className="text-muted-foreground">
          Understanding dependency overhead and shipping less JavaScript to your users.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bundle Composition</CardTitle>
            <CardDescription>Distribution of library sizes in your main chunk.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-secondary/20">
            <CardContent className="p-6 flex items-start gap-4">
              <Package className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h4 className="font-bold">Tree Shaking</h4>
                <p className="text-sm text-muted-foreground">
                  Ensure you import named exports rather than default imports from large libraries.
                </p>
                <code className="text-[11px] bg-background p-1 mt-2 block rounded border">
                  import &#123; format &#125; from 'date-fns'; // ✅ Good
                </code>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/20">
            <CardContent className="p-6 flex items-start gap-4">
              <FileCode className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h4 className="font-bold">Dynamic Imports</h4>
                <p className="text-sm text-muted-foreground">
                  Use <code>React.lazy()</code> for routes that aren't immediately needed.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Checklist for Production</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            "Enable Gzip/Brotli compression",
            "Optimize large SVG icons",
            "Externalize common deps (CDN)",
            "Analyze with rollup-plugin-visualizer",
            "Remove dead code paths",
            "Minify CSS and JS"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-3 border rounded bg-card">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
