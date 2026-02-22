import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Bot, FastForward } from 'lucide-react';

const generateEpochData = (maxEpoch) => {
    const data = [];
    let train = 0.8;
    let val = 0.85;
    for (let i = 1; i <= maxEpoch; i++) {
        train = train * 0.85 + (Math.random() * 0.05);
        val = val * 0.88 + (Math.random() * 0.08);

        // Overfitting starts around epoch 20
        if (i > 18) val = val + 0.02 * (i - 18);

        data.push({ epoch: i, trainLoss: train, valLoss: val });
    }
    return data;
};

const fullData = generateEpochData(30);

const TrainingVisual = () => {
    const [currentEpoch, setCurrentEpoch] = useState(1);
    const [isEarlyStopping, setIsEarlyStopping] = useState(false);

    useEffect(() => {
        let epoch = 1;
        const interval = setInterval(() => {
            epoch++;
            if (epoch > 24) {
                setIsEarlyStopping(true);
                clearInterval(interval);
            } else {
                setCurrentEpoch(epoch);
            }
        }, 250); // fast epochs
        return () => clearInterval(interval);
    }, []);

    const visibleData = fullData.slice(0, currentEpoch);

    return (
        <div className="flex flex-col items-center justify-center p-8 w-full max-w-2xl h-full relative">
            <div className="flex w-full justify-between items-end mb-4">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">The Training Loop</h2>
                    <p className="text-sm text-slate-400 max-w-sm">
                        The AI learns by repeatedly making predictions, analyzing the "Loss" (error), and turning its internal dials to improve.
                    </p>
                </div>

                {/* AI Bot Character */}
                <div className="flex flex-col items-center justify-center bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-lg relative">
                    <motion.div animate={{ rotate: [0, -5, 5, 0], y: isEarlyStopping ? 0 : [0, -5, 0] }} transition={{ repeat: isEarlyStopping ? 0 : Infinity, duration: 0.5 }}>
                        <Bot size={48} className={isEarlyStopping ? "text-emerald-500" : "text-primary"} />
                    </motion.div>
                    <span className="text-xs font-mono font-bold mt-2 text-white">
                        {isEarlyStopping ? "TRAINING DONE" : `EPOCH ${currentEpoch}/30`}
                    </span>
                    {!isEarlyStopping && (
                        <motion.div className="absolute top-0 right-0 -m-1 bg-yellow-400 text-black text-[10px] rounded px-1 font-bold shadow animate-pulse">
                            LEARNING...
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="w-full h-80 bg-[#1e1e1e] rounded-xl border border-slate-800 p-4 relative shadow-2xl">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={visibleData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="epoch" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" domain={[0, 1]} tickFormatter={(val) => val.toFixed(1)} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                        <Line type="monotone" dataKey="trainLoss" stroke="#3b82f6" strokeWidth={3} dot={false} isAnimationActive={false} name="Train Loss" />
                        <Line type="monotone" dataKey="valLoss" stroke="#f97316" strokeWidth={3} dot={false} isAnimationActive={false} name="Val Loss" />

                        {isEarlyStopping && (
                            <ReferenceLine x={24} stroke="#10b981" strokeDasharray="5 5" strokeWidth={2}>
                            </ReferenceLine>
                        )}
                    </LineChart>
                </ResponsiveContainer>

                {/* Early Stopping Overlay */}
                {isEarlyStopping && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <div className="bg-emerald-900/90 border-2 border-emerald-500 p-6 rounded-2xl shadow-2xl backdrop-blur flex flex-col items-center">
                            <FastForward className="text-emerald-400 mb-2" size={32} />
                            <h3 className="text-xl font-bold text-white mb-1">Early Stopping Triggered</h3>
                            <p className="text-sm text-emerald-100 max-w-xs text-center">
                                Validation loss started to climb (Overfitting!). Safely stopping early to keep the best model.
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Legend Map */}
            <div className="flex gap-4 mt-6">
                <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-primary"></span><span className="text-sm font-mono text-slate-300">Train Loss (Ideal Practice)</span></div>
                <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-secondary"></span><span className="text-sm font-mono text-slate-300">Val Loss (Real World Test)</span></div>
            </div>
        </div>
    );
};

export default TrainingVisual;
