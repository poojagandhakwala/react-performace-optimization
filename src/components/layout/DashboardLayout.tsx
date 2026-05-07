import { Sidebar } from './Sidebar';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Separator } from '../../../components/ui/separator';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <ScrollArea className="h-screen">
          <div className="p-8 pb-16 max-w-6xl mx-auto w-full">
            {children}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
