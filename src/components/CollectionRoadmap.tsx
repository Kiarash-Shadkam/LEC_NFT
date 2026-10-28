import React, { useState } from 'react';
import { ARTWORKS, NFTItem } from '../data/collectionData';
import { CheckCircle2, Clock, Sparkles, Tag, BookOpen, Layers, ArrowRight, Eye } from 'lucide-react';

interface CollectionRoadmapProps {
  onSelectArtwork: (artworkId: string) => void;
}

export const CollectionRoadmap: React.FC<CollectionRoadmapProps> = ({ onSelectArtwork }) => {
  const [selectedArtwork, setSelectedArtwork] = useState<NFTItem | null>(null);

  const completedCount = ARTWORKS.filter(a => a.status === 'completed').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Roadmap Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              ۱۰ اثر مستقل ۱/۱
            </span>
            <span className="text-xs text-slate-400">انطباق ۱۰۰٪ با پایان‌نامه نانوفوتونیک دانشگاه تبریز</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            نقشه راه و فرآیند گام‌به‌گام کالکشن Quantum Engraving (QEC)
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
            تولید آثار بر اساس استراتژی مرحله‌به‌مرحله صورت می‌پذیرد. هم‌اکنون آثار #001 و #002 آماده و در پکیج رسمی قرار دارند.
          </p>
        </div>

        {/* Progress Counter */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-center font-mono">
          <span className="text-xs text-slate-400 block">پیشرفت کالکشن</span>
          <div className="text-xl font-extrabold text-cyan-300 mt-0.5">
            {completedCount} از ۱۰ <span className="text-xs text-slate-500 font-normal">تکمیل‌شده</span>
          </div>
        </div>
      </div>

      {/* Artworks List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTWORKS.map((item) => {
          const isDone = item.status === 'completed';
          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden bg-slate-900/70 hover:shadow-xl ${
                isDone
                  ? 'border-cyan-500/50 shadow-cyan-950/50 hover:border-cyan-400'
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Card Thumbnail / Header */}
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center border-b border-slate-800">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full p-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-slate-900 to-black space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
                        #{String(item.index).padStart(3, '0')}
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        آماده برای رندر نهایی در فاز ۲
                      </span>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-2.5 right-2.5">
                    {isDone ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 backdrop-blur-md">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        نهایی‌شده (1/1 Master)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-900/90 text-amber-300/90 border border-amber-500/30 flex items-center gap-1 backdrop-blur-md">
                        <Clock className="w-3 h-3 text-amber-400" />
                        در صف تولید
                      </span>
                    )}
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/80 text-slate-200 border border-white/10 backdrop-blur-md">
                    {item.suggestedPriceEth}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 block mb-0.5">
                      QEC #{String(item.index).padStart(3, '0')} • {item.subtitle}
                    </span>
                    <h3 className="text-sm font-bold text-white line-clamp-1">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.concept}
                  </p>

                  <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{item.thesisRef}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 pt-0 flex items-center gap-2">
                {isDone ? (
                  <button
                    onClick={() => onSelectArtwork(item.id)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-950 transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>مشاهده جزئیات شاهکار 001</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedArtwork(item)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer border border-slate-700/80"
                  >
                    <span>بررسی پرامپت و مبنای علمی</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 rotate-180" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Queued Artwork Modal */}
      {selectedArtwork && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedArtwork(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-slate-950 rounded-2xl overflow-hidden border border-cyan-500/40 p-6 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-cyan-400">
                  QEC #{String(selectedArtwork.index).padStart(3, '0')} • {selectedArtwork.subtitle}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {selectedArtwork.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArtwork(null)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs cursor-pointer"
              >
                بستن [✕]
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  مفهوم هنری و فیزیکی:
                </h4>
                <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  {selectedArtwork.concept}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  مبنای علمی و بخش پایان‌نامه:
                </h4>
                <p className="text-slate-400 leading-relaxed font-mono bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/80">
                  {selectedArtwork.scientificBasis}
                </p>
                <span className="text-[11px] text-cyan-400/90 font-mono mt-1 block">
                  ارجاع: {selectedArtwork.thesisRef}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-purple-400" />
                  عناصر بصری شاخص در طراحی:
                </h4>
                <ul className="space-y-1 list-disc list-inside text-slate-400 pr-1">
                  {selectedArtwork.visualElements.map((elem, idx) => (
                    <li key={idx}>{elem}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 flex justify-between items-center font-mono">
                <span className="text-slate-400">قیمت پیشنهادی لیستینگ:</span>
                <span className="font-bold text-cyan-300">
                  {selectedArtwork.suggestedPriceEth} ({selectedArtwork.suggestedPriceUsd})
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedArtwork(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 cursor-pointer"
              >
                متوجه شدم
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
