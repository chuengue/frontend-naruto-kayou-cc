import { Header, SidebarNav } from '@/components';

export default function PrivateLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <SidebarNav />
        <div style={{ flex: 1, overflow: 'auto', padding: '18px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
