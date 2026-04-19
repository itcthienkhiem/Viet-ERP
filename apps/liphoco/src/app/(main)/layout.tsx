import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('@/components/layout/sidebar'), { ssr: false });

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" suppressHydrationWarning>
      <Sidebar />
      <main className="ml-64 min-h-screen p-6">{children}</main>
    </div>
  );
}
