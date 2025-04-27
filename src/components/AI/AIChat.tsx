"use client";

import { useState, useRef } from "react";
import Thinking from "./Thinking";
import SubmittedChatUI from "./SubmittedChatUI";
import ProofForm from "./ProofForm";

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 5;

export default function AIChat({ address }: { address: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [skill, setSkill] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiResult, setAIResult] = useState<any>(null);
  const [submitted, setSubmitted] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wallet = address;
  const [webLink, setWebLink] = useState("");
  const [reevalMode, setReevalMode] = useState(false);
  const [reevalText, setReevalText] = useState("");
  const [reevalFiles, setReevalFiles] = useState<File[]>([]);
  const reevalFileInputRef = useRef<HTMLInputElement>(null);
  const [reevalLoading, setReevalLoading] = useState(false);
  const [reevalError, setReevalError] = useState<string | null>(null);
  const [reevalAIResult, setReevalAIResult] = useState<any>(null);
  const [reevalUserContext, setReevalUserContext] = useState<{text: string, files: File[]} | null>(null);
  const [autofillSuggestion, setAutofillSuggestion] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<'main' | 'reeval' | null>(null);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      // Enforce max file count
      if (files.length + newFiles.length > MAX_FILES) {
        setError(`Max ${MAX_FILES} files allowed.`);
        return;
      }
      // Enforce max file size
      for (const file of newFiles) {
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          setError(`File ${file.name} exceeds ${MAX_FILE_SIZE_MB}MB.`);
          return;
        }
      }
      setFiles((prev) => [...prev, ...newFiles]);
      setError(null);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAIResult(null);
    setSubmitted(null);
    setLoading(true);
    try {
      const fileMetas = files.map((f) => ({
        name: f.name,
        type: f.type,
        size: f.size,
      }));
      const submission = {
        title,
        description,
        category,
        skill,
        files,
        webLink,
      };
      setSubmitted(submission);
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: `${title}\n${description}\nCategory: ${category}\nSkill: ${skill}`,
          files: fileMetas,
          wallet,
          webLink,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "AI validation failed");
      // Post-process feedback to ensure confidence value matches
      let feedback = data.data.feedback;
      if (typeof data.data.confidence === 'number') {
        feedback = feedback.replace(/(Confidence:?\s*)([0-9]+(\.[0-9]+)?)(%?)/i, `$1${data.data.confidence}%`);
      }
      const aiResultWithPatchedFeedback = { ...data.data, feedback };
      setAIResult(aiResultWithPatchedFeedback);
      setAutofillSuggestion(extractChecklist(feedback));
      setExpandedCard(null);
    } catch (err: any) {
      setError(err.message || "AI validation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleReevalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setReevalFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleReevaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    setReevalLoading(true);
    setReevalError(null);
    setReevalAIResult(null);
    try {
      const combinedDescription = `${submitted.title}\n${submitted.description}\nCategory: ${submitted.category}\nSkill: ${submitted.skill}\nWeb Link: ${submitted.webLink || ''}\n\n---\nAdditional context: ${reevalText}`;
      const allFiles = [
        ...(submitted.files || []),
        ...reevalFiles,
      ];
      const fileMetas = allFiles.map((f: any) => ({ name: f.name, type: f.type, size: f.size }));
      setReevalUserContext({ text: reevalText, files: reevalFiles });
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: combinedDescription,
          files: fileMetas,
          wallet,
          webLink: submitted.webLink,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "AI validation failed");
      // Post-process feedback to ensure confidence value matches
      let feedback = data.data.feedback;
      if (typeof data.data.confidence === 'number') {
        feedback = feedback.replace(/(Confidence:?\s*)([0-9]+(\.[0-9]+)?)(%?)/i, `$1${data.data.confidence}%`);
      }
      const aiResultWithPatchedFeedback = { ...data.data, feedback };
      setReevalAIResult(aiResultWithPatchedFeedback);
      setAutofillSuggestion(extractChecklist(feedback));
      setExpandedCard(null);
    } catch (err: any) {
      setReevalError(err.message || "AI validation failed");
    } finally {
      setReevalLoading(false);
    }
  };

  // Shrink file previews if more than 2 files
  const previewClass = files.length > 2 ? "w-20 h-20" : "w-32 h-32";

  // Improved checklist extraction
  function extractChecklist(feedback: string): string | null {
    if (!feedback) return null;
    // Look for a checklist or suggestions section
    const checklistMatch = feedback.match(/Checklist:([\s\S]*?)(\n\n|$)/i);
    if (checklistMatch) return checklistMatch[1].trim();
    const suggestionsMatch = feedback.match(/Suggestions:([\s\S]*?)(\n\n|$)/i);
    if (suggestionsMatch) return suggestionsMatch[1].trim();
    const toImproveMatch = feedback.match(/To improve:([\s\S]*?)(\n\n|$)/i);
    if (toImproveMatch) return toImproveMatch[1].trim();
    // Look for bullet points or numbered lists after these headers
    const bulletMatch = feedback.match(/(Checklist|Suggestions|To improve):[\s\S]*?([\*-] .+|\d+\. .+)/);
    if (bulletMatch) return bulletMatch[0].replace(/^(Checklist|Suggestions|To improve):/i, '').trim();
    return null;
  }

  // Show chat UI after submit
  if (submitted && (aiResult || loading)) {
    return (
      <SubmittedChatUI
        aiResult={aiResult}
        submitted={submitted}
        loading={loading}
        reevalMode={reevalMode}
        reevalAIResult={reevalAIResult}
        reevalUserContext={reevalUserContext}
        autofillSuggestion={autofillSuggestion}
        expandedCard={expandedCard}
        setExpandedCard={setExpandedCard}
        reevalText={reevalText}
        setReevalText={setReevalText}
        reevalFiles={reevalFiles}
        reevalFileInputRef={reevalFileInputRef as React.RefObject<HTMLInputElement>}
        handleReevalFileUpload={handleReevalFileUpload}
        handleReevaluate={handleReevaluate}
        reevalLoading={reevalLoading}
        reevalError={reevalError}
        description={description}
        setDescription={setDescription}
        ThinkingComponent={Thinking}
        setReevalMode={setReevalMode}
      />
    );
  }

  // Default: show the form
  return (
    <ProofForm
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      category={category}
      setCategory={setCategory}
      skill={skill}
      setSkill={setSkill}
      files={files}
      fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
      handleFileUpload={handleFileUpload}
      handleRemoveFile={handleRemoveFile}
      loading={loading}
      error={error}
      webLink={webLink}
      setWebLink={setWebLink}
      handleSubmit={handleSubmit}
      previewClass={previewClass}
      MAX_FILES={MAX_FILES}
      MAX_FILE_SIZE_MB={MAX_FILE_SIZE_MB}
    />
  );
}
