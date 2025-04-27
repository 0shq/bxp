import React from "react";
import { Card, Button, Textarea, Input, Select, SelectItem, Tooltip } from "@heroui/react";
import { UploadSimple, Info } from "@phosphor-icons/react";
import { FilePreview } from "../FilePreview";
import { CATEGORY_LIST, SKILL_LIST } from "./lists";

interface ProofFormProps {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  category: string | null;
  setCategory: (v: string) => void;
  skill: string | null;
  setSkill: (v: string) => void;
  files: File[];
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: (idx: number) => void;
  loading: boolean;
  error: string | null;
  webLink: string;
  setWebLink: (v: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  previewClass: string;
  MAX_FILES: number;
  MAX_FILE_SIZE_MB: number;
}

export default function ProofForm({
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  skill,
  setSkill,
  files,
  fileInputRef,
  handleFileUpload,
  handleRemoveFile,
  loading,
  error,
  webLink,
  setWebLink,
  handleSubmit,
  previewClass,
  MAX_FILES,
  MAX_FILE_SIZE_MB,
}: ProofFormProps) {
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
      <form
        onSubmit={handleSubmit}
        id="proof-form"
        className="flex-1 flex flex-col gap-6 px-8 py-6 overflow-y-auto"
      >
        <Input
          label="Title"
          placeholder="Project or Experience Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-xl bg-background"
          variant="bordered"
          size="lg"
          isRequired
        />
        <div className="flex flex-col gap-4 rounded-xl bg-background p-4 shadow-sm">
          <div className="flex gap-4">
            <Select
              variant="bordered"
              label="Category"
              placeholder="Select category"
              selectedKeys={category ? new Set([category]) : new Set()}
              onSelectionChange={(keys) =>
                setCategory(Array.from(keys)[0] as string)
              }
              className="flex-1"
              isRequired
            >
              {CATEGORY_LIST.map((cat) => (
                <SelectItem key={cat.value}>{cat.label}</SelectItem>
              ))}
            </Select>
            <Select
              variant="bordered"
              label="Skill"
              placeholder="Select skill"
              selectedKeys={skill ? new Set([skill]) : new Set()}
              onSelectionChange={(keys) =>
                setSkill(Array.from(keys)[0] as string)
              }
              className="flex-1"
              isRequired
            >
              {SKILL_LIST.map((skill) => (
                <SelectItem key={skill.value}>{skill.label}</SelectItem>
              ))}
            </Select>
          </div>
          <Textarea
            variant="bordered"
            label="Description"
            placeholder="Describe your work, impact, and details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minRows={4}
            className="bg-background"
            isRequired
          />
          <Input
            label="Web Link (Deployed Proof)"
            placeholder="https://your-project-demo.com"
            value={webLink}
            onChange={e => setWebLink(e.target.value)}
            className="rounded-xl bg-background"
            variant="bordered"
            size="md"
            type="url"
          />
        </div>
        <div className="rounded-xl bg-background p-4 flex flex-col gap-2">
          <label className="font-semibold mb-2">Upload Files</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            multiple
            accept="image/*,video/*,application/pdf,.doc,.docx,.txt"
          />
          <Button
            color="primary"
            variant="bordered"
            startContent={<UploadSimple size={20} />}
            onPress={() => fileInputRef.current?.click()}
            className="mb-2 w-full"
            isDisabled={loading || files.length >= MAX_FILES}
          >
            Upload Files
          </Button>
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className={`relative flex-shrink-0 ${previewClass}`}
                >
                  <div className="w-full h-full">
                    <FilePreview file={file} />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(idx)}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-default-100 flex items-center justify-center text-foreground-500 hover:text-foreground hover:bg-default-200"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="text-xs text-foreground-500 mt-1">
            {files.length}/{MAX_FILES} files, max {MAX_FILE_SIZE_MB}MB each
          </div>
        </div>
        {error && <div className="text-red-600 text-center mt-2">{error}</div>}
      </form>
      {/* Fixed submit button at the bottom of the card */}
      <div className="w-full flex justify-center p-4 border-t border-divider bg-background">
        <Button
          type="submit"
          color="primary"
          size="sm"
          className="rounded-full w-full max-w-2xl text-lg font-semibold"
          isLoading={loading}
          disabled={loading}
          form="proof-form"
        >
          Submit
        </Button>
      </div>
    </Card>
  );
} 