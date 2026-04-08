'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Play, Pause, RefreshCw, Code2 } from 'lucide-react';

export default function TerminalSimulation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    '> Initializing OpenClaw Swarm Architecture...',
    '> Connecting to local LLM context window...',
  ]);
  const [userInput, setUserInput] = useState('');

  // Dummy simulation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setLogs(prev => [
          ...prev, 
          `> [Agent: NanoClaw] Scanned 14 files... found 3 bugs in auth.ts`,
          `> [Agent: NanoClaw] Injecting fix... applying git diff...`,
        ]);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleInject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    setLogs(prev => [...prev, `> [User Override]: ${userInput}`, `> [System] Pausing default script. Re-routing agent based on User Override...`]);
    setUserInput('');
    setIsPlaying(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-gray-800 bg-[#0A0A0A] shadow-2xl">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-[#111]">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-mono text-gray-400">Live Agent Simulation (Scrimba-Style Interactive Mode)</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded-md hover:bg-emerald-500/20 transition-colors"
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {isPlaying ? 'Pause Agent' : 'Resume Agent'}
          </button>
          <button 
            onClick={() => setLogs(['> Initializing OpenClaw Swarm Architecture...'])}
            className="text-gray-500 hover:text-gray-300 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 h-[300px] overflow-y-auto font-mono text-sm">
        {logs.map((log, i) => (
          <div key={i} className={`mb-1 ${log.includes('[User Override]') ? 'text-amber-400' : 'text-emerald-500/90'}`}>
            {log}
          </div>
        ))}
        {isPlaying && (
          <div className="flex items-center gap-2 text-emerald-500 animate-pulse mt-2">
            <span className="h-2 w-2 bg-emerald-500 rounded-full"></span>
            <span className="text-xs opacity-70">Agent is thinking...</span>
          </div>
        )}
      </div>

      {/* Interactive Override Input */}
      <div className="border-t border-gray-800 bg-[#111] p-3">
        <form onSubmit={handleInject} className="relative flex items-center">
          <Code2 className="absolute left-3 h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Pause the simulation and type your own prompt to hijack the agent..."
            className="w-full bg-black/50 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono"
          />
        </form>
      </div>
    </div>
  );
}
