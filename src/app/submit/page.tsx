'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export default function SubmitPage() {
  const { publicKey } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData(event.currentTarget);
      const data = {
        skill: formData.get('skill'),
        description: formData.get('description'),
        files: files ? Array.from(files) : [],
        walletAddress: publicKey.toString(),
      };

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit proof');
      }

      const result = await response.json();
      alert('Proof submitted successfully!');
      
      // Reset form
      (event.target as HTMLFormElement).reset();
      setFiles(null);
    } catch (error) {
      console.error('Error submitting proof:', error);
      alert('Failed to submit proof. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  if (!publicKey) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Please connect your wallet to submit a proof of experience
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Submit Proof of Experience</h1>
      
      <div className="max-w-2xl mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="skill" className="block text-sm font-medium mb-2">
              Skill Area
            </label>
            <select
              id="skill"
              name="skill"
              required
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <option value="">Select a skill area</option>
              <option value="react">React</option>
              <option value="solana">Solana</option>
              <option value="rust">Rust</option>
              <option value="design">Design</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description of Work
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              placeholder="Describe your work and experience..."
            />
          </div>

          <div>
            <label htmlFor="files" className="block text-sm font-medium mb-2">
              Upload Artifacts
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6 text-center">
              <input
                type="file"
                id="files"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="files"
                className="cursor-pointer text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Click to upload
              </label>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                or drag and drop files here
              </p>
              {files && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {files.length} file(s) selected
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit for Validation'}
          </button>
        </form>
      </div>
    </div>
  )
} 