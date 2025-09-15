import React from 'react';
import { Menu, Brain, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">StudyMate AI</h1>
              <p className="text-sm text-gray-500 hidden sm:block">Your AI Learning Companion</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
            <span className="text-sm text-gray-600">Welcome back, Student!</span>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <User className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
