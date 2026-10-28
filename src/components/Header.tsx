import React from 'react';
import { Sparkles, Layers, ShieldCheck, ExternalLink, Cpu, Compass } from 'lucide-react';
import { COLLECTION_INFO } from '../data/collectionData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'overview', label: 'مجموعه و هویت بصری', icon: Sparkles },
    { id: 'artwork', label: 'شاهکار 001 (Birth of Light)', icon: Layers },
    { id: 'simulator', label: 'شبیه‌ساز فیزیکی COMSOL', icon: Cpu },
    { id: 'roadmap', label: 'نقشه راه ۱۰ اثر (Roadmap)', icon: Compass },
    { id: 'thesis', label: 'تحلیل علمی و متغیرهای پایان‌نامه', icon: ShieldCheck },
    { id: 'opensea', label: 'بسته انتشار در OpenSea', icon: ExternalLink },
  ];

  return (
    <header className="border-b border-cyan-900/40 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      {/* Top Banner Stats Bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 px-4 py-1.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-cyan-300 font-semibold">{COLLECTION_INFO.symbol}</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 font-medium">{COLLECTION_INFO.name}</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">پایان‌نامه کارشناسی ارشد نانوفوتونیک دانشگاه تبریز</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="text-slate-300">
              شبکه: <strong className="text-purple-300">Polygon / ETH</strong>
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">
              تعداد آثار: <strong className="text-cyan-300">10 Pieces (1/1 Single Editions)</strong>
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">
              ابزار مدل‌سازی: <strong className="text-amber-300">COMSOL ALE FEM</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-cyan-500/40 shadow-lg shadow-cyan-500/20 bg-black">
            <img 
              src={COLLECTION_INFO.logoUrl} 
              alt="QEC Official Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300 bg-clip-text text-transparent">
                Quantum Engraving Collection
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                1/1 Fine Art
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              استودیو طراحی، توسعه و نظارت بر انتشار کالکشن NFT مبتنی بر فیزیک لیزر و ماده
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const a = document.createElement('a');
              a.href = '/downloads/QEC_Master_Artworks_Pack.zip';
              a.download = 'QEC_Master_Artworks_Pack.zip';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950 transition-all cursor-pointer"
            title="دانلود بسته زیپ کامل تمام تصاویر و متادیتاها"
          >
            <span>دانلود تمام تصاویر (ZIP)</span>
          </button>

          <button
            onClick={() => setActiveTab('opensea')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-900/30 transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>بسته متادیتا و راهنمای OpenSea</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto scrollbar-none py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-t-lg text-xs font-medium whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                isActive
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30 font-semibold shadow-[0_-2px_8px_rgba(6,182,212,0.15)]'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
