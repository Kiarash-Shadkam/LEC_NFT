import React from 'react';
import { THESIS_DATA_TABLES, COLLECTION_INFO } from '../data/collectionData';
import { BookOpen, GraduationCap, FileText, Database, ShieldAlert, Cpu, CheckCircle2 } from 'lucide-react';

export const ThesisRepository: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Thesis Header Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-purple-950/30 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <GraduationCap className="w-4 h-4" />
            <span>پایان‌نامه کارشناسی ارشد نانوفوتونیک • دانشگاه تبریز (بهمن ۱۴۰۴)</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
            مرجع علمی رسمی کالکشن QEC
          </span>
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {COLLECTION_INFO.coreThesis}
          </h2>
          <p className="text-sm text-cyan-300/80 mt-1 font-mono">
            مدل‌سازی و پیاده‌سازی حکاکی لیزر با در نظر گرفتن اثر جنس لایه‌ها
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-slate-400 block text-[11px]">پژوهشگر و خالق:</span>
            <strong className="text-white font-medium">{COLLECTION_INFO.creator}</strong>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-slate-400 block text-[11px]">اساتید راهنما و مشاور:</span>
            <strong className="text-white font-medium">{COLLECTION_INFO.supervisors}</strong>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-slate-400 block text-[11px]">نرم‌افزار و متدولوژی:</span>
            <strong className="text-cyan-300 font-mono font-medium">{COLLECTION_INFO.modelingTool}</strong>
          </div>
        </div>
      </div>

      {/* Table 4-1: Main Scenarios Comparison */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>جدول ۴-۱ پایان‌نامه: مقایسه عمق حفره و ارتفاع تل جانبی در سناریوهای اصلی</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">زمان شبیه‌سازی: ۳.۳ میلی‌ثانیه • عرض پالس: ۰.۵ ms</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] bg-slate-950/50">
                <th className="p-3">نوع ساختار زیرلایه</th>
                <th className="p-3">محیط پیرامونی</th>
                <th className="p-3">عمق نهایی حفره (μm)</th>
                <th className="p-3">ارتفاع تل جانبی (μm)</th>
                <th className="p-3">شروع تبخیر</th>
                <th className="p-3">ویژگی‌های مورفولوژیکی و فیزیکی</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {THESIS_DATA_TABLES.simulationScenarios.map((sc, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3 font-semibold text-white">{sc.scenario}</td>
                  <td className="p-3 text-cyan-300">{sc.medium}</td>
                  <td className="p-3 text-amber-300 font-bold">{sc.craterDepth}</td>
                  <td className="p-3 text-purple-300 font-bold">{sc.recastHeight}</td>
                  <td className="p-3 text-slate-300">{sc.vaporizationOnset}</td>
                  <td className="p-3 text-slate-400 font-sans text-xs">{sc.features}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two-Column Technical Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Table 3-1: Silicon Properties */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>جدول ۳-۱: خواص فیزیکی و ترمودینامیکی سیلیکون در دمای اتاق (300K)</span>
          </h3>

          <div className="overflow-x-auto max-h-80 scrollbar-thin">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="p-2">ویژگی فیزیکی</th>
                  <th className="p-2">مقدار در مدل</th>
                  <th className="p-2">نقش در فرآیند حکاکی</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                {THESIS_DATA_TABLES.siliconProperties.map((prop, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="p-2 text-slate-300 font-sans">{prop.property}</td>
                    <td className="p-2 text-cyan-300 font-bold">{prop.value}</td>
                    <td className="p-2 text-slate-400 font-sans">{prop.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pulse Width Effect (Table 4-2) & Thin Film Oxide Breakdown */}
        <div className="space-y-6">
          {/* Table 4-2 */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>جدول ۴-۲: اثر عرض پالس بر عمق و تل جانبی در ساختار دو‌لایه (Si/SiO2)</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                    <th className="p-2">عرض پالس (ms)</th>
                    <th className="p-2">عمق حفره (μm)</th>
                    <th className="p-2">ارتفاع تل جانبی (μm)</th>
                    <th className="p-2">نتیجه فیزیکی</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {THESIS_DATA_TABLES.pulseWidthComparison.map((pw, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      <td className="p-2 text-cyan-300 font-bold">{pw.pulseWidth}</td>
                      <td className="p-2 text-amber-300 font-bold">{pw.depth}</td>
                      <td className="p-2 text-purple-300">{pw.recastHeight}</td>
                      <td className="p-2 text-slate-400 font-sans">{pw.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Scientific Validation & Disclosure Box */}
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-amber-500/30 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>مرزهای اعتبار و صداقت علمی (Scientific Limitations)</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-slate-300 leading-relaxed text-[11px]">
              <li>
                <strong>ماهیت شبیه‌سازی عددی:</strong> پژوهش بر مبنای حل عددی معادلات دیفرانسیل جزئی در نرم‌افزار COMSOL است و تست تجربی مستقلی در آزمایشگاه اختصاصی توسط نگارنده انجام نگرفته است.
              </li>
              <li>
                <strong>اعتبارسنجی کیفی:</strong> صحت‌سنجی از طریق مقایسه روندها با داده‌های مقالات مرجع بین‌المللی (Zhang 2019, Sikora 2019, Wee 2011) صورت گرفته است.
              </li>
              <li>
                <strong>تعریف در بازار NFT:</strong> کلیه توکن‌ها تحت عنوان رسمی <em>«Science & Multiphysics Simulation-Inspired Digital Art»</em> نام‌گذاری و منتشر می‌شوند.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
