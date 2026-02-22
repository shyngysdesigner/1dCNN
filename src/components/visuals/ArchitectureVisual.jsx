import { motion } from 'framer-motion';
import { Search, Database, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const ArchitectureVisual = () => {
    const [activeNode, setActiveNode] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveNode(prev => (prev + 1) % 4);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-8 w-full max-w-2xl relative">
            <h2 className="text-3xl font-bold mb-4 text-white">The Brain of the AI</h2>
            <p className="text-slate-400 mb-12 text-center text-sm">
                Data flows through two distinct "brain regions": a CNN identifying immediate local spatial bottlenecks
                and a GRU remembering long-term temporal trends.
            </p>

            {/* Network Flowchart */}
            <div className="flex flex-col gap-8 w-full items-center">

                {/* Input Node */}
                <motion.div
                    className="flex flex-col items-center bg-slate-800 border-2 rounded-xl p-4 w-48 shadow-lg z-10"
                    animate={{ borderColor: activeNode === 0 ? '#10b981' : '#334155', scale: activeNode === 0 ? 1.05 : 1 }}
                >
                    <span className="font-mono text-xs text-slate-400 mb-1">Input Data</span>
                    <span className="font-bold text-white tracking-widest">[12 hours, N Sensors]</span>
                </motion.div>

                <ArrowRight
                    className="text-slate-600 rotate-90"
                    strokeWidth={activeNode === 1 ? 3 : 2}
                    color={activeNode === 1 ? '#38bdf8' : '#475569'}
                />

                {/* CNN Node */}
                <motion.div
                    className="flex items-center gap-4 bg-slate-900 border-2 border-primary rounded-xl p-6 w-full max-w-md shadow-[0_0_20px_rgba(56,189,248,0.2)] relative z-10"
                    animate={{ x: activeNode === 1 ? [0, -5, 5, -5, 0] : 0, scale: activeNode === 1 ? 1.05 : 1 }}
                >
                    <div className="bg-primary/20 p-3 rounded-full text-primary relative">
                        <Search size={32} />
                        {activeNode === 1 && (
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-primary"
                                initial={{ scale: 1, opacity: 1 }}
                                animate={{ scale: 2, opacity: 0 }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-1">CNN Layer</h3>
                        <p className="text-xs text-slate-400">Acts like a magnifying glass. Scans local sensors to find immediate traffic bottlenecks.</p>
                    </div>
                </motion.div>

                <ArrowRight
                    className="text-slate-600 rotate-90"
                    strokeWidth={activeNode === 2 ? 3 : 2}
                    color={activeNode === 2 ? '#f97316' : '#475569'}
                />

                {/* GRU Node */}
                <motion.div
                    className="flex items-center gap-4 bg-slate-900 border-2 border-secondary rounded-xl p-6 w-full max-w-md shadow-[0_0_20px_rgba(249,115,22,0.2)] relative z-10"
                    animate={{ scale: activeNode === 2 ? 1.05 : 1 }}
                >
                    <div className="bg-secondary/20 p-3 rounded-full text-secondary">
                        <Database size={32} />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-1">GRU Layers</h3>
                        <p className="text-xs text-slate-400">Acts like a memory bank. Takes the CNN's findings and passes them forward through time to remember rush hour trends.</p>
                    </div>
                    {/* Animated Memory Loop */}
                    {activeNode === 2 && (
                        <motion.div
                            className="absolute -right-4 top-1/2 w-8 h-8 rounded-full border border-secondary border-dashed"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                    )}
                </motion.div>

                <ArrowRight
                    className="text-slate-600 rotate-90"
                    strokeWidth={activeNode === 3 ? 3 : 2}
                    color={activeNode === 3 ? '#a855f7' : '#475569'}
                />

                {/* Output prediction */}
                <motion.div
                    className="flex flex-col items-center bg-slate-800 border-2 rounded-xl p-4 w-48 shadow-lg z-10"
                    animate={{ borderColor: activeNode === 3 ? '#a855f7' : '#334155', scale: activeNode === 3 ? 1.05 : 1 }}
                >
                    <span className="font-mono text-xs text-slate-400 mb-1">Dense Head</span>
                    <span className="font-bold text-purple-400 tracking-widest text-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">Traffic Prediction [Hour 13]</span>
                </motion.div>

            </div>
        </div>
    );
};

export default ArchitectureVisual;
