import { cn } from '../../../lib/utils';
import { PERFORMANCE_MODULES } from '../../data/modules';
import { LayoutDashboard, Zap, List, Clock, Activity, Box, Search } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const iconMap: Record<string, any> = {
  LayoutDashboard,
  Zap,
  List,
  Clock,
  Activity,
  Box,
  Search
};

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate()

  return (
    <div className="w-64 border-r bg-card flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <h1 role="button" onClick={() => navigate("/")} className="cursor-pointer text-xl font-bold tracking-tight text-primary flex items-center gap-2">
          <Activity className="w-6 h-6" />
          React Performance Optimization
        </h1>
      </div>

      <nav className="flex-1 px-4 pb-4 space-y-1">
        <div className="text-xs font-semibold text-muted-foreground mb-2 px-2 uppercase">Core Principles</div>
        {PERFORMANCE_MODULES.map((module) => {
          const Icon = iconMap[module.icon] || LayoutDashboard;
          const isActive = location.pathname === `/module/${module.id}`;

          return (
            <Link
              key={module.id}
              to={`/module/${module.id}`}
              className={cn(
                "group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-accent-foreground")} />
              {module.title}
            </Link>
          );
        })}
        
        <div className="pt-4 mt-4 border-t">
          <div className="text-xs font-semibold text-muted-foreground mb-2 px-2 uppercase">Resources</div>
          <Link
            to="/profiler"
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
              location.pathname === '/profiler' ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Activity className="w-4 h-4" />
            Profiler Demo
          </Link>
          <Link
             to="/bundle"
             className={cn(
               "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
               location.pathname === '/bundle' ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
             )}
          >
            <Box className="w-4 h-4" />
            Bundle Analysis
          </Link>
        </div>
      </nav>
    </div>
  );
}
