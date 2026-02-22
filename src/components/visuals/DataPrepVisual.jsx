import { motion } from 'framer-motion';
import { Clock, CalendarDays, Waves } from 'lucide-react';
import { useState, useEffect } from 'react';

const DataPrepVisual = () => {
    const [step, setStep] = useState(0);

    // Auto-progress animation sequence
    useEffect(() => {
        const timer1 = setTimeout(() => setStep(1), 2500); // 1. Clean Data
        const timer2 = setTimeout(() => setStep(2), 5500); // 2. Time Features
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    const gridData = [
        [55, 54, 0, 52],
        [65, 0, 63, 64],
        [40, 42, 45, 0]
    ];

    return (
        <div className="flex flex-col items-center justify-center p-8 w-full max-w-2xl">
            <h2 className="text-3xl font-bold mb-8 text-white">Data Preparation & Time Travel</h2>

            {/* Simulation 1: Missing Data Interpolation */}
            <div className="w-full bg-slate-900/80 border border-slate-700 p-6 rounded-2xl shadow-xl mb-8">
                <h3 className="text-sm text-slate-400 uppercase tracking-widest mb-4 font-semibold flex items-center justify-between">
                    <span>Cleaning Missing Sensor Data</span>
                    {step === 0 ? <span className="text-red-400 animate-pulse">Detecting 0.0 values...</span> : <span className="text-emerald-400">Interpolated!</span>}
                </h3>

                <div className="grid grid-cols-4 gap-2">
                    {gridData.map((row, rIdx) =>
                        row.map((cell, cIdx) => {
                            const isMissing = cell === 0;
                            const interpolatedValue = isMissing ? (rIdx === 0 ? 53 : rIdx === 1 ? 64 : 46) : cell;

                            return (
                                <motion.div
                                    key={`cell-${rIdx}-${cIdx}`}
                                    className={`h-12 flex items-center justify-center rounded font-mono text-lg font-bold border transition-colors duration-1000 ${isMissing
                                            ? (step > 0 ? 'bg-emerald-900/40 text-emerald-400 border-emerald-500/50' : 'bg-red-900/40 text-red-400 border-red-500/50')
                                            : 'bg-slate-800 text-slate-300 border-slate-700'
                                        }`}
                                    animate={isMissing && step > 0 ? { scale: [1, 1.1, 1] } : {}}
                                    transition={{ duration: 0.5 }}
                                >
                                    {isMissing && step === 0 ? '0.0' : interpolatedValue}
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Simulation 2: Time Embeddings (Sine/Cosine Waves) */}
            <motion.div
                className="w-full bg-slate-900/80 border border-slate-700 p-6 rounded-2xl shadow-xl"
                initial={{ opacity: 0.3, y: 20 }}
                animate={{ opacity: step >= 2 ? 1 : 0.3, y: step >= 2 ? 0 : 20 }}
                transition={{ duration: 0.8 }}
            >
                <h3 className="text-sm text-slate-400 uppercase tracking-widest mb-4 font-semibold">
                    Cyclical Time Features
                </h3>
                <p className="text-sm text-slate-400 mb-6">
                    How do we tell the AI that 11:59 PM is right next to 12:01 AM? We convert the clock into a wave (Sine/Cosine).
                </p>

                <div className="flex items-center justify-between px-8 relative">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-xl border border-slate-700">
                            <Clock className="text-primary" />
                            <span className="font-mono text-white">Hour of Day</span>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-xl border border-slate-700">
                            <CalendarDays className="text-secondary" />
                            <span className="font-mono text-white">Day of Week</span>
                        </div>
                    </div>

                    <motion.div
                        className="w-16 h-1 bg-slate-700"
                        animate={{ scaleX: step >= 2 ? 1 : 0 }}
                        style={{ transformOrigin: "left" }}
                    />

                    <motion.div
                        className="flex flex-col items-center justify-center p-6 bg-slate-800/80 rounded-full border-2 border-primary border-dashed relative overflow-hidden"
                        animate={{ rotate: step >= 2 ? 360 : 0 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <Waves size={48} className="text-accent" />
                        <div className="absolute inset-0 border-4 border-transparent border-t-secondary rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
                    </motion.div>
                </div>
            </motion.div>

        </div>
    );
};

export default DataPrepVisual;
