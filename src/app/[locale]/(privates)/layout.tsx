'use client';
import { Header, SidebarNav } from '@/components';
import React, { Suspense } from 'react';

export default function PrivateLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100vh' /* Define a altura total da tela */
      }}
    >
      <Header />

      <div
        style={{
          flex: 1
        }}
      >
        <SidebarNav>
          <Suspense fallback={<p>Loading feed...</p>}>{children}</Suspense>
        </SidebarNav>
      </div>
    </div>
  );
}
