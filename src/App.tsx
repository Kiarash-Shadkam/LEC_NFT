import React, { useState } from 'react';
import { Header } from './components/Header';
import { IdentityShowcase } from './components/IdentityShowcase';
import { ArtworkShowcase } from './components/ArtworkShowcase';
import { LaserPhysicsSimulation } from './components/LaserPhysicsSimulation';
import { CollectionRoadmap } from './components/CollectionRoadmap';
import { ThesisRepository } from './components/ThesisRepository';
import { OpenSeaDeploymentGuide } from './components/OpenSeaDeploymentGuide';
import { ARTWORKS } from './data/collectionData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState<number>(0);

  const handleSelectArtwork = (artworkId: string) => {
    const foundIndex = ARTWORKS.findIndex(a => a.id === artworkId);
    if (foundIndex !== -1 && ARTWORKS[foundIndex].status === 'completed') {
      setSelectedArtworkIndex(foundIndex);
      setActiveTab('artwork');
    } else {
      setActiveTab('roadmap');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black font-sans" dir="rtl">
      {/* Top Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {activeTab === 'overview' && <IdentityShowcase />}
        {activeTab === 'artwork' && <ArtworkShowcase initialIndex={selectedArtworkIndex} />}
        {activeTab === 'simulator' && <LaserPhysicsSimulation />}
        {activeTab === 'roadmap' && <CollectionRoadmap onSelectArtwork={handleSelectArtwork} />}
        {activeTab === 'thesis' && <ThesisRepository />}
        {activeTab === 'opensea' && <OpenSeaDeploymentGuide />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-cyan-400">Quantum Engraving Collection (QEC)</span>
            <span>•</span>
            <span>پایان‌نامه کارشناسی ارشد نانوفوتونیک، دانشگاه تبریز</span>
          </div>

          <div className="text-[11px] font-mono text-slate-400">
            طراحی و پیاده‌سازی برای عرضه در بازارهای NFT بین‌المللی (OpenSea / Polygon)
          </div>
        </div>
      </footer>
    </div>
  );
}
