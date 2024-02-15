import { Header, SidebarNav } from '@/components';
export default function PrivateLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', height: '100vh', position: 'relative' }}>
      <SidebarNav /> {/* Define o SidebarNav para não crescer */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1',
          overflow: 'hidden'
        }}
      >
        <Header />
        <div style={{ flex: '1', overflow: 'auto', padding: '18px' }}>
          {children}
        </div>{' '}
        {/* Conteúdo flexível que cresce */}
      </div>
    </div>
  );
}
