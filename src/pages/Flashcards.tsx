import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ArrowLeft, ArrowRight, Shuffle, Check } from 'lucide-react';
import { faker } from '@faker-js/faker';

interface Flashcard {
  id: number;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const Flashcards: React.FC = () => {
  const [flashcards] = useState<Flashcard[]>([
    {
      id: 1,
      front: 'What is photosynthesis?',
      back: 'The process by which green plants use sunlight to synthesize food from carbon dioxide and water, producing oxygen as a byproduct.',
      difficulty: 'easy'
    },
    {
      id: 2,
      front: 'Where does photosynthesis occur in plant cells?',
      back: 'Photosynthesis occurs in chloroplasts, specifically in the thylakoids (light reactions) and stroma (dark reactions).',
      difficulty: 'medium'
    },
    {
      id: 3,
      front: 'What is the chemical equation for photosynthesis?',
      back: '6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂',
      difficulty: 'hard'
    },
    {
      id: 4,
      front: 'What are the two main stages of photosynthesis?',
      back: '1. Light-dependent reactions (occur in thylakoids)\n2. Light-independent reactions or Calvin cycle (occur in stroma)',
      difficulty: 'medium'
    },
    {
      id: 5,
      front: 'What is chlorophyll?',
      back: 'A green pigment found in chloroplasts that absorbs light energy for photosynthesis, primarily absorbing red and blue light wavelengths.',
      difficulty: 'easy'
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set());

  const currentCard = flashcards[currentIndex];

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const markAsStudied = () => {
    setStudiedCards(prev => new Set([...prev, currentCard.id]));
    setTimeout(nextCard, 500);
  };

  const shuffleCards = () => {
    setCurrentIndex(Math.floor(Math.random() * flashcards.length));
    setIsFlipped(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Flashcards</h1>
            <p className="text-gray-600 mt-1">Photosynthesis Study Set</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {currentIndex + 1} of {flashcards.length}
            </span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">{studiedCards.size}</div>
            <div className="text-sm text-gray-600">Cards Studied</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-green-600">{flashcards.length - studiedCards.size}</div>
            <div className="text-sm text-gray-600">Cards Remaining</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">
              {studiedCards.size > 0 ? Math.round((studiedCards.size / flashcards.length) * 100) : 0}%
            </div>
            <div className="text-sm text-gray-600">Progress</div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="flex justify-center mb-8">
          <motion.div
            className="relative w-full max-w-2xl h-80 cursor-pointer"
            style={{ perspective: '1000px' }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isFlipped ? 'back' : 'front'}
                initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 rounded-xl shadow-lg border-2 p-8 flex flex-col justify-center items-center text-center ${
                  studiedCards.has(currentCard.id) 
                    ? 'bg-green-50 border-green-300' 
                    : 'bg-white border-gray-300'
                }`}
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Difficulty Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentCard.difficulty)}`}>
                    {currentCard.difficulty}
                  </span>
                </div>

                {/* Studied Badge */}
                {studiedCards.has(currentCard.id) && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                      <Check className="h-3 w-3" />
                      <span>Studied</span>
                    </div>
                  </div>
                )}

                {/* Card Content */}
                <div className="flex-1 flex items-center justify-center">
                  <div>
                    <div className="text-sm text-gray-500 mb-4">
                      {isFlipped ? 'Answer' : 'Question'}
                    </div>
                    <div className="text-xl font-medium text-gray-900 leading-relaxed">
                      {isFlipped ? currentCard.back : currentCard.front}
                    </div>
                  </div>
                </div>

                {/* Flip Hint */}
                <div className="text-sm text-gray-400 mt-4">
                  Click to {isFlipped ? 'see question' : 'reveal answer'}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <button
              onClick={prevCard}
              className="p-3 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="p-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
            
            <button
              onClick={nextCard}
              className="p-3 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ArrowRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={shuffleCards}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Shuffle className="h-4 w-4" />
              <span>Shuffle</span>
            </button>
            
            {!studiedCards.has(currentCard.id) && (
              <button
                onClick={markAsStudied}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Check className="h-4 w-4" />
                <span>Mark as Studied</span>
              </button>
            )}
          </div>
        </div>

        {/* Study Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200"
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Study Tips</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm">Try to answer before flipping the card</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm">Review difficult cards multiple times</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm">Use the shuffle feature to test random recall</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Flashcards;
