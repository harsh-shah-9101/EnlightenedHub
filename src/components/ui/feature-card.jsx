import { CardSpotlight } from "./card-spotlight";

export function FeatureCard({ icon, title, description }) {
  return (
    <CardSpotlight className="bg-black p-6 rounded-xl border border-white/5">
      <div className="relative z-30 flex flex-col">
        <div className="bg-[#1D2B58] w-10 h-10 rounded-lg flex items-center justify-center mb-4 relative z-30">
          {icon}
        </div>
        <h4 className="text-white font-medium mb-2 relative z-30">{title}</h4>
        <p className="text-gray-400 text-sm relative z-30">{description}</p>
      </div>
    </CardSpotlight>
  );
}