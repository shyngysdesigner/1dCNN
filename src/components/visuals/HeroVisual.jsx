import { motion } from 'framer-motion';
import { Activity, Zap, BarChart } from 'lucide-react';

const HeroVisual = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center p-8 max-w-lg text-center"
        >
            <div className="relative mb-8 text-primary">
                <Activity size={80} strokeWidth={1} className="animate-pulse" />
                <motion.div
                    className="absolute inset-0 text-secondary"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
                >
                    <Zap size={80} strokeWidth={1} />
                </motion.div>
            </div>

            <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-tr from-white to-slate-400 bg-clip-text text-transparent">
                Predicting the Future of Traffic
            </h2>

            <p className="text-lg text-slate-400 leading-relaxed mb-6">
                Imagine knowing when a traffic jam will happen before it even starts. By combining a
                <span className="font-bold text-primary px-1">Convolutional Neural Network (CNN)</span> and a
                <span className="font-bold text-secondary px-1">Gated Recurrent Unit (GRU)</span>, we can look at past traffic data to predict future bottlenecks.
            </p>

            <motion.div
                className="flex gap-4 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <div className="flex flex-col items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                    <span className="text-3xl font-black text-primary">CNN</span>
                    <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">Spatial Bottlenecks</span>
                </div>
                <div className="flex flex-col items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                    <span className="text-xl font-black text-slate-500 my-auto">+</span>
                </div>
                <div className="flex flex-col items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                    <span className="text-3xl font-black text-secondary">GRU</span>
                    <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">Temporal Memory</span>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default HeroVisual;
