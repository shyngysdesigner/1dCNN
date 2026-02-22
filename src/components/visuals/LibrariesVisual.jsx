import { motion } from 'framer-motion';
import { Package, Cpu, BarChart } from 'lucide-react';

const LibrariesVisual = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 w-full max-w-2xl h-full relative">
            <h2 className="text-3xl font-bold mb-4 text-white">1. Loading the Tools</h2>
            <p className="text-slate-400 mb-12 text-center text-sm">
                Just like a mechanic needs a toolbox, our AI needs specific libraries to work. This section imports all the necessary tools.
            </p>

            <div className="grid grid-cols-2 gap-6 w-full">
                {/* PyTorch Card */}
                <motion.div
                    className="bg-slate-900 border border-slate-700 p-6 rounded-xl flex flex-col items-center gap-4 hover:border-orange-500/50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="p-4 bg-orange-500/20 text-orange-500 rounded-full">
                        <Cpu size={32} />
                    </div>
                    <h3 className="font-bold text-white text-lg">PyTorch</h3>
                    <p className="text-xs text-slate-400 text-center">
                        The core engine. It handles all the complex math needed to train the Neural Network.
                    </p>
                </motion.div>

                {/* Pandas/Numpy Card */}
                <motion.div
                    className="bg-slate-900 border border-slate-700 p-6 rounded-xl flex flex-col items-center gap-4 hover:border-blue-500/50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="p-4 bg-blue-500/20 text-blue-500 rounded-full">
                        <BarChart size={32} />
                    </div>
                    <h3 className="font-bold text-white text-lg">Pandas & NumPy</h3>
                    <p className="text-xs text-slate-400 text-center">
                        The data wranglers. They help us read, clean, and organize the traffic CSV file into a format the AI understands.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default LibrariesVisual;
