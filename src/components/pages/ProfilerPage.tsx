import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity, Flame, Clock, BarChart3 } from 'lucide-react';

const DATA = [
  { name: 'App', duration: 12.4, color: '#2563eb' },
  { name: 'Dashboard', duration: 8.2, color: '#3b82f6' },
  { name: 'Sidebar', duration: 1.1, color: '#60a5fa' },
  { name: 'ContentList', duration: 6.8, color: '#93c5fd' },
  { name: 'Header', duration: 0.4, color: '#bfdbfe' },
];

export function ProfilerPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Flame className="text-orange-500" />
          React Profiler Insights
        </h2>
        <p className="text-muted-foreground">
          A simulated visualization of what the React DevTools Profiler tells us about component health.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Flamegraph Simulation</CardTitle>
            <CardDescription>Visualizing render cost per component in the tree.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={DATA} margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" label={{ value: 'Duration (ms)', position: 'insideBottom', offset: -5 }} />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px' }}
                />
                <Bar dataKey="duration" radius={[0, 4, 4, 0]}>
                  {DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-dashed">
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider">Metrics Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Self Time</p>
                <p className="text-xs text-muted-foreground">Time spent rendering the component itself, excluding children.</p>
              </div>
            </div>
             <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Total Time</p>
                <p className="text-xs text-muted-foreground">Total time for component + all its children.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Update Cause</p>
                <p className="text-xs text-muted-foreground font-mono mt-1 italic">"Hook 3 changed"</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/20">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-primary">Pro Tip</Badge>
            <h3 className="font-bold">How to read this at a conference</h3>
          </div>
          <p className="text-sm leading-relaxed">
            When presenting the Profiler, look for <strong>Long render delays</strong> and <strong>Frequent commits</strong>. 
            A "healthy" app should see most renders in the sub-5ms range. If you see chunks above 16ms (1 frame at 60fps), 
            you're dropping frames and will see jank.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
