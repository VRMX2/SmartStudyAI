import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Lightbulb, BookOpen, HelpCircle } from 'lucide-react';
import { faker } from '@faker-js/faker';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const Tutor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI tutor. I'm here to help you understand any topic, answer your questions, and explain difficult concepts in simple terms. What would you like to learn about today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('photosynthesis')) {
      return "Great question about photosynthesis! 🌱\n\nThink of photosynthesis as a plant's way of cooking food using sunlight. Just like you need ingredients to cook, plants need:\n\n• **Sunlight** (the energy source - like heat for cooking)\n• **Water** (absorbed through roots)\n• **Carbon dioxide** (from the air through tiny holes called stomata)\n\nThe 'kitchen' where this happens is in the leaves, specifically in tiny structures called chloroplasts. The green color you see? That's chlorophyll - think of it as the chef that captures the sunlight!\n\nThe recipe produces glucose (plant food) and oxygen (which we breathe). Pretty amazing, right?\n\nWould you like me to explain any specific part in more detail?";
    }
    
    if (lowerMessage.includes('math') || lowerMessage.includes('calculus') || lowerMessage.includes('algebra')) {
      return "Math can be tricky, but I love helping with it! 📐\n\nMath is like learning a new language - once you understand the 'grammar' (rules) and 'vocabulary' (formulas), it becomes much easier.\n\nFor any math problem, I recommend:\n1. **Read carefully** - understand what's being asked\n2. **Identify** what you know and what you need to find\n3. **Choose the right tool** (formula or method)\n4. **Work step by step** - don't rush!\n5. **Check your answer** - does it make sense?\n\nWhat specific math topic would you like help with? I can break it down into simple steps!";
    }
    
    if (lowerMessage.includes('chemistry')) {
      return "Chemistry is fascinating! 🧪\n\nThink of chemistry as the study of how tiny building blocks (atoms) combine to make everything around us. It's like LEGO, but at a molecular level!\n\nKey concepts to remember:\n• **Atoms** are like letters\n• **Molecules** are like words (letters combined)\n• **Chemical reactions** are like rearranging words to make new sentences\n\nThe periodic table? It's just a organized list of all the different types of atoms (elements) we know about.\n\nWhat specific chemistry concept would you like me to explain with examples?";
    }
    
    if (lowerMessage.includes('physics')) {
      return "Physics is all about understanding how things work! ⚡\n\nI like to think of physics as the science of 'why' - why do things fall down? Why does light bend? Why do magnets attract?\n\nPhysics concepts often seem abstract, but they're everywhere:\n• **Newton's laws** explain why you feel pushed back in a car\n• **Energy** explains why a roller coaster works\n• **Waves** explain how your phone gets signals\n\nThe key to physics is connecting formulas to real-world examples. What physics topic interests you?";
    }
    
    if (lowerMessage.includes('history')) {
      return "History is like a giant story of humanity! 📚\n\nTo understand history better, I suggest thinking of it as:\n• **Stories** with interesting characters\n• **Cause and effect** - what led to what?\n• **Patterns** - how do events repeat?\n\nRemember dates are important, but understanding WHY things happened is more crucial than memorizing WHEN.\n\nTip: Try to connect historical events to things you know today. Many current events have historical roots!\n\nWhat historical period or event would you like to explore?";
    }
    
    if (lowerMessage.includes('biology')) {
      return "Biology is the study of life - including you! 🧬\n\nI find biology easier to understand when you relate it to your own body:\n• **Cells** are like tiny rooms in a house\n• **DNA** is like the instruction manual\n• **Proteins** are like the workers doing jobs\n• **Organs** are like different departments in a company\n\nEverything in biology is connected - from the smallest cell to entire ecosystems.\n\nWhat aspect of biology would you like to dive into?";
    }
    
    // Default response for general questions
    return `That's a great question! 🤔\n\nTo give you the best explanation, could you provide a bit more context? For example:\n• What specific aspect are you struggling with?\n• Is this for a particular subject or grade level?\n• Have you tried anything already?\n\nI'm here to break down complex topics into simple, understandable explanations with real-world examples. The more specific you can be, the better I can help!\n\nFeel free to ask about any subject - science, math, history, literature, or anything else you're studying!`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const aiResponse: Message = {
      id: Date.now() + 1,
      type: 'ai',
      content: generateAIResponse(userMessage.content),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Explain photosynthesis in simple terms",
    "How do I solve quadratic equations?",
    "What caused World War I?",
    "Explain the difference between mitosis and meiosis"
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto h-screen flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col"
      >
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Bot className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Tutor</h1>
              <p className="text-gray-600">Ask me anything! I'll explain it in simple terms with examples.</p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} space-x-3`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 ${message.type === 'user' ? 'ml-3' : 'mr-3'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' ? 'bg-blue-600' : 'bg-gray-200'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className={`rounded-lg p-4 ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-50 text-gray-900'
                    }`}>
                      <div className="whitespace-pre-line text-sm leading-relaxed">
                        {message.content}
                      </div>
                      <div className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="p-4 border-t border-gray-200">
              <div className="mb-3">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Quick questions to get started:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(question)}
                      className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-3">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything... (Press Enter to send)"
                className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Study Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Lightbulb className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-purple-900">Tips for Better Learning</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start space-x-2">
              <BookOpen className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <span className="text-purple-800">Ask specific questions for better explanations</span>
            </div>
            <div className="flex items-start space-x-2">
              <HelpCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <span className="text-purple-800">Request examples to understand concepts better</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Tutor;
