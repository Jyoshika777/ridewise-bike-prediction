import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ParticleBackground } from './ParticleBackground';
import { FloatingBikes } from './FloatingBikes';
import { CustomCursor } from './CustomCursor';

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export const Layout = ({ children, showFooter = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <ParticleBackground />
      <FloatingBikes />
      <CustomCursor />
      <Navbar />
      <main className="pt-24">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};
