// Daily Challenge utility functions

// Get daily landmark (rotates through all landmarks)
export const getDailyLandmark = (landmarks) => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  // Rotate through landmarks based on day of year
  const index = dayOfYear % landmarks.length;
  return landmarks[index];
};

// Get today's date string (YYYY-MM-DD)
export const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Streak tracking
export const getStreakData = () => {
  const data = localStorage.getItem('geonauts_streak');
  if (!data) {
    return {
      currentStreak: 0,
      bestStreak: 0,
      lastCompletedDate: null,
      totalCompleted: 0,
      completedDates: []
    };
  }
  return JSON.parse(data);
};

export const updateStreak = (completed = true) => {
  const streakData = getStreakData();
  const today = getTodayDateString();
  
  if (completed) {
    // Check if already completed today
    if (streakData.lastCompletedDate === today) {
      return streakData; // Already completed today
    }
    
    // Check if streak continues
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];
    
    if (streakData.lastCompletedDate === yesterdayString || streakData.currentStreak === 0) {
      // Continue streak
      streakData.currentStreak += 1;
    } else {
      // Streak broken, start new
      streakData.currentStreak = 1;
    }
    
    // Update best streak
    if (streakData.currentStreak > streakData.bestStreak) {
      streakData.bestStreak = streakData.currentStreak;
    }
    
    streakData.lastCompletedDate = today;
    streakData.totalCompleted += 1;
    streakData.completedDates.push(today);
  }
  
  localStorage.setItem('geonauts_streak', JSON.stringify(streakData));
  return streakData;
};

export const isTodayChallengeCompleted = () => {
  const streakData = getStreakData();
  const today = getTodayDateString();
  return streakData.lastCompletedDate === today;
};

// Quiz questions for landmarks (3 questions per landmark)
export const getQuizQuestions = (landmark) => {
  // Generic questions that can be generated from landmark data
  const questions = [];
  
  // Question 1: Year/Period
  if (landmark.year) {
    questions.push({
      question: `When was ${landmark.name} built or completed?`,
      options: generateYearOptions(landmark.year),
      correctAnswer: 0,
      explanation: `${landmark.name} was built/completed in ${landmark.year}.`
    });
  }
  
  // Question 2: Location
  questions.push({
    question: `Where is ${landmark.name} located?`,
    options: generateLocationOptions(landmark.country, landmark.city),
    correctAnswer: 0,
    explanation: `${landmark.name} is located in ${landmark.city}, ${landmark.country}.`
  });
  
  // Question 3: Category/Type
  questions.push({
    question: `What type of landmark is ${landmark.name}?`,
    options: generateCategoryOptions(landmark.category),
    correctAnswer: 0,
    explanation: `${landmark.name} is classified as a ${landmark.category}.`
  });
  
  return questions;
};

// Helper functions to generate quiz options
const generateYearOptions = (correctYear) => {
  const options = [correctYear];
  const yearNum = parseInt(correctYear.match(/\d+/)?.[0] || '2000');
  
  // Generate 3 wrong options
  const offsets = [-100, -50, 50];
  offsets.forEach(offset => {
    const wrongYear = yearNum + offset;
    options.push(wrongYear.toString());
  });
  
  return shuffleArray(options);
};

const generateLocationOptions = (correctCountry, correctCity) => {
  const correctAnswer = `${correctCity}, ${correctCountry}`;
  const options = [correctAnswer];
  
  // Add some common wrong locations
  const wrongLocations = [
    'Paris, France',
    'Rome, Italy',
    'London, UK',
    'New York, USA',
    'Tokyo, Japan',
    'Cairo, Egypt'
  ];
  
  // Pick 3 wrong options that aren't the correct one
  const filtered = wrongLocations.filter(loc => loc !== correctAnswer);
  options.push(...filtered.slice(0, 3));
  
  return shuffleArray(options);
};

const generateCategoryOptions = (correctCategory) => {
  const options = [correctCategory];
  
  const allCategories = [
    'Ancient Wonder',
    'Modern Icon',
    'Sacred Architecture',
    'Archaeological Site',
    'Engineering Marvel',
    'Medieval Castle',
    'Palace',
    'Natural Wonder'
  ];
  
  // Pick 3 wrong categories
  const filtered = allCategories.filter(cat => cat !== correctCategory);
  options.push(...filtered.slice(0, 3));
  
  return shuffleArray(options);
};

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
