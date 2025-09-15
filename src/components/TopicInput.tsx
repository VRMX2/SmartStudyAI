import React, { useState } from 'react';
import { Upload, Type, FileText, Sparkles } from 'lucide-react';

const TopicInput: React.FC = () => {
  const [inputType, setInputType] = useState<'text' | 'file'>('text');
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    
    // Here you would typically redirect to results or show generated content
    alert('Study materials generated! Check other tabs to see your content.');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTopic(file.name);
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Type Selector */}
      <div className="flex space-x-4">
        <button
          onClick={() => setInputType('text')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
            inputType === 'text'
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Type className="h-4 w-4" />
          <span>Enter Topic</span>
        </button>
        
        <button
          onClick={() => setInputType('file')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
            inputType === 'file'
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Upload className="h-4 w-4" />
          <span>Upload File</span>
        </button>
      </div>

      {/* Input Section */}
      {inputType === 'text' ? (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            What would you like to study?
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Photosynthesis, World War II, Calculus derivatives, etc."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload your study material
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              onChange={handleFileUpload}
              accept=".pdf,.txt,.doc,.docx"
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                {topic || 'Click to upload file'}
              </p>
              <p className="text-sm text-gray-500">
                PDF, TXT, DOC, DOCX up to 10MB
              </p>
            </label>
          </div>
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!topic.trim() || isGenerating}
        className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            <span>Generate Study Materials</span>
          </>
        )}
      </button>

      {/* Features Preview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Summaries</p>
        </div>
        <div className="text-center">
          <div className="h-8 w-8 bg-purple-100 rounded mx-auto mb-2 flex items-center justify-center">
            <span className="text-purple-600 font-bold text-sm">Q</span>
          </div>
          <p className="text-sm text-gray-600">Flashcards</p>
        </div>
        <div className="text-center">
          <div className="h-8 w-8 bg-green-100 rounded mx-auto mb-2 flex items-center justify-center">
            <span className="text-green-600 font-bold text-sm">?</span>
          </div>
          <p className="text-sm text-gray-600">Quizzes</p>
        </div>
        <div className="text-center">
          <div className="h-8 w-8 bg-orange-100 rounded mx-auto mb-2 flex items-center justify-center">
            <span className="text-orange-600 font-bold text-sm">AI</span>
          </div>
          <p className="text-sm text-gray-600">Explanations</p>
        </div>
      </div>
    </div>
  );
};

export default TopicInput;
