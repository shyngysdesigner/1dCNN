import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const SlidingWindowVisual = () => {
    const [windowIndex, setWindowIndex] = useState(0);
    const totalSteps = 24;
    const seqLength = 12;

    useEffect(() => {
        const interval = setInterval(() => {
            setWindowIndex(prev => {
                if (prev + seqLength >= totalSteps - 1) return 0;
                return prev + 1;
            });
        }, 1200);
        return () => clearInterval(interval);
    }, [totalSteps, seqLength]);

    // Generate some fake traffic speeds
    const data = Array.from({ length: totalSteps }).map((_, i) =>
        Math.round(60 - Math.sin(i / 3) * 20 - Math.random() * 5)
    );

    return (
        <div className="flex flex-col items-center justify-center p-8 w-full max-w-3xl">
            <h2 className="text-3xl font-bold mb-6 text-white text-center">The Sliding Window Concept</h2>
            <p className="text-slate-400 mb-10 text-center max-w-xl">
                The AI learns by practicing. It looks at a "window" of the past {seqLength} hours to predict what will happen in the very next hour. Then, the window slides forward.
            </p>

            <div className="w-full relative py-8 px-4 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">

                {/* Timeline Axis */}
                <div className="flex justify-between absolute bottom-2 left-4 right-4 text-xs text-slate-600 font-mono">
                    <span>t=0</span>
                    <span>Time Timeline →</span>
                    <span>t={totalSteps}</span>
                </div>

                {/* Data Bars */}
                <div className="flex gap-1 items-end h-40 w-full px-2">
                    {data.map((val, idx) => {
                        const isInsideWindow = idx >= windowIndex && idx < windowIndex + seqLength;
                        const isTarget = idx === windowIndex + seqLength;

                        let colorClass = "bg-slate-700"; // Past or future, ignored
                        if (isInsideWindow) colorClass = "bg-primary shadow-[0_0_15px_rgba(59,130,246,0.6)]";
                        if (isTarget) colorClass = "bg-secondary shadow-[0_0_15px_rgba(249,115,22,0.8)]";

                        return (
                            <motion.div
                                key={idx}
                                className={`flex-1 rounded-t-sm relative transition-colors duration-300 ${colorClass}`}
                                style={{ height: `${val}%` }}
                                animate={isTarget ? { y: [0, -5, 0] } : {}}
                                transition={{ duration: 0.5, repeat: isTarget ? Infinity : 0 }}
                            >
                                {(isInsideWindow || isTarget) && (
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white opacity-80">
                                        {val}
                                    </span>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* The Sliding Physical Window box overlay */}
                <motion.div
                    className="absolute top-0 bottom-0 border-2 border-primary bg-primary/10 pointer-events-none rounded-lg"
                    initial={false}
                    animate={{
                        left: `${(windowIndex / totalSteps) * 100}%`,
                        width: `${(seqLength / totalSteps) * 100}%`
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                {/* Target Box Pointer */}
                <motion.div
                    className="absolute top-4 bottom-0 border-2 border-secondary bg-secondary/10 border-dashed pointer-events-none rounded-lg"
                    initial={false}
                    animate={{
                        left: `${((windowIndex + seqLength) / totalSteps) * 100}%`,
                        width: `${(1 / totalSteps) * 100}%`
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-bold py-1 px-2 rounded-full whitespace-nowrap">
                        PREDICT THIS
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default SlidingWindowVisual;
