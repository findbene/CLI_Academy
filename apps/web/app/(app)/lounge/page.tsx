import AgentLounge from "@/components/lounge/AgentLounge";

export const metadata = {
  title: "Agent Lounge | Relax and Learn",
  description: "A cozy digital coffee shop for AI learners. Take a breath, grab a coffee, and explore the future of agents at your own pace.",
};

export default function LoungePage() {
  return (
    <div className="min-h-screen bg-[#0F1117] relative selection:bg-[#00D4FF]/30 selection:text-white">
      {/* Subtle ambient noise pattern and gradient bg */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("/assets/noise.png")', backgroundRepeat: 'repeat' }} 
      />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00D4FF]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FFB300]/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 w-full">
        <AgentLounge />
      </div>
    </div>
  );
}
