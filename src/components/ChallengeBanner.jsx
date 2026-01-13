import { useState, useEffect } from 'react';
import { getDailyLandmark, getStreakData, isTodayChallengeCompleted } from '../utils/dailyChallenge';

const ChallengeBanner = ({ landmarks, onClick }) => {
  const [dailyLandmark, setDailyLandmark] = useState(null);
  const [streakData, setStreakData] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const landmark = getDailyLandmark(landmarks);
    setDailyLandmark(landmark);
    setStreakData(getStreakData());
    setIsCompleted(isTodayChallengeCompleted());
  }, [landmarks]);

  if (!dailyLandmark) return null;

  if (isCompleted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-4 sm:p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="text-3xl sm:text-4xl">✅</div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-1">Today's Challenge Complete!</h3>
                <p className="text-xs sm:text-sm text-green-600">
                  🔥 {streakData?.currentStreak || 0} day streak · Come back tomorrow
                </p>
              </div>
            </div>
            <button
              onClick={onClick}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition-colors text-sm sm:text-base"
            >
              View Stats
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div className="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
           onClick={onClick}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative">
            <img
              src={dailyLandmark.imageUrl}
              alt={dailyLandmark.name}
              className="w-20 h-20 rounded-xl object-cover shadow-md"
            />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl sm:text-2xl">🔥</span>
              <h3 className="text-base sm:text-xl font-bold text-gray-800">Today's Daily Challenge</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-700 font-medium mb-1">{dailyLandmark.name}</p>
            <p className="text-xs sm:text-sm text-gray-600">
              📍 {dailyLandmark.city}, {dailyLandmark.country}
              {streakData && streakData.currentStreak > 0 && (
                <span className="block sm:inline sm:ml-3 text-orange-600 font-semibold mt-1 sm:mt-0">
                  🔥 {streakData.currentStreak} day streak
                </span>
              )}
            </p>
          </div>
          
          <button className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base">
            Start Challenge →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeBanner;
