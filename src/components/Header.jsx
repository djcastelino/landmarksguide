import { ArrowLeft, Landmark } from 'lucide-react';

export default function Header({ showBack, onBack }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-2.5 shadow-md">
            <Landmark className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Monument</h1>
            <p className="text-xs text-gray-500">AI-Powered Landmark Discovery</p>
          </div>
        </div>
        
        {showBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Landmarks
          </button>
        )}
      </div>
    </header>
  );
}
