export default function ConfidenceBar({ confidence }: { confidence: number }) {
  let percent = Math.round(confidence);
  if (isNaN(percent) || percent < 0) percent = 0;
  if (percent > 100) percent = 100;
  // If no context, show low confidence
  if (percent === 100 && (!confidence || confidence < 30)) percent = 20;
  return (
    <div className="w-full bg-gray-200 rounded h-2 mt-1 mb-2">
      <div className="bg-green-500 h-2 rounded" style={{ width: `${percent}%` }} />
    </div>
  );
} 