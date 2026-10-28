import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flame, Droplets, Shield, Activity, Zap, Info } from 'lucide-react';

export const LaserPhysicsSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulation State
  const [isRunning, setIsRunning] = useState(true);
  const [structure, setStructure] = useState<'single' | 'double'>('double'); // Single Si vs Double Si/SiO2
  const [medium, setMedium] = useState<'air' | 'water'>('air'); // Air vs Water
  const [pulseDuration, setPulseDuration] = useState<number>(0.5); // ms (0.3, 0.5, 0.7)
  const [simTime, setSimTime] = useState<number>(0); // ms (0 to 3.5 ms)

  // Physical dynamic outputs
  const [maxTemp, setMaxTemp] = useState<number>(300);
  const [recoilPressure, setRecoilPressure] = useState<number>(0);
  const [craterDepth, setCraterDepth] = useState<number>(0);
  const [recastHeight, setRecastHeight] = useState<number>(0);

  // Animation frame request ref
  const animRef = useRef<number | null>(null);
  const stateRef = useRef({ simTime: 0, structure, medium, pulseDuration, isRunning });

  useEffect(() => {
    stateRef.current = { simTime, structure, medium, pulseDuration, isRunning };
  }, [simTime, structure, medium, pulseDuration, isRunning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localTime = simTime;

    const render = () => {
      const { structure: curStruct, medium: curMedium, pulseDuration: curPulse, isRunning: curRunning } = stateRef.current;

      if (curRunning) {
        localTime += 0.016; // advance ~16ms of simulation timescale
        if (localTime > 3.5) {
          localTime = 3.5;
        }
        setSimTime(parseFloat(localTime.toFixed(3)));
      }

      // Calculations based on thesis chapter 4 results:
      // Air - Single Si: Depth max 160.58 μm, Recast 106.4 μm, P_recoil ~ 5.67e5 Pa, T_vap at 0.245 ms
      // Air - Double Si/SiO2: Depth max 231.01 μm, Recast 156.94 μm, P_recoil ~ 8.1e5 Pa, T_vap at 0.05 ms
      // Water - Single Si: Depth max 23.48 μm, Recast 10.68 μm, P_recoil ~ 8.1e5 Pa, T_vap at 2.5 ms
      // Pulse duration scale factor: 0.3 ms -> x1.8 depth, 0.5 ms -> x1.0, 0.7 ms -> x0.72

      const pulseScale = curPulse === 0.3 ? 1.8 : curPulse === 0.7 ? 0.72 : 1.0;
      const progress = Math.min(localTime / 3.3, 1.0);

      let targetDepth = 160.58;
      let targetRecast = 106.4;
      let targetPeakP = 5.67;
      let vapOnset = 0.245;

      if (curStruct === 'double' && curMedium === 'air') {
        targetDepth = 231.01 * pulseScale;
        targetRecast = 156.94 * pulseScale;
        targetPeakP = 8.1;
        vapOnset = 0.05;
      } else if (curMedium === 'water') {
        targetDepth = 23.48;
        targetRecast = 10.68;
        targetPeakP = 8.1;
        vapOnset = 2.5;
      }

      // Dynamic curve evolution
      const currentD = progress > 0 ? targetDepth * Math.pow(progress, 0.8) : 0;
      const currentR = progress > 0 ? targetRecast * Math.pow(progress, 0.7) : 0;

      let curT = 300;
      if (localTime < vapOnset) {
        curT = 300 + (3538 - 300) * (localTime / vapOnset);
      } else {
        curT = 3538 + Math.sin(localTime * 4) * 60;
      }

      const curP = localTime >= vapOnset ? targetPeakP * Math.min(1.0, (localTime - vapOnset + 0.1) * 2) : 0;

      setMaxTemp(Math.round(curT));
      setCraterDepth(parseFloat(currentD.toFixed(1)));
      setRecastHeight(parseFloat(currentR.toFixed(1)));
      setRecoilPressure(parseFloat(curP.toFixed(2)));

      // Canvas Rendering (2D Axisymmetric Cross-Section)
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Background (Silicon Substrate Base)
      ctx.fillStyle = '#0a0d14';
      ctx.fillRect(0, 0, w, h);

      const centerX = w / 2;
      const surfaceY = 120; // nominal flat substrate surface

      // Draw substrate solid body
      ctx.fillStyle = '#111827';
      ctx.fillRect(40, surfaceY, w - 80, h - surfaceY - 20);

      // Draw Laser Beam if active (simTime < 3.0)
      if (localTime < 3.0) {
        const beamGrad = ctx.createLinearGradient(centerX - 35, 0, centerX + 35, 0);
        beamGrad.addColorStop(0, 'rgba(6, 182, 212, 0.0)');
        beamGrad.addColorStop(0.3, 'rgba(6, 182, 212, 0.25)');
        beamGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
        beamGrad.addColorStop(0.7, 'rgba(245, 158, 11, 0.4)');
        beamGrad.addColorStop(1, 'rgba(245, 158, 11, 0.0)');

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(centerX - 45, 0);
        ctx.lineTo(centerX + 45, 0);
        ctx.lineTo(centerX + 20, surfaceY);
        ctx.lineTo(centerX - 20, surfaceY);
        ctx.closePath();
        ctx.fill();
      }

      // Draw Water Film if medium is water
      if (curMedium === 'water') {
        const waterGrad = ctx.createLinearGradient(0, surfaceY - 60, 0, surfaceY);
        waterGrad.addColorStop(0, 'rgba(14, 165, 233, 0.15)');
        waterGrad.addColorStop(1, 'rgba(14, 165, 233, 0.45)');
        ctx.fillStyle = waterGrad;
        ctx.fillRect(40, surfaceY - 60, w - 80, 60);

        // Water surface line
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(40, surfaceY - 60);
        ctx.lineTo(w - 40, surfaceY - 60);
        ctx.stroke();
        ctx.setLineDash([]);

        // Cavitation bubbles near laser spot
        if (localTime > 0.5) {
          ctx.fillStyle = 'rgba(224, 242, 254, 0.7)';
          for (let i = 0; i < 8; i++) {
            const bx = centerX + (Math.sin(i * 1.7 + localTime * 8) * 35);
            const by = surfaceY - 15 - (i * 6) - (Math.cos(localTime * 5 + i) * 8);
            const br = 2 + (i % 3) * 1.5;
            ctx.beginPath();
            ctx.arc(bx, by, br, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Draw SiO2 Thin-Film Layer if double structure
      if (curStruct === 'double') {
        ctx.fillStyle = localTime < vapOnset ? 'rgba(168, 85, 247, 0.35)' : 'rgba(168, 85, 247, 0.15)';
        ctx.fillRect(40, surfaceY - 8, w - 80, 8);
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 1;
        ctx.strokeRect(40, surfaceY - 8, w - 80, 8);
      }

      // Draw Deformed Surface Profile (ALE Moving Mesh Crater + Recast Ridge)
      // Visual scaling: 1 μm ≈ 0.5 px
      const depthPx = currentD * 0.45;
      const recastPx = currentR * 0.4;
      const craterRadius = 90; // px

      ctx.beginPath();
      ctx.moveTo(40, surfaceY);
      ctx.lineTo(centerX - craterRadius - 30, surfaceY);

      // Left Recast Ridge
      ctx.bezierCurveTo(
        centerX - craterRadius - 10, surfaceY,
        centerX - craterRadius, surfaceY - recastPx,
        centerX - (craterRadius * 0.7), surfaceY - recastPx
      );

      // Crater descent towards center
      ctx.bezierCurveTo(
        centerX - (craterRadius * 0.3), surfaceY + (depthPx * 0.4),
        centerX - 10, surfaceY + depthPx,
        centerX, surfaceY + depthPx
      );

      // Crater ascent right side
      ctx.bezierCurveTo(
        centerX + 10, surfaceY + depthPx,
        centerX + (craterRadius * 0.3), surfaceY + (depthPx * 0.4),
        centerX + (craterRadius * 0.7), surfaceY - recastPx
      );

      // Right Recast Ridge
      ctx.bezierCurveTo(
        centerX + craterRadius, surfaceY - recastPx,
        centerX + craterRadius + 10, surfaceY,
        centerX + craterRadius + 30, surfaceY
      );

      ctx.lineTo(w - 40, surfaceY);
      ctx.lineTo(w - 40, h - 20);
      ctx.lineTo(40, h - 20);
      ctx.closePath();

      // Temperature gradient field fill
      const tempGrad = ctx.createRadialGradient(
        centerX, surfaceY + (depthPx * 0.6), 5,
        centerX, surfaceY + (depthPx * 0.6), 180
      );
      if (curT >= 3538) {
        tempGrad.addColorStop(0, '#ffffff'); // Vaporization core
        tempGrad.addColorStop(0.15, '#fbbf24'); // Melting liquid
        tempGrad.addColorStop(0.35, '#ea580c');
        tempGrad.addColorStop(0.6, '#4338ca');
        tempGrad.addColorStop(1, '#111827');
      } else if (curT >= 1687) {
        tempGrad.addColorStop(0, '#fbbf24');
        tempGrad.addColorStop(0.3, '#dc2626');
        tempGrad.addColorStop(0.65, '#312e81');
        tempGrad.addColorStop(1, '#111827');
      } else {
        tempGrad.addColorStop(0, '#ef4444');
        tempGrad.addColorStop(0.4, '#1e1b4b');
        tempGrad.addColorStop(1, '#111827');
      }

      ctx.fillStyle = tempGrad;
      ctx.fill();

      // Surface outline
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Marangoni Streamline Vortices inside melt pool
      if (curT >= 1687 && currentD > 5) {
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.75)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 3]);

        // Left vortex
        ctx.beginPath();
        ctx.ellipse(centerX - 35, surfaceY + (depthPx * 0.35), 18, 10, -0.2, 0, Math.PI * 2);
        ctx.stroke();

        // Right vortex
        ctx.beginPath();
        ctx.ellipse(centerX + 35, surfaceY + (depthPx * 0.35), 18, 10, 0.2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw Recoil Pressure Normal Force Vectors (pointing downwards into crater)
      if (curP > 0) {
        ctx.strokeStyle = '#f43f5e';
        ctx.fillStyle = '#f43f5e';
        ctx.lineWidth = 2;

        const arrowX = centerX;
        const arrowStartY = surfaceY + (depthPx * 0.3);
        const arrowEndY = surfaceY + depthPx - 4;

        ctx.beginPath();
        ctx.moveTo(arrowX, arrowStartY);
        ctx.lineTo(arrowX, arrowEndY);
        ctx.stroke();

        // Arrowhead
        ctx.beginPath();
        ctx.moveTo(arrowX - 5, arrowEndY - 6);
        ctx.lineTo(arrowX, arrowEndY);
        ctx.lineTo(arrowX + 5, arrowEndY - 6);
        ctx.fill();

        // Annotations
        ctx.font = '10px monospace';
        ctx.fillStyle = '#f43f5e';
        ctx.fillText(`P_recoil: ${curP} MPa`, centerX + 12, surfaceY + (depthPx * 0.5));
      }

      // Simulation Grid Lines & Scale Ruler
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 60; x < w - 40; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, surfaceY - 40);
        ctx.lineTo(x, h - 20);
        ctx.stroke();
      }
      for (let y = surfaceY; y < h - 20; y += 30) {
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(w - 40, y);
        ctx.stroke();
      }

      // Axis label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText('0 (Center r=0)', centerX - 35, h - 6);
      ctx.fillText('+200 μm', centerX + 90, h - 6);
      ctx.fillText('-200 μm', centerX - 140, h - 6);

      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handleReset = () => {
    setSimTime(0);
    setIsRunning(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title & Overview */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>شبیه‌ساز چندفیزیکی فرآیند حکاکی لیزر در COMSOL Multiphysics</span>
          </h2>
          <p className="text-xs text-slate-400">
            مدل‌سازی دوبعدی متقارن‌محوری انتقال حرارت گذرا، ردیابی مرز آزاد (ALE Moving Mesh)، فشار بازگشتی تبخیر و اثر مارانگونی
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-slate-400">زمان شبیه‌سازی:</span>
          <span className="px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/30">
            {simTime.toFixed(2)} ms / 3.50 ms
          </span>
        </div>
      </div>

      {/* Main Simulation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Canvas Display (8 Cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950 shadow-2xl p-2">
            <canvas
              ref={canvasRef}
              width={700}
              height={360}
              className="w-full h-auto rounded-xl block bg-black border border-slate-800"
            />

            {/* In-Canvas Floating Legend */}
            <div className="absolute top-5 left-5 p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono space-y-1 text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-white"></span>
                <span>{'دمای تبخیر و فرسایش (Tv ≥ 3538 K)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-400"></span>
                <span>{'فاز مذاب سیلیکون (Tm ≥ 1687 K)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-purple-400"></span>
                <span>{'لایه نازک اکسیدی SiO2 (سد حرارتی ۱-۵ μm)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-500"></span>
                <span>{'بردار فشار بازگشتی تبخیر (P_recoil)'}</span>
              </div>
            </div>
          </div>

          {/* Interactive Player Controls */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="p-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isRunning ? 'توقف' : 'پخش'}</span>
              </button>

              <button
                onClick={handleReset}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>شروع مجدد</span>
              </button>
            </div>

            {/* Pulse Duration Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-mono">عرض پالس لیزر:</span>
              {[0.3, 0.5, 0.7].map((val) => (
                <button
                  key={val}
                  onClick={() => { setPulseDuration(val); handleReset(); }}
                  className={`px-2.5 py-1 rounded-md font-mono text-[11px] transition-all cursor-pointer ${
                    pulseDuration === val
                      ? 'bg-amber-500 text-black font-bold shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {val} ms
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Controls & Metrics Column (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Live Physics Metrics Box */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Activity className="w-4 h-4 text-cyan-400" />
              متغیرهای خروجی لحظه‌ای COMSOL
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">{'بیشینه دمای سطح (T_max):'}</span>
                <span className={`font-bold ${maxTemp >= 3538 ? 'text-rose-400 animate-pulse' : maxTemp >= 1687 ? 'text-amber-400' : 'text-cyan-300'}`}>
                  {maxTemp} K
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">عمق گودال حکاکی (Depth):</span>
                <span className="font-bold text-cyan-300">
                  {craterDepth} μm
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">ارتفاع تل جانبی (Recast Ridge):</span>
                <span className="font-bold text-amber-300">
                  {recastHeight} μm
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">{'فشار بازگشتی (P_recoil):'}</span>
                <span className="font-bold text-rose-300">
                  {recoilPressure} MPa
                </span>
              </div>
            </div>
          </div>

          {/* Scenario Toggles */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Flame className="w-4 h-4 text-amber-400" />
              سناریوهای لایه‌بندی و محیط
            </h3>

            {/* Structure Toggle */}
            <div className="space-y-1.5 text-xs">
              <label className="text-slate-400 block">جنس و ساختار زیرلایه:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setStructure('single'); handleReset(); }}
                  className={`p-2 rounded-lg text-center transition-all cursor-pointer ${
                    structure === 'single'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold'
                      : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  تک‌لایه سیلیکون (Si)
                </button>
                <button
                  onClick={() => { setStructure('double'); handleReset(); }}
                  className={`p-2 rounded-lg text-center transition-all cursor-pointer ${
                    structure === 'double'
                      ? 'bg-purple-950 text-purple-300 border border-purple-500/50 font-bold'
                      : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  دو‌لایه (Si/SiO2)
                </button>
              </div>
            </div>

            {/* Medium Toggle */}
            <div className="space-y-1.5 text-xs">
              <label className="text-slate-400 block">محیط پیرامونی فرآیند:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setMedium('air'); handleReset(); }}
                  className={`p-2 rounded-lg text-center transition-all cursor-pointer ${
                    medium === 'air'
                      ? 'bg-amber-950/80 text-amber-300 border border-amber-500/50 font-bold'
                      : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  محیط هوا (Air)
                </button>
                <button
                  onClick={() => { setMedium('water'); handleReset(); }}
                  className={`p-2 rounded-lg text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    medium === 'water'
                      ? 'bg-sky-950 text-sky-300 border border-sky-500/50 font-bold'
                      : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <Droplets className="w-3.5 h-3.5" />
                  محیط آب (Water)
                </button>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-[11px] text-slate-400 space-y-1 leading-relaxed">
              <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <Info className="w-3.5 h-3.5" />
                <span>مقایسه فیزیکی سناریوها:</span>
              </div>
              {structure === 'double' && medium === 'air' && (
                <p>وجود لایه اکسید با رسانندگی اندک (1.4 W/m·K) مانع فرار گرما شده و عمق گودال را به ۲۳۱ میکرومتر و تل را به ۱۵۶.۹۴ میکرومتر می‌رساند.</p>
              )}
              {structure === 'single' && medium === 'air' && (
                <p>هدایت حرارتی بالای سیلیکون (148 W/m·K) نفوذ گرما را یکنواخت‌تر کرده و عمقی حدود ۱۶۰.۵۸ میکرومتر ایجاد می‌نماید.</p>
              )}
              {medium === 'water' && (
                <p>خنک‌کاری بسیار شدید آب (h=1000 W/m²·K) از رسیدن سریع به دمای تبخیر جلوگیری کرده و گودالی بسیار تمیز و کم‌عمق (۲۳.۴۸ میکرومتر) بدون بازرسوب پدید می‌آورد.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
