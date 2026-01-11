import { useState } from 'react';

function LandmarkGrid({ landmarks, onLandmarkSelect, isLoading }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Ancient Wonder', 'Modern Icon', 'Sacred Architecture', 'Natural Wonder', 
                      'Archaeological Site', 'Medieval Castle', 'Palace', 'Engineering Marvel', 'Museum', 'Historic Site'];

  const filteredLandmarks = landmarks.filter(landmark => {
    const matchesCategory = selectedCategory === 'All' || landmark.category === selectedCategory;
    const matchesSearch = landmark.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          landmark.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          landmark.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Discover World Landmarks</h1>
        <p className="text-gray-600">Explore 100 of the world's most iconic places with AI-guided stories</p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search landmarks, countries, cities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredLandmarks.length} landmark{filteredLandmarks.length !== 1 ? 's' : ''}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLandmarks.map(landmark => (
            <div
              key={landmark.id}
              onClick={() => onLandmarkSelect(landmark)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden bg-gray-300">
                <img
                  src={landmark.imageUrl}
                  alt={landmark.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    console.error(`Image failed for ${landmark.name}:`, landmark.imageUrl);
                    e.target.style.backgroundColor = '#e5e7eb';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-800">
                    {landmark.category}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-xl font-bold mb-1 drop-shadow-lg">
                    {landmark.name}
                  </h3>
                  <p className="text-white/90 text-sm flex items-center gap-1">
                    <span>📍</span>
                    {landmark.city}, {landmark.country}
                  </p>
                </div>
              </div>

              <div className="p-4">
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {landmark.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {landmark.year}
                  </span>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Discover →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredLandmarks.length === 0 && !isLoading && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500 mb-2">No landmarks found</p>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

export default LandmarkGrid;
