import { Star } from "@phosphor-icons/react";

export default function EffortStars({ effort }: { effort: string }) {
  let value = 0;
  if (!effort || effort.toLowerCase().includes('none') || effort.toLowerCase().includes('unknown')) value = 0;
  else if (effort.toLowerCase().includes('low')) value = 1;
  else if (effort.toLowerCase().includes('medium')) value = 3;
  else if (effort.toLowerCase().includes('high')) value = 5;
  return (
    <span className="flex items-center gap-1">
      {[1,2,3,4,5].map(i => i <= value ? <Star key={i} size={18} weight="fill" className="text-yellow-400" /> : <Star key={i} size={18} weight="fill" className="text-gray-300 opacity-30" />)}
    </span>
  );
} 