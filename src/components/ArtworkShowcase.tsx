import React, { useState } from 'react';
import { ARTWORKS } from '../data/collectionData';
import { Download, Copy, Check, Maximize2, Sparkles, BookOpen, Tag, Eye, ShieldAlert, Archive, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';
import { downloadFileAsBinary, openImageInNewTab } from '../utils/downloadHelper';

interface ArtworkShowcaseProps {
  initialIndex?: number;
}

export const ArtworkShowcase: React.FC<ArtworkShowcaseProps> = ({ initialIndex = 0 }) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  React.useEffect(() => {
    setSelectedIndex(initialIndex);
  }, [initialIndex]);

  const artwork = ARTWORKS[selectedIndex];
  const [copied, setCopied] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);

  const completedArtworks = ARTWORKS.filter(a => a.status === 'completed');

  const getArtworkEquation = (index: number) => {
    switch (index) {
      case 1:
        return "Q_laser(r, t) = A · (2 P₀ / π R_b²) · exp(-2 r² / R_b²) · B(t)";
      case 2:
        return "Boxide(T) = flc2hs(Tcrack - T, δT), Tcrack = 1900 K, k_SiO2 = 1.4 W/(m·K)";
      case 3:
        return "P_recoil = P_sat(Ts) · (1 - P_amb / P_sat(Ts)), P_max = 8.1 × 10⁵ Pa (0.81 MPa)";
      case 4:
        return "τ_t = -(dγ/dT) · ∇Ts, dγ/dT = -1.6 × 10⁻⁴ N/(m·K)";
      case 5:
        return "ṁ_evap = P_sat(Ts) / √(2π R Ts), Tv = 3538 K, Lv = 1.278 × 10⁷ J/kg";
      case 6:
        return "T⁻ = T⁺, k⁻ ∇T⁻ · n = k⁺ ∇T⁺ · n (Boundary Condition 6)";
      case 7:
        return "ρ Cp (∂T/∂t) + ρ Lm (∂Lf/∂t) = ∇ · (k ∇T) + Q_laser, Lf = flc2hs(T - Tm, 50)";
      case 8:
        return "v_n = ṁ / ρ = -P_recoil + k_mesh (ALE Moving Mesh Formulation)";
      case 9:
        return "q_conv = h · (T - T_amb), h = 1000 W/(m²·K), P_env = P_hydro + P_dyn";
      case 10:
        return "Recast Ridge Height: 106.4 μm (Si) to 156.94 μm (Si/SiO2) at t = 3.3 ms";
      default:
        return "COMSOL Multiphysics ALE Coupled Transient Formulation";
    }
  };

  const handleCopyMetadata = () => {
    const metadataString = JSON.stringify(artwork, null, 2);
    navigator.clipboard.writeText(metadataString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadImage = async () => {
    if (!artwork.image) return;
    setDownloading(true);
    const fname = `QEC_NFT_${String(artwork.index).padStart(3, '0')}_${artwork.title.replace(/[^a-zA-Z0-9]/g, '_')}_Master.jpg`;
    await downloadFileAsBinary(artwork.image, fname);
    setDownloading(false);
  };

  const handleDownloadMasterZip = async () => {
    setDownloadingZip(true);
    await downloadFileAsBinary('/downloads/QEC_Master_Artworks_Pack.zip', 'QEC_Master_Artworks_Pack.zip');
    setDownloadingZip(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Breadcrumb & Master ZIP Download */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">کالکشن:</span>
          <span className="text-cyan-300 font-mono font-medium">Quantum Engraving Collection</span>
          <span className="text-slate-600">/</span>
          <span className="text-amber-300 font-mono font-bold">
            NFT #{String(artwork.index).padStart(3, '0')} ({artwork.subtitle})
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadMasterZip}
            disabled={downloadingZip}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950 transition-all cursor-pointer disabled:opacity-50"
          >
            <Archive className="w-3.5 h-3.5" />
            <span>{downloadingZip ? 'در حال آماده‌سازی...' : 'دانلود پکیج کامل همه تصاویر (ZIP)'}</span>
          </button>

          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            {completedArtworks.length} اثر از ۱۰ اثر نهایی شد (1/1 Master)
          </span>
        </div>
      </div>

      {/* Artwork Selector Bar (Switcher between #001 and #002) */}
      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono pl-2 border-l border-slate-800">
            انتخاب شاهکار:
          </span>
          <div className="flex items-center gap-2">
            {completedArtworks.map((art) => (
              <button
                key={art.id}
                onClick={() => setSelectedIndex(art.index - 1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                  selectedIndex === art.index - 1
                    ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>#{String(art.index).padStart(3, '0')}</span>
                <span className="hidden sm:inline font-sans">{art.subtitle}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            disabled={selectedIndex === 0}
            onClick={() => setSelectedIndex(prev => Math.max(0, prev - 1))}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 cursor-pointer"
            title="اثر قبلی"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            disabled={selectedIndex >= completedArtworks.length - 1}
            onClick={() => setSelectedIndex(prev => Math.min(completedArtworks.length - 1, prev + 1))}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 cursor-pointer"
            title="اثر بعدی"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Artwork Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Artwork Visual Column (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 bg-black shadow-2xl shadow-cyan-950/60 group">
            <div className="relative aspect-square w-full overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                onClick={() => setIsZoomed(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 pointer-events-none">
                <span className="text-xs font-mono text-cyan-300">نسبت ابعاد ۱:۱ • رزولوشن بالا • بدون کادر و واترمارک</span>
              </div>

              <button
                onClick={() => setIsZoomed(true)}
                className="absolute top-3 right-3 p-2.5 rounded-xl bg-black/70 text-slate-300 hover:text-white backdrop-blur-md border border-white/10 transition-all cursor-pointer"
                title="مشاهده تصویر بزرگ اثر"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Row - Fixed Binary Download & Direct View */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadImage}
              disabled={downloading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-900/30 transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'در حال دریافت بایت‌ها...' : 'دانلود باینری اثر (JPG Master)'}</span>
            </button>

            <button
              onClick={() => openImageInNewTab(artwork.image || '')}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
              title="مشاهده تصویر کامل در تب جدید برای ذخیره با کلیک راست"
            >
              <ExternalLink className="w-4 h-4 text-amber-400" />
              <span>مشاهده در تب جدا</span>
            </button>

            <button
              onClick={handleCopyMetadata}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
              <span>{copied ? 'کپی شد!' : 'JSON'}</span>
            </button>
          </div>

          {/* Fix Notice Note for Opening Photos on User PC */}
          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 space-y-1 leading-relaxed">
            <span className="text-cyan-400 font-bold block text-[11px] font-mono">
              ✓ فایل باینری استاندارد JPEG:
            </span>
            <p className="text-[11px] text-slate-400">
              این دکمه تصویر را به صورت بایت‌های خالص باینری (Typed Binary Blob) دانلود می‌کند که در تمام سیستم‌عامل‌ها به راحتی باز می‌شود.
            </p>
          </div>

          {/* Scientific Disclaimer Note */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-start gap-3 text-xs text-slate-400 leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-300 block mb-1">یادداشت صداقت علمی (Scientific Accuracy Note):</strong>
              این اثر بازنمایی هنری و بصری ممتاز از نتایج مدل‌سازی چندفیزیکی COMSOL در گرایش نانوفوتونیک است و خروجی خام مستقیم گراف عددی نرم‌افزار نمی‌باشد.
            </div>
          </div>
        </div>

        {/* Right: Technical, Metadata & Concept Details (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>{artwork.id.toUpperCase()}</span>
              <span>•</span>
              <span>نسخه اصلی ۱ از ۱ (1/1 Single Edition)</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {artwork.title}
            </h2>
            <p className="text-sm text-cyan-300/90 font-mono">
              {artwork.subtitle}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-900 border border-cyan-500/30 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 block font-mono">قیمت پیشنهادی لیستینگ در OpenSea:</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xl font-bold text-white font-mono">{artwork.suggestedPriceEth}</span>
                <span className="text-xs text-slate-400 font-mono">({artwork.suggestedPriceUsd})</span>
              </div>
            </div>

            <div className="text-left font-mono text-[11px] text-slate-400">
              <span>شبکه مبدا: <strong className="text-purple-300">Polygon POS</strong></span>
              <span className="block text-emerald-400">کارمزد بهینه (Gas Efficient)</span>
            </div>
          </div>

          {/* Concept Description */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              مفهوم فیزیکی و روایت اثر (Persian & English)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              {artwork.concept}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed font-sans italic bg-slate-950/80 p-3.5 rounded-xl border border-slate-900" dir="ltr">
              "{artwork.descriptionEn}"
            </p>
          </div>

          {/* Scientific Foundation */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              مبنای علمی در پایان‌نامه کارشناسی ارشد
            </h3>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">مرجع فصل و معادلات:</span>
                <span className="font-mono text-cyan-300">{artwork.thesisRef}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/60 font-mono text-[11px] text-amber-200/90 overflow-x-auto text-left" dir="ltr">
                {getArtworkEquation(artwork.index)}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {artwork.scientificBasis}
              </p>
            </div>
          </div>

          {/* OpenSea Traits / Properties */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              ویژگی‌های ثبت در بلاکچین (OpenSea Properties & Traits)
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              {artwork.attributes.map((attr, index) => (
                <div
                  key={index}
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all text-center space-y-1"
                >
                  <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 block truncate">
                    {attr.trait_type}
                  </span>
                  <span className="text-xs font-semibold text-slate-200 block truncate font-mono">
                    {attr.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-4xl max-h-[92vh] bg-slate-950 rounded-2xl overflow-hidden border border-cyan-500/50 p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b border-slate-800 text-xs font-mono text-slate-300">
              <span className="text-cyan-300 font-bold">{artwork.title}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openImageInNewTab(artwork.image || '')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs cursor-pointer flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>مشاهده فول‌اسکرین در تب</span>
                </button>
                <button
                  onClick={() => setIsZoomed(false)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                >
                  بستن [✕]
                </button>
              </div>
            </div>
            <div className="p-2 flex items-center justify-center max-h-[80vh] overflow-hidden">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="max-h-[78vh] w-auto rounded-lg object-contain shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
