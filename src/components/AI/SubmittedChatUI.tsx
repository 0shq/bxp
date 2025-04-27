import React from "react";
import { Card, Button, Textarea, Tooltip } from "@heroui/react";
import { Info, UploadSimple } from "@phosphor-icons/react";
import ResultCard from "./ResultCard";
import { FilePreview } from "../FilePreview";

interface SubmittedChatUIProps {
  aiResult: any;
  submitted: any;
  loading: boolean;
  reevalMode: boolean;
  reevalAIResult: any;
  reevalUserContext: any;
  autofillSuggestion: string | null;
  expandedCard: any;
  setExpandedCard: (v: any) => void;
  reevalText: string;
  setReevalText: (v: string) => void;
  reevalFiles: File[];
  reevalFileInputRef: React.RefObject<HTMLInputElement>;
  handleReevalFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleReevaluate: (e: React.FormEvent) => Promise<void>;
  reevalLoading: boolean;
  reevalError: string | null;
  description: string;
  setDescription: (v: string) => void;
  ThinkingComponent: React.ComponentType;
  setReevalMode: (v: boolean | ((v: boolean) => boolean)) => void;
}

export default function SubmittedChatUI({
  aiResult,
  submitted,
  loading,
  reevalMode,
  reevalAIResult,
  reevalUserContext,
  autofillSuggestion,
  expandedCard,
  setExpandedCard,
  reevalText,
  setReevalText,
  reevalFiles,
  reevalFileInputRef,
  handleReevalFileUpload,
  handleReevaluate,
  reevalLoading,
  reevalError,
  description,
  setDescription,
  ThinkingComponent,
  setReevalMode,
}: SubmittedChatUIProps) {
  return (
    <Card className="max-w-2xl mx-auto h-[90vh] max-h-[90vh] flex flex-col overflow-hidden">
      <div className="p-4 border-b border-divider flex items-center justify-between">
        <h1 className="text-xl font-bold mb-1">BXP-AI</h1>
        <Tooltip content="BXP-AI is powered by AI. Answers may be incorrect or incomplete. Always use your own judgment.">
          <span className="ml-1 cursor-pointer text-foreground-500">
            <Info size={20} weight="bold" />
          </span>
        </Tooltip>
      </div>
      {/* Make only the chat area scrollable, not the whole card */}
      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-2xl flex flex-col gap-6 px-4 py-8">
          {/* User submission bubble (left) */}
          <div className="flex w-full justify-end">
            <Card className="rounded-2xl bg-default-100 p-4 max-w-[70%] text-left shadow-md">
              <div className="font-bold mb-1">You</div>
              <div className="mb-1">
                <b>Title:</b> {submitted.title}
              </div>
              <div className="mb-1">
                <b>Description:</b> {submitted.description}
              </div>
              <div className="mb-1">
                <b>Category:</b> {submitted.category}
              </div>
              <div className="mb-1">
                <b>Skill:</b> {submitted.skill}
              </div>
              {submitted.webLink && (
                <div className="mb-1">
                  <b>Web Link:</b> <a href={submitted.webLink} target="_blank" rel="noopener noreferrer" className="text-primary underline break-all">{submitted.webLink}</a>
                </div>
              )}
              {submitted.files && submitted.files.length > 0 && (
                <div className="flex flex-row flex-wrap gap-1 mt-2 max-w-full">
                  {submitted.files.map((file: File, idx: number) => (
                    <div
                      key={idx}
                      className="w-8 h-8 overflow-hidden rounded bg-default-200 flex items-center justify-center"
                    >
                      <div className="w-full h-full">
                        <FilePreview file={file} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
          {/* AI answer bubble (right) */}
          <div className="flex w-full justify-start">
            <div className="w-full">
              {loading && <ThinkingComponent />}
              {aiResult && !loading && (
                <ResultCard
                  skill={aiResult.skill}
                  effort={aiResult.effort}
                  confidence={aiResult.confidence}
                  summary={aiResult.summary}
                  feedback={aiResult.feedback}
                  showExpand={!!aiResult.feedback}
                  expanded={expandedCard === 'main'}
                  onExpand={(key) => setExpandedCard(expandedCard === key ? null : key)}
                  cardKey="main"
                />
              )}
              {/* Tips and checklist */}
              {aiResult && !loading && autofillSuggestion && (
                <div className="mt-2 text-xs text-foreground-500">
                  <div className="mb-1">Checklist: {autofillSuggestion}</div>
                </div>
              )}
              {autofillSuggestion && !loading && (
                <Button size="sm" variant="bordered" className="mt-2" onPress={() => {
                  if (reevalMode) setReevalText(reevalText + '\n' + autofillSuggestion);
                  else setDescription(description + '\n' + autofillSuggestion);
                }}>
                  Autofill Checklist in Description
                </Button>
              )}
            </div>
          </div>
          {/* Re-evaluation form, if active */}
          {reevalMode && !reevalAIResult && !reevalLoading && (
            <form onSubmit={handleReevaluate} className="mt-4 flex flex-col gap-3">
              <Textarea
                label="Add More Context or Clarification"
                placeholder="Explain, clarify, or add new details for the AI to consider."
                value={reevalText}
                onChange={e => setReevalText(e.target.value)}
                minRows={2}
              />
              <div>
                <input
                  type="file"
                  ref={reevalFileInputRef}
                  onChange={handleReevalFileUpload}
                  className="hidden"
                  multiple
                  accept="image/*,video/*,application/pdf,.doc,.docx,.txt"
                />
                <Button
                  type="button"
                  variant="light"
                  startContent={<UploadSimple size={20} />}
                  onPress={() => reevalFileInputRef.current?.click()}
                  className="mb-2"
                  isDisabled={reevalLoading}
                >
                  Upload More Files
                </Button>
                {reevalFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {reevalFiles.map((file: File, idx: number) => (
                      <div key={idx} className="w-8 h-8 overflow-hidden rounded bg-default-200 flex items-center justify-center">
                        <div className="w-full h-full">
                          <FilePreview file={file} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button
                type="submit"
                color="secondary"
                size="sm"
                className="rounded-full w-full max-w-2xl text-lg font-semibold"
                isLoading={reevalLoading}
                disabled={reevalLoading}
              >
                Submit for Re-evaluation
              </Button>
              {reevalError && <div className="text-red-600 text-center mt-2">{reevalError}</div>}
            </form>
          )}
          {reevalMode && reevalLoading && <ThinkingComponent />}
          {/* Show re-evaluated user context and AI answer below the original chat if available */}
          {reevalUserContext && reevalAIResult && (
            <>
              {/* User re-eval bubble */}
              <div className="flex w-full justify-end">
                <Card className="rounded-2xl bg-default-100 p-4 max-w-[70%] text-left shadow-md">
                  <div className="font-bold mb-1">You (Re-evaluation)</div>
                  <div className="mb-1"><b>Additional Context:</b> {reevalUserContext.text}</div>
                  {reevalUserContext.files && reevalUserContext.files.length > 0 && (
                    <div className="flex flex-row flex-wrap gap-1 mt-2 max-w-full">
                      {reevalUserContext.files.map((file: File, idx: number) => (
                        <div key={idx} className="w-8 h-8 overflow-hidden rounded bg-default-200 flex items-center justify-center">
                          <div className="w-full h-full">
                            <FilePreview file={file} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
              {/* AI re-eval bubble */}
              <div className="flex w-full justify-start">
                <div className="w-full">
                  <ResultCard
                    skill={reevalAIResult.skill}
                    effort={reevalAIResult.effort}
                    confidence={reevalAIResult.confidence}
                    summary={reevalAIResult.summary}
                    feedback={reevalAIResult.feedback}
                    showExpand={!!reevalAIResult.feedback}
                    expanded={expandedCard === 'reeval'}
                    onExpand={(key) => setExpandedCard(expandedCard === key ? null : key)}
                    cardKey="reeval"
                  />
                  <div className="mt-2 text-xs text-foreground-500">
                    {autofillSuggestion && (
                      <div className="mb-1">Checklist: {autofillSuggestion}</div>
                    )}
                  </div>
                  {autofillSuggestion && (
                    <Button size="sm" variant="bordered" className="mt-2" onPress={() => setReevalText(reevalText + '\n' + autofillSuggestion)}>
                      Autofill Checklist in Description
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Print and Re-evaluate buttons always at the bottom */}
      <div className="w-full flex flex-col gap-2 p-4 border-t border-divider bg-background">
        <div className="flex gap-2">
          <Button
            color="primary"
            size="sm"
            className="rounded-full w-full max-w-2xl text-lg font-semibold"
            variant="light"
            onPress={() => {}}
          >
            PRINT YOUR PROOF
          </Button>
          {!reevalAIResult && (
            <Button
              color="secondary"
              size="sm"
              className="rounded-full w-full max-w-2xl text-lg font-semibold"
              variant="light"
              onPress={() => setReevalMode((v: boolean) => !v)}
              disabled={reevalLoading}
            >
              {reevalMode ? 'Cancel' : 'Re-evaluate'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
} 