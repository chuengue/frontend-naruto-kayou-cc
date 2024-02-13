import { Header } from '@/components';

export default function PrivateLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
