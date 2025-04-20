import { Card } from "@heroui/react";

export default function Dashboard() {
  return (
    <div className="col-span-3">
      <Card className="h-full p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard Analytics</h2>
        <div className="space-y-4">
          <div>Overall Stats</div>
          {/* Add dashboard content here */}
        </div>
      </Card>
    </div>
  );
}
