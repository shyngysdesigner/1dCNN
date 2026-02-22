import { motion } from 'framer-motion';
import { Settings, Zap } from 'lucide-react';

const ConfigVisual = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 w-full max-w-2xl h-full relative">
            <h2 className="text-3xl font-bold mb-4 text-white">2. Setting the Rules</h2>
            <p className="text-slate-400 mb-8 text-center text-sm">
                Before training begins, we define the "hyperparameters"—the global rules that control how the AI learns.
            </p>

            <div className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">

                <motion.div
                    className="flex items-center justify-between p-4 bg-slate-800 rounded-xl"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                >
                    <div className="flex items-center gap-3">
                        <Settings className="text-slate-400" size={20} />
                        <span className="font-mono text-white font-bold text-sm">seq_length = 12</span>
                    </div>
                    <p className="text-xs text-slate-400 max-w-[200px] text-right">Look at 12 hours of past traffic to predict the future.</p>
                </motion.div>

                <motion.div
                    className="flex items-center justify-between p-4 bg-slate-800 rounded-xl"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center gap-3">
                        <Settings className="text-slate-400" size={20} />
                        <span className="font-mono text-white font-bold text-sm">batch_size = 64</span>
                    </div>
                    <p className="text-xs text-slate-400 max-w-[200px] text-right">Practice on 64 sequences at a time to learn faster.</p>
                </motion.div>

                <motion.div
                    className="flex items-center justify-between p-4 bg-slate-800 rounded-xl"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                >
                    <div className="flex items-center gap-3">
                        <Settings className="text-slate-400" size={20} />
                        <span className="font-mono text-white font-bold text-sm">epochs = 30</span>
                    </div>
                    <p className="text-xs text-slate-400 max-w-[200px] text-right">Read through the entire dataset 30 times to master it.</p>
                </motion.div>

                <motion.div
                    className="flex items-center justify-between p-4 bg-emerald-900/40 border border-emerald-500/30 rounded-xl"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
                >
                    <div className="flex items-center gap-3">
                        <Zap className="text-emerald-400" size={20} />
                        <span className="font-mono text-emerald-100 font-bold text-sm">device = "cuda"</span>
                    </div>
                    <p className="text-xs text-emerald-200/70 max-w-[200px] text-right">Supercharges math calculations using the Graphics Card (GPU).</p>
                </motion.div>

            </div>
        </div>
    );
};

export default ConfigVisual;
