import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Brain, 
  BookOpen, 
  Target,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react';
import TopicInput from '../components/TopicInput';

const Dashboard: React.FC = () => {
  const [recentActivity] = useState([
    { type: 'flashcard', topic: 'Quantum Physics', time: '2 hours ago' },
    { type: 'quiz', topic: 'Organic Chemistry', time: '1 day ago' },
    { type: 'summary', topic: 'World War II', time: '2 days ago' },
  ]);

  const stats = [
    { label: 'Topics Studied', value: '24', icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Quiz Score', value: '87%', icon: Target, color: 'bg-green-500' },
    { label: 'Study Streak', value: '12 days', icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'Hours Studied', value: '45h', icon: Clock, color: 'bg-orange-500' },
  ];

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to StudyMate AI</h1>
          <p className="text-gray-600">Your personalized AI learning companion for better studying</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Topic Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Start Learning</h2>
          <TopicInput />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <Brain className="h-8 w-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Tutor</h3>
            <p className="text-blue-100 text-sm">Get instant explanations and answers to your questions</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <FileText className="h-8 w-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Smart Summaries</h3>
            <p className="text-purple-100 text-sm">Generate concise summaries from any content</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <Award className="h-8 w-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Practice Tests</h3>
            <p className="text-green-100 text-sm">Test your knowledge with AI-generated quizzes</p>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Created {activity.type} for {activity.topic}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
