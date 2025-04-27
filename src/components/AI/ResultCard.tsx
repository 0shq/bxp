import { Button, Card } from "@heroui/react";
import ReactMarkdown from "react-markdown";
import EffortStars from "./EffortStars";
import ConfidenceBar from "./ConfidenceBar";

export default function ResultCard({ skill, effort, confidence, summary, feedback, showExpand, onExpand, expanded, cardKey }: {
  skill: string;
  effort: string;
  confidence: number;
  summary: string;
  feedback: string;
  showExpand: boolean;
  onExpand: (key: 'main' | 'reeval') => void;
  expanded: boolean;
  cardKey: 'main' | 'reeval';
}) {
  return (
    <Card className="mb-4 p-4 bg-default-100">
      <div className="flex flex-col gap-2">
        <div><b>Skill:</b> {skill || <span className="text-gray-400">(none)</span>}</div>
        <div className="flex items-center gap-2"><b>Effort:</b> <EffortStars effort={effort} /></div>
        <div className="flex items-center gap-2">
          <b>Confidence:</b>  <span>{Math.round(typeof confidence === 'number' ? confidence : 0)}%</span>
        </div>
        <ConfidenceBar confidence={typeof confidence === 'number' ? confidence : 0} />
        <div><b>Summary:</b> {summary || <span className="text-gray-400">(none)</span>}</div>
        {showExpand && (
          <Button className="w-fit mt-2 btn btn-sm btn-bordered" variant="bordered" onPress={() => onExpand(cardKey)}>{expanded ? 'Hide Full Feedback' : 'Expand Full Feedback'}</Button>
        )}
        {expanded && feedback && (
          <div className="mt-3 p-3 rounded bg-default-200 text-sm">
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => <p className="mb-3" {...props} />,
                ul: ({ node, ...props }) => <ul className="mb-3 list-disc ml-5" {...props} />,
                ol: ({ node, ...props }) => <ol className="mb-3 list-decimal ml-5" {...props} />,
                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              }}
            >
              {feedback}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </Card>
  );
} 