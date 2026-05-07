import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { MemoizationDemo } from './components/demos/MemoizationDemo';
import { VirtualizationDemo } from './components/demos/VirtualizationDemo';
import { TransitionsDemo } from './components/demos/TransitionsDemo';
import { CalculationDemo } from './components/demos/CalculationDemo';
import { DeferredDemo } from './components/demos/DeferredDemo';
import { ProfilerPage } from './components/pages/ProfilerPage';
import { BundlePage } from './components/pages/BundlePage';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Rocket, Zap, Clock, ShieldCheck, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <div className="space-y-12 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-black tracking-tighter bg-gradient-to-br from-primary to-blue-400 bg-clip-text text-transparent">
          REACT PERFORMANCE OPTIMIZATION
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          High-performance React is an art. This project is your interactive guide to mastering 
          Memoization, Virtualization, and the latest React 19 primitives.
        </p>
        <div className="pt-6 flex justify-center gap-4">
          <Link to="/module/memoization">
            <Button size="lg" className="h-12 px-8">Start the Masterclass</Button>
          </Link>
          <Button variant="outline" size="lg" className="h-12 px-8">
            <Activity className="w-4 h-4 mr-2" /> View Source
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
        <Card className="bg-primary/5 border-primary/20 hover:border-primary transition-all group">
          <CardHeader>
            <Zap className="w-10 h-10 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <CardTitle>Instant Metrics</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Every demo includes real-time render count and performance timing using High Resolution Time APIs.
          </CardContent>
        </Card>
        
        <Card className="bg-secondary/5 border-secondary/20 hover:border-secondary transition-all group">
          <CardHeader>
            <ShieldCheck className="w-10 h-10 text-secondary-foreground mb-2 group-hover:scale-110 transition-transform" />
            <CardTitle>Production Ready</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Explore concepts used by companies like Meta, Netflix, and Airbnb to scale their React applications.
          </CardContent>
        </Card>

        <Card className="bg-orange-500/5 border-orange-500/20 hover:border-orange-500 transition-all group">
          <CardHeader>
            <Rocket className="w-10 h-10 text-orange-500 mb-2 group-hover:scale-110 transition-transform" />
            <CardTitle>React 19 Hooks</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Deep dive into transitions and deferred values that make modern concurrent React possible.
          </CardContent>
        </Card>
      </div>

      <footer className="pt-24 text-center border-t border-dashed">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          Created for Technical Talks & Engineering Teams • 2026
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/module/memoization" element={<MemoizationDemo />} />
          <Route path="/module/virtualization" element={<VirtualizationDemo />} />
          <Route path="/module/transitions" element={<TransitionsDemo />} />
          <Route path="/module/calculation" element={<CalculationDemo />} />
          <Route path="/module/deferred" element={<DeferredDemo />} />
          <Route path="/profiler" element={<ProfilerPage />} />
          <Route path="/bundle" element={<BundlePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
