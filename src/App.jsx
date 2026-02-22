import { useState, useRef, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { pythonCode, STEPS } from './codeString';

// Visual components
import HeroVisual from './components/visuals/HeroVisual';
import LibrariesVisual from './components/visuals/LibrariesVisual';
import ConfigVisual from './components/visuals/ConfigVisual';
import DataPrepVisual from './components/visuals/DataPrepVisual';
import SlidingWindowVisual from './components/visuals/SlidingWindowVisual';
import ArchitectureVisual from './components/visuals/ArchitectureVisual';
import TrainingVisual from './components/visuals/TrainingVisual';

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const codeContainerRef = useRef(null);

  // Helper to figure out if line should be highlighted
  const isLineHighlighted = (lineNumber) => {
    const activeData = STEPS[activeStep];
    return lineNumber >= activeData.lines[0] && lineNumber <= activeData.lines[1];
  };

  const currentStepData = STEPS[activeStep];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative font-sans text-slate-200">

      {/* Left Panel - Code Scrollytelling */}
      <div className="flex-1 w-1/2 h-full flex flex-col border-r border-slate-800">
        <header className="p-4 bg-surface border-b border-slate-800 flex justify-between items-center z-10">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Traffic Predictor AI</h1>
            <p className="text-xs text-slate-400">Interactive Code Walkthrough</p>
          </div>

          <div className="flex gap-2">
            <button
              disabled={activeStep === 0}
              onClick={() => setActiveStep(p => Math.max(0, p - 1))}
              className="px-3 py-1 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-50 text-sm transition-colors"
            >
              Previous
            </button>
            <button
              disabled={activeStep === STEPS.length - 1}
              onClick={() => setActiveStep(p => Math.min(STEPS.length - 1, p + 1))}
              className="px-4 py-1 bg-primary text-white rounded hover:bg-blue-600 disabled:opacity-50 text-sm font-medium transition-colors"
            >
              Next Step
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto relative hidden-scrollbar" ref={codeContainerRef}>
          <div className="p-6 pb-96">
            <div className="mb-4 text-sm text-secondary font-medium uppercase tracking-wider">
              {currentStepData.title}
            </div>

            <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-800/60 bg-[#1e1e1e]">
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                showLineNumbers
                wrapLines
                customStyle={{ margin: 0, padding: '1.5rem', fontSize: '0.85rem', lineHeight: '1.5', background: 'transparent' }}
                lineNumberStyle={{ minWidth: '3em', paddingRight: '1em', color: '#6e7681', textAlign: 'right' }}
                lineProps={lineNumber => {
                  const active = isLineHighlighted(lineNumber);
                  return {
                    style: {
                      display: 'block',
                      backgroundColor: active ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                      borderLeft: active ? '3px solid #38bdf8' : '3px solid transparent',
                      opacity: active ? 1 : 0.4,
                      transition: 'all 0.3s ease'
                    }
                  };
                }}
              >
                {pythonCode}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Dynamic Visualizations */}
      <div className="w-1/2 h-full bg-surface relative overflow-hidden flex flex-col justify-center items-center">
        {/* Dynamic visuals based on step */}
        {activeStep === 0 && <HeroVisual />}
        {activeStep === 1 && <LibrariesVisual />}
        {activeStep === 2 && <ConfigVisual />}
        {activeStep === 3 && <DataPrepVisual />}
        {activeStep === 4 && <SlidingWindowVisual />}
        {activeStep === 5 && <ArchitectureVisual />}
        {activeStep === 6 && <TrainingVisual />}
        {/* Animated background decoration */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10 mix-blend-screen" style={{ animationDelay: '1s', animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
      </div>

    </div>
  );
}

export default App;
