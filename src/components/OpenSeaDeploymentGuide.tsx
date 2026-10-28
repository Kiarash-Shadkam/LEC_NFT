import React, { useState } from 'react';
import { COLLECTION_INFO, ARTWORKS } from '../data/collectionData';
import { Download, Copy, Check, ExternalLink, ShieldCheck, CheckCircle2, ChevronRight, Layers, FileCode } from 'lucide-react';

export const OpenSeaDeploymentGuide: React.FC = () => {
  const [copiedMetadata, setCopiedMetadata] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2, 3]);

  const toggleStep = (stepNumber: number) => {
    if (completedSteps.includes(stepNumber)) {
      setCompletedSteps(completedSteps.filter((s) => s !== stepNumber));
    } else {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
  };

  const steps = [
    {
      num: 1,
      title: "تحلیل علمی و استخراج پارامترهای پایان‌نامه",
      desc: "استخراج معادلات، خواص سیلیکون و اکسید، مقایسه هوا و آب و جدول‌های عمق و تل جانبی از پایان‌نامه دانشگاه تبریز.",
      statusText: "تکمیل‌شده در فاز ۱"
    },
    {
      num: 2,
      title: "تدوین و تصویب نقشه راه ۱۰ اثر (Roadmap)",
      desc: "تطبیق مفاهیم فیزیکی با آثار QEC #001 تا QEC #010 و حذف ادعاهای غیرواقعی (مانند پلاسمای تجربی یا نانوکراتر بدون مقیاس).",
      statusText: "تکمیل و تصویب شد"
    },
    {
      num: 3,
      title: "طراحی هویت بصری کالکشن (Logo & Wide Banner)",
      desc: "تولید آواتار مربعی ۱:۱ (qec_logo.jpg) و بنر سینمایی عریض ۱۶:۹ (qec_banner.jpg) منطبق بر استانداردهای بصری OpenSea بدون متن و کادر.",
      statusText: "تولید و ذخیره شد"
    },
    {
      num: 4,
      title: "تولید مستر اثر اول: Quantum Engraving #001 (Birth of Light)",
      desc: "خلق شاهکار شماره یک با نسبت ۱:۱ با بالاترین وضوح فوتونیک و آماده‌سازی فایل اصلی بدون واترمارک برای خریدار ۱/۱.",
      statusText: "آماده برای بارگذاری"
    },
    {
      num: 5,
      title: "بارگذاری دارایی‌ها روی شبکه توزیع‌شده IPFS / Arweave",
      desc: "آپلود فایل‌های اصلی تصویر (Logo, Banner, Artwork #001) در پلتفرم‌هایی مانند Pinata یا NFT.Storage جهت دریافت هش غیرمتمرکز ipfs:// CID.",
      statusText: "گام اجرایی بعدی"
    },
    {
      num: 6,
      title: "ساخت کالکشن در OpenSea Studio (شبکه Polygon)",
      desc: "ایجاد قرارداد هوشمند ERC-721 روی شبکه پالیگان (برای کارمزد ناچیز مینت و نقل و انتقال) با نام Quantum Engraving Collection و نماد QEC.",
      statusText: "گام اجرایی بعدی"
    },
    {
      num: 7,
      title: "مینت (Mint) اثر شماره 001 و ثبت ویژگی‌های بلاکچین (Properties)",
      desc: "بارگذاری JSON متادیتا و ست کردن صفات علمی (Material, Wavelength, Simulation Framework, Physical State, Edition 1/1).",
      statusText: "گام اجرایی بعدی"
    },
    {
      num: 8,
      title: "تعیین قیمت و بازاریابی برای جامعه علم و هنر دیجیتال",
      desc: "لیستینگ با قیمت اولیه پیشنهادی 0.20 ETH و اشتراک‌گذاری در توییتر/X و کامیونیتی‌های ScienceArt و کریپتوآرت.",
      statusText: "گام پایانی"
    }
  ];

  const handleCopyJson = () => {
    fetch('/metadata/qec_001.json')
      .then(res => res.text())
      .then(text => {
        navigator.clipboard.writeText(text);
        setCopiedMetadata(true);
        setTimeout(() => setCopiedMetadata(false), 2500);
      })
      .catch(() => {
        const fallback = JSON.stringify(ARTWORKS[0], null, 2);
        navigator.clipboard.writeText(fallback);
        setCopiedMetadata(true);
        setTimeout(() => setCopiedMetadata(false), 2500);
      });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Deployment Hub Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              <FileCode className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono text-cyan-300 font-bold">بسته انتشار رسمی OpenSea & Polygon</span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            استاندارد فراداده: <strong className="text-white">ERC-721 Metadata Standard</strong>
          </span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
          راهنمای جامع گام‌به‌گام و ابزارهای استقرار کالکشن در OpenSea
        </h2>
        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
          کلیه فایل‌های متادیتا، تصاویر مستر و مشخصات فنی بر اساس پروتکل استاندارد بازار OpenSea تهیه شده است. در زیر می‌توانید چک‌لیست انتشار را دنبال کنید و بسته متادیتای آماده را دانلود نمایید.
        </p>
      </div>

      {/* Checklist & Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Checklist (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>چک‌لیست مراحل اجرای پروژه و انتشار رسمی</span>
          </h3>

          <div className="space-y-2.5">
            {steps.map((st) => {
              const isChecked = completedSteps.includes(st.num);
              return (
                <div
                  key={st.num}
                  onClick={() => toggleStep(st.num)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isChecked
                      ? 'bg-slate-900/80 border-cyan-500/40 shadow-sm shadow-cyan-950'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold font-mono transition-colors ${
                      isChecked
                        ? 'bg-cyan-500 text-black'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isChecked ? <Check className="w-4 h-4" /> : st.num}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`text-xs font-bold ${isChecked ? 'text-white' : 'text-slate-300'}`}>
                        {st.title}
                      </h4>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isChecked ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {st.statusText}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Metadata JSON Inspector & Export (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-cyan-400" />
                <span>متادیتای استاندارد QEC #001 (ERC-721 JSON)</span>
              </h3>
              <button
                onClick={handleCopyJson}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer"
              >
                {copiedMetadata ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedMetadata ? 'کپی شد!' : 'کپی JSON'}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-black/80 border border-slate-800/80 max-h-96 overflow-y-auto scrollbar-thin text-left font-mono text-[11px] text-emerald-300/90 leading-relaxed" dir="ltr">
              <pre>{`{
  "name": "Quantum Engraving #001 — Birth of Light",
  "description": "The exact inception of laser-matter interaction: a high-coherence Gaussian Nd:YAG laser beam strikes the reflective crystalline plane of semiconductor silicon...",
  "image": "ipfs://QmQuantumEngraving001/qec_nft_001.jpg",
  "external_url": "https://opensea.io/collection/quantum-engraving-collection",
  "edition": "1/1",
  "creator": "Alireza Mahdipour Shadkam",
  "attributes": [
    { "trait_type": "Material", "value": "Single-Crystal Silicon (Si)" },
    { "trait_type": "Laser Medium", "value": "Nd:YAG Solid-State" },
    { "trait_type": "Wavelength", "value": "1064 nm" },
    { "trait_type": "Spatial Mode", "value": "Fundamental Gaussian (TEM00)" },
    { "trait_type": "Physical State", "value": "Melt Inception (T >= 1687 K)" },
    { "trait_type": "Environment", "value": "Ambient Air (h = 10 W/m²·K)" },
    { "trait_type": "Governing Physics", "value": "Transient Heat Transfer & Gaussian Flux" },
    { "trait_type": "Scientific Framework", "value": "COMSOL Multiphysics ALE Modeling" },
    { "trait_type": "Collection Index", "value": "001 of 010" },
    { "trait_type": "Edition Type", "value": "Original 1 of 1" }
  ]
}`}</pre>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href="/metadata/qec_001.json"
                download="qec_001.json"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-950 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>دانلود فایل فراداده (qec_001.json)</span>
              </a>

              <a
                href="https://opensea.io/studio"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                <span>باز کردن استودیو OpenSea (opensea.io/studio)</span>
              </a>
            </div>
          </div>

          {/* Pricing Recommendation Note */}
          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-purple-200/90 space-y-1.5">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <span>استراتژی قیمت‌گذاری اولیه آثار:</span>
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              برای اثر #001، قیمت پیشنهادی <strong>0.20 ETH</strong> معقول و جذاب برای مجموعه‌داران هنر علمی (Science Art) است. فروش اولین اثر راه را برای لیستینگ پلکانی آثار #002 تا #010 با قیمت‌های 0.22 تا 0.30 ETH هموار خواهد ساخت.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
