import { PremiumSidebar } from "./PremiumSidebar";
import { PremiumNavbar } from "./PremiumNavbar";

export function ModuleLayout({
  title,
  subtitle,
  tutorial,
  visualization,
  controls,
  bottom,
}: {
  title: string;
  subtitle: string;
  tutorial: React.ReactNode;
  visualization: React.ReactNode;
  controls: React.ReactNode;
  bottom?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <PremiumSidebar />
      <div className="flex-1 min-w-0 grid-bg">
        <PremiumNavbar title={title} subtitle={subtitle} />
        <main className="px-4 lg:px-8 py-6 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <aside className="xl:col-span-3 space-y-4 xl:sticky xl:top-20 xl:self-start xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto scroll-thin pr-1">
              {tutorial}
            </aside>
            <section className="xl:col-span-6 space-y-6">{visualization}</section>
            <aside className="xl:col-span-3 space-y-4 xl:sticky xl:top-20 xl:self-start xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto scroll-thin pr-1">
              {controls}
            </aside>
          </div>
          {bottom}
        </main>
      </div>
    </div>
  );
}
