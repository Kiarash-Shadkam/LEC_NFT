import React, { useState } from 'react';
import { Download, Sparkles, CheckCircle2, Shield, Eye, Palette, Maximize2, Archive, ExternalLink } from 'lucide-react';
import { COLLECTION_INFO } from '../data/collectionData';
import { downloadFileAsBinary, openImageInNewTab } from '../utils/downloadHelper';

export const IdentityShowcase: React.FC = () => {
  const [modalImage, setModalImage] = useState<{ url: string; title: string } | null>(null);
  const [downloadingLogo, setDownloadingLogo] = useState(false);
  const [downloadingBanner, setDownloadingBanner] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);

  const brandPrinciples = [
    {
      title: "تضاد دراماتیک نور و ماده",
      desc: "پس‌زمینه تیره و عمیق مشکی متالیک (سیلیکون نیمه‌رسانا) در تضاد خیره‌کننده با کانون نور سفید-طلایی گداخته و پرتوهای فرابنفش/فروسرخ فوتونیک.",
      icon: Palette
    },
    {
      title: "پاکی مطلق تصویر اصلی",
      desc: "هیچ‌گونه متن، لوگو، قاب، تایپوگرافی، تاریخ یا واترمارک درون تصویر اصلی قرار ندارد؛ مناسب استانداردهای گالری‌های هنری لوکس بین‌المللی و حراجی‌های کریپتوآرت.",
      icon: Shield
    },
    {
      title: "ریشه و اصالت عمیق فیزیکی",
      desc: "تمام آثار بازتاب الگوهای واقعی معادله شار گوسی، امواج صوتی ناشی از تبخیر، خطوط جریان مارانگونی و تداخل نوری لایه‌های نازک اکسیدی هستند.",
      icon: Sparkles
    }
  ];

  const handleDownloadLogo = async () => {
    setDownloadingLogo(true);
    await downloadFileAsBinary(COLLECTION_INFO.logoUrl, 'QEC_Collection_Logo_1024x1024.jpg');
    setDownloadingLogo(false);
  };

  const handleDownloadBanner = async () => {
    setDownloadingBanner(true);
    await downloadFileAsBinary(COLLECTION_INFO.bannerUrl, 'QEC_Collection_Banner_1376x768.jpg');
    setDownloadingBanner(false);
  };

  const handleDownloadZip = async () => {
    setDownloadingZip(true);
    await downloadFileAsBinary('/downloads/QEC_Master_Artworks_Pack.zip', 'QEC_Master_Artworks_Pack.zip');
    setDownloadingZip(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner Section */}
      <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-900 shadow-2xl group">
        <div className="relative h-64 md:h-80 w-full overflow-hidden bg-black">
          <img
            src={COLLECTION_INFO.bannerUrl}
            alt="QEC Collection Banner"
            className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => openImageInNewTab(COLLECTION_INFO.bannerUrl)}
              className="p-2.5 rounded-xl bg-black/60 text-white/80 hover:text-white hover:bg-black/90 backdrop-blur-md border border-white/10 transition-all cursor-pointer"
              title="مشاهده مستقیم بنر در تب جدید"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={() => setModalImage({ url: COLLECTION_INFO.bannerUrl, title: "بنر رسمی کالکشن (16:9)" })}
              className="p-2.5 rounded-xl bg-black/60 text-white/80 hover:text-white hover:bg-black/90 backdrop-blur-md border border-white/10 transition-all cursor-pointer"
              title="بزرگنمایی بنر"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Floating Profile / Logo Badge */}
        <div className="relative -mt-16 md:-mt-20 px-6 pb-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <div className="relative group/logo">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 border-cyan-400/80 bg-black shadow-2xl shadow-cyan-500/30">
                <img
                  src={COLLECTION_INFO.logoUrl}
                  alt="QEC Official Logo"
                  className="w-full h-full object-cover group-hover/logo:scale-105 transition-transform duration-500"
                />
              </div>
              <button
                onClick={() => setModalImage({ url: COLLECTION_INFO.logoUrl, title: "لوگوی رسمی و آواتار پروفایل (1:1)" })}
                className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/70 text-cyan-300 hover:text-white backdrop-blur-md border border-cyan-500/30 transition-all cursor-pointer"
                title="بزرگنمایی لوگو"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  {COLLECTION_INFO.symbol}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  هویت علمی تأییدشده
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-purple-950/80 text-purple-300 border border-purple-500/30">
                  Polygon / OpenSea
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {COLLECTION_INFO.name}
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                مجموعه هنری ممتاز ۱۰ اثره (نسخه‌های تک ۱/۱) حاصل همگرایی فوتونیک کوانتومی، پردازش نانومقیاس با لیزر Nd:YAG و شبیه‌سازی چندفیزیکی در نرم‌افزار COMSOL Multiphysics.
              </p>
            </div>
          </div>

          {/* Quick Actions with Binary Download & Master ZIP */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleDownloadZip}
              disabled={downloadingZip}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950 transition-all cursor-pointer disabled:opacity-50"
            >
              <Archive className="w-4 h-4" />
              <span>{downloadingZip ? 'در حال آماده‌سازی...' : 'دانلود کل پکیج تصاویر (ZIP)'}</span>
            </button>

            <button
              onClick={handleDownloadLogo}
              disabled={downloadingLogo}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>{downloadingLogo ? 'در حال دریافت...' : 'دانلود لوگو (1:1)'}</span>
            </button>

            <button
              onClick={handleDownloadBanner}
              disabled={downloadingBanner}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>{downloadingBanner ? 'در حال دریافت...' : 'دانلود بنر (16:9)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Brand Identity Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {brandPrinciples.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-slate-950 rounded-2xl overflow-hidden border border-cyan-500/40 p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b border-slate-800 text-xs font-mono text-slate-300">
              <span className="text-cyan-300 font-bold">{modalImage.title}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openImageInNewTab(modalImage.url)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs cursor-pointer flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>مشاهده در تب جداگانه</span>
                </button>
                <button
                  onClick={() => setModalImage(null)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                >
                  بستن [✕]
                </button>
              </div>
            </div>
            <div className="p-2 flex items-center justify-center max-h-[75vh] overflow-hidden">
              <img
                src={modalImage.url}
                alt={modalImage.title}
                className="max-h-[72vh] w-auto rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
