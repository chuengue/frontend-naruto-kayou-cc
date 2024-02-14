import { SidebarNav } from '@/components';

export default function PrivateLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        position: 'relative',
        overflow: ' hidden',
        gap: '8px'
      }}
    >
      <SidebarNav />

      <div style={{ overflow: 'auto', padding: '18px' }}>{children}</div>
    </div>
  );
}
