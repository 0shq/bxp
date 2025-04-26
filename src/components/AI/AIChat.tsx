"use client";

import { Card, Textarea, Button, Tooltip } from "@heroui/react";
import { UploadSimple, PaperPlaneRight } from "@phosphor-icons/react";
import { useState, useRef } from "react";
import { FilePreview } from "../FilePreview";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  files?: File[];
  timestamp: Date;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleSend = () => {
    if (input.trim() || files.length > 0) {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: input,
        files: files,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
      setFiles([]);
    }
  };

  return (
      <Card className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-divider">
          <h2 className="text-xl font-bold">BXP-AI</h2>
          <p className="text-sm text-foreground-500">
            Upload your proof of experience
          </p>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === "user"
                    ? "bg-primary text-white"
                    : "bg-default-100"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {message.files && message.files.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {message.files.map((file, index) => (
                      <FilePreview key={index} file={file} />
                    ))}
                  </div>
                )}
                <span className="text-xs opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* File Preview */}
        {files.length > 0 && (
          <div className="px-4 py-2 border-t border-divider">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {files.map((file, index) => (
                <div key={index} className="relative flex-shrink-0">
                  <FilePreview file={file} />
                  <button
                    onClick={() => setFiles(files.filter((_, i) => i !== index))}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-default-100 flex items-center justify-center text-foreground-500 hover:text-foreground hover:bg-default-200"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-divider">
          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              multiple
              accept="image/*,video/*,application/pdf,.doc,.docx,.txt"
            />
            <Tooltip content="Upload your proof" showArrow={true}>
              <Button
                isIconOnly
                variant="light"
                onPress={() => fileInputRef.current?.click()}
                className="min-w-10"
              >
                <UploadSimple size={20} />
              </Button>
            </Tooltip>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Build your XP"
              minRows={1}
              maxRows={4}
              classNames={{
                input: "resize-none",
                inputWrapper: "h-10",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button
              isIconOnly
              color="primary"
              onPress={handleSend}
              className="min-w-10"
            >
              <PaperPlaneRight size={20} />
            </Button>
          </div>
        </div>
      </Card>
  );
}
