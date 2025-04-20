import { Card } from "@heroui/react";

export default function AI() {
  return (
    <div className="col-span-3">
      <Card className="h-full p-4">
        <h2 className="text-xl font-bold mb-4">AI Assistant</h2>
        <div className="space-y-4">
          {/* Add AI chat interface here */}
          <div className="text-sm text-foreground-500">
            Ask me anything about your experience or skills...
          </div>
        </div>
      </Card>
    </div>
  );
}
