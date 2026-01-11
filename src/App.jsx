import { useState, useEffect } from 'react';
import Header from './components/Header';
import LandmarkGrid from './components/LandmarkGrid';
import LandmarkDetail from './components/LandmarkDetail';
import { fetchWikipediaSummary, generateNarration } from './services/api';
import landmarksData from './data/landmarks.json';

function App() {
  const [currentView, setCurrentView] = useState('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLandmark, setSelectedLandmark] = useState(null);
  const [narrationData, setNarrationData] = useState(null);

  const loadLandmarkNarration = async (landmark) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const wiki = await fetchWikipediaSummary(landmark.name);
      const wikiContext = wiki?.extract || landmark.description;
      
      const landmarkContext = {
        landmarkName: landmark.name,
        description: landmark.description,
        significance: landmark.significance,
        year: landmark.year,
        category: landmark.category,
        country: landmark.country
      };
      
      const narration = await generateNarration(
        landmark.name,
        wikiContext,
        landmark.name.replace(/ /g, '_'),
        landmarkContext
      );
      
      setNarrationData(narration);
      setCurrentView('detail');
    } catch (err) {
      console.error('Failed to load narration:', err);
      setError('Failed to load narration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLandmarkSelect = async (landmark) => {
    setSelectedLandmark(landmark);
    await loadLandmarkNarration(landmark);
  };

  const handleBackToGrid = () => {
    setCurrentView('grid');
    setSelectedLandmark(null);
    setNarrationData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-green-50">
      {currentView === 'grid' && (
        <Header 
          showBack={false} 
          onBack={handleBackToGrid} 
        />
      )}
      
      <main className="flex-1">
        {error && (
          <div className="max-w-7xl mx-auto px-4 mt-6">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}

        {currentView === 'grid' ? (
          <LandmarkGrid 
            landmarks={landmarksData.landmarks}
            onLandmarkSelect={handleLandmarkSelect}
            isLoading={isLoading}
          />
        ) : currentView === 'detail' && selectedLandmark && narrationData ? (
          <LandmarkDetail
            landmark={selectedLandmark}
            narration={narrationData.narration}
            audioContent={narrationData.audioContent}
            onBack={handleBackToGrid}
          />
        ) : null}
      </main>

      <footer className="py-8 text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} Monument AI. Discover the world's greatest landmarks.
      </footer>
    </div>
  );
}

export default App;
