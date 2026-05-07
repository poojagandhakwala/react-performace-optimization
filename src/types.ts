export interface RenderMetric {
  id: string;
  name: string;
  count: number;
  duration: number;
  timestamp: number;
}

export interface OptimizationModule {
  id: string;
  title: string;
  description: string;
  whyMatters: string;
  whenToUse: string;
  beforeCode: string;
  afterCode: string;
  icon: string;
}
