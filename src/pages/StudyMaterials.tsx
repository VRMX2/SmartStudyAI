import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Share, BookOpen, Lightbulb } from 'lucide-react';
import { faker } from '@faker-js/faker';

const StudyMaterials: React.FC = () => {
  const [selectedTopic] = useState('Photosynthesis');
  
  // Generate mock summary content
  const summary = {
    title: selectedTopic,
    content: `
      Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll. This complex process converts carbon dioxide and water into glucose and oxygen using solar energy.

      Key Components:
      • Chloroplasts: The organelles where photosynthesis occurs
      • Chlorophyll: The green pigment that captures light energy
      • Carbon dioxide: Absorbed from the atmosphere through stomata
      • Water: Absorbed by roots from the soil

      The Process:
      1. Light Reaction (Photo-dependent): Occurs in the thylakoids of chloroplasts
      2. Dark Reaction (Light-independent): Takes place in the stroma of chloroplasts

      Chemical Equation:
      6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂

      Importance:
      - Produces oxygen essential for life
      - Converts solar energy into chemical energy
      - Forms the basis of most food chains
      - Helps regulate atmospheric CO₂ levels
    `,
    keyPoints: [
      'Photosynthesis occurs in chloroplasts',
      'Requires sunlight, water, and carbon dioxide',
      'Produces glucose and oxygen',
      'Essential for life on Earth'
    ],
    difficulty: 'Intermediate'
  };

  const conceptExplanations = [
    {
      concept: 'Chlorophyll',
      explanation: 'Think of chlorophyll as tiny solar panels in plants. Just like solar panels capture sunlight to make electricity, chlorophyll captures sunlight to make food for the plant.',
      icon: '🌱'
    },
    {
      concept: 'Light vs Dark Reactions',
      explanation: 'Light reactions are like charging a battery with sunlight, while dark reactions are like using that charged battery to build something useful (glucose).',
      icon: '⚡'
    },
    {
      concept: 'Stomata',
      explanation: 'Stomata are like tiny mouths on leaves that open and close to let gases in and out - breathing holes for plants!',
      icon: '👃'
    }
  ];

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Study Materials</h1>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Share className="h-4 w-4" />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{summary.title}</h2>
                  <span className="text-sm text-gray-500">AI-Generated Summary</span>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {summary.content}
                </div>
              </div>
            </motion.div>

            {/* Simple Explanations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Simple Explanations</h2>
              </div>
              
              <div className="space-y-4">
                {conceptExplanations.map((item, index) => (
                  <div key={index} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">{item.concept}</h3>
                        <p className="text-gray-700 text-sm">{item.explanation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Topic Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Topic Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subject</span>
                  <span className="font-medium text-gray-900">Biology</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Difficulty</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                    {summary.difficulty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reading Time</span>
                  <span className="font-medium text-gray-900">8 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Generated</span>
                  <span className="font-medium text-gray-900">Just now</span>
                </div>
              </div>
            </motion.div>

            {/* Key Points */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Key Points</h3>
              </div>
              <ul className="space-y-2">
                {summary.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="text-sm font-medium text-blue-900">Create Flashcards</div>
                  <div className="text-xs text-blue-600">Generate study cards</div>
                </button>
                <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <div className="text-sm font-medium text-green-900">Take Quiz</div>
                  <div className="text-xs text-green-600">Test your knowledge</div>
                </button>
                <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="text-sm font-medium text-purple-900">Ask AI Tutor</div>
                  <div className="text-xs text-purple-600">Get explanations</div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudyMaterials;
