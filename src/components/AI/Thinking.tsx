export default function Thinking() {
  return (
    <div className="flex items-center gap-2 mt-4 animate-pulse">
      <span className="opacity-60">BXP-AI is thinking/validating…</span>
      <span
        className="w-2 h-2 bg-primary rounded-full animate-bounce"
        style={{ animationDelay: "0.1s" }}
      ></span>
      <span
        className="w-2 h-2 bg-primary rounded-full animate-bounce"
        style={{ animationDelay: "0.3s" }}
      ></span>
      <span
        className="w-2 h-2 bg-primary rounded-full animate-bounce"
        style={{ animationDelay: "0.5s" }}
      ></span>
    </div>
  );
} 