import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  type: 'mcq' | 'tf' | 'open';
  question: string;
  options?: string[];
  correctAnswer: string | boolean;
  explanation: string;
}

interface QuizResult {
  questionId: number;
  userAnswer: string | boolean;
  isCorrect: boolean;
}

const Quizzes: React.FC = () => {
  const [questions] = useState<Question[]>([
    {
      id: 1,
      type: 'mcq',
      question: 'What is the primary function of chlorophyll in photosynthesis?',
      options: [
        'To absorb carbon dioxide',
        'To absorb light energy',
        'To release oxygen',
        'To produce glucose'
      ],
      correctAnswer: 'To absorb light energy',
      explanation: 'Chlorophyll is the green pigment that captures light energy from the sun, which is essential for the photosynthesis process.'
    },
    {
      id: 2,
      type: 'tf',
      question: 'Photosynthesis only occurs during the day.',
      correctAnswer: false,
      explanation: 'While the light-dependent reactions require sunlight, the Calvin cycle (dark reactions) can occur at any time as long as ATP and NADPH are available.'
    },
    {
      id: 3,
      type: 'mcq',
      question: 'Which of the following is NOT a product of photosynthesis?',
      options: [
        'Glucose',
        'Oxygen',
        'Carbon dioxide',
        'Water (in some reactions)'
      ],
      correctAnswer: 'Carbon dioxide',
      explanation: 'Carbon dioxide is a reactant (input) in photosynthesis, not a product. The products are glucose and oxygen.'
    },
    {
      id: 4,
      type: 'open',
      question: 'Explain the difference between light-dependent and light-independent reactions in photosynthesis.',
      correctAnswer: 'Light-dependent reactions occur in thylakoids and require sunlight to produce ATP and NADPH. Light-independent reactions (Calvin cycle) occur in stroma and use ATP and NADPH to convert CO2 into glucose.',
      explanation: 'This is a comprehensive question about the two main stages of photosynthesis and their distinct functions and locations.'
    },
    {
      id: 5,
      type: 'tf',
      question: 'All parts of a plant can perform photosynthesis.',
      correctAnswer: false,
      explanation: 'Only parts of the plant that contain chloroplasts (mainly leaves and green stems) can perform photosynthesis. Roots, for example, do not have chloroplasts.'
    }
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string | boolean }>({});
  const [results, setResults] = useState<QuizResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<string | boolean>('');

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizStarted && !showResults) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, showResults]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string | boolean) => {
    setCurrentAnswer(answer);
  };

  const handleNextQuestion = () => {
    const updatedAnswers = { ...userAnswers, [currentQuestion.id]: currentAnswer };
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentAnswer('');
    } else {
      finishQuiz(updatedAnswers);
    }
  };

  const finishQuiz = (finalAnswers: { [key: number]: string | boolean }) => {
    const quizResults: QuizResult[] = questions.map(q => ({
      questionId: q.id,
      userAnswer: finalAnswers[q.id],
      isCorrect: finalAnswers[q.id] === q.correctAnswer
    }));
    
    setResults(quizResults);
    setShowResults(true);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setResults([]);
    setShowResults(false);
    setTimeElapsed(0);
    setQuizStarted(false);
    setCurrentAnswer('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScore = () => {
    const correct = results.filter(r => r.isCorrect).length;
    return Math.round((correct / questions.length) * 100);
  };

  if (!quizStarted) {
    return (
      <div className="p-4 lg:p-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Photosynthesis Quiz</h1>
            <p className="text-gray-600 mb-8">Test your knowledge with {questions.length} questions covering key concepts of photosynthesis.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
                <div className="text-sm text-blue-800">Questions</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">~5</div>
                <div className="text-sm text-green-800">Minutes</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">Mixed</div>
                <div className="text-sm text-purple-800">Question Types</div>
              </div>
            </div>

            <button
              onClick={() => setQuizStarted(true)}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start Quiz
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (showResults) {
    const score = getScore();
    const correctCount = results.filter(r => r.isCorrect).length;

    return (
      <div className="p-4 lg:p-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center mb-8">
            <Trophy className={`h-16 w-16 mx-auto mb-6 ${score >= 80 ? 'text-yellow-500' : score >= 60 ? 'text-gray-400' : 'text-red-400'}`} />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Complete!</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{score}%</div>
                <div className="text-blue-800">Score</div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{correctCount}/{questions.length}</div>
                <div className="text-green-800">Correct</div>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-orange-600">{formatTime(timeElapsed)}</div>
                <div className="text-orange-800">Time</div>
              </div>
            </div>

            <button
              onClick={restartQuiz}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors mx-auto"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retake Quiz</span>
            </button>
          </div>

          {/* Detailed Results */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Review Answers</h2>
            {questions.map((question, index) => {
              const result = results.find(r => r.questionId === question.id);
              return (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white rounded-xl shadow-sm border-2 p-6 ${
                    result?.isCorrect ? 'border-green-200' : 'border-red-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex-1">
                      {index + 1}. {question.question}
                    </h3>
                    {result?.isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 ml-4" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 ml-4" />
                    )}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Your answer: </span>
                      <span className={result?.isCorrect ? 'text-green-700' : 'text-red-700'}>
                        {String(result?.userAnswer)}
                      </span>
                    </div>
                    {!result?.isCorrect && (
                      <div>
                        <span className="text-sm font-medium text-gray-600">Correct answer: </span>
                        <span className="text-green-700">{String(question.correctAnswer)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-blue-900 mb-1">Explanation:</div>
                    <div className="text-sm text-blue-800">{question.explanation}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h1>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{formatTime(timeElapsed)}</span>
              </div>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6"
          >
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  currentQuestion.type === 'mcq' ? 'bg-blue-100 text-blue-800' :
                  currentQuestion.type === 'tf' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {currentQuestion.type === 'mcq' ? 'Multiple Choice' :
                   currentQuestion.type === 'tf' ? 'True/False' :
                   'Open Ended'}
                </span>
              </div>
              <h2 className="text-xl font-medium text-gray-900 leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.type === 'mcq' && currentQuestion.options && (
                <>
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                        currentAnswer === option
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          currentAnswer === option
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {currentAnswer === option && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <span className="text-gray-900">{option}</span>
                      </div>
                    </button>
                  ))}
                </>
              )}

              {currentQuestion.type === 'tf' && (
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleAnswerSelect(true)}
                    className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                      currentAnswer === true
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">✓</div>
                      <div className="font-medium text-gray-900">True</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleAnswerSelect(false)}
                    className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                      currentAnswer === false
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">✗</div>
                      <div className="font-medium text-gray-900">False</div>
                    </div>
                  </button>
                </div>
              )}

              {currentQuestion.type === 'open' && (
                <textarea
                  value={currentAnswer as string}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
          >
            Previous
          </button>
          
          <button
            onClick={handleNextQuestion}
            disabled={currentAnswer === ''}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Quizzes;
