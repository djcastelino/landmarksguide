// PathFinder API Services

export const fetchWikipediaSummary = async (query) => {
  try {
    // Initialize pageTitle with the original query
    let pageTitle = query;
    
    // Try exact match first
    let summaryRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query.replace(/ /g, '_'))}`
    );
    
    // If exact match fails, search with filters
    if (!summaryRes.ok) {
      const searchRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`
      );
      
      if (!searchRes.ok) {
        console.warn(`Wikipedia search failed: ${searchRes.status}`);
        return null;
      }
      
      const searchData = await searchRes.json();
      
      if (!searchData.query.search.length) return null;
      
      // Filter out disambiguation pages, court cases, and prefer actual places
      pageTitle = searchData.query.search[0].title;
      for (const result of searchData.query.search) {
        const title = result.title.toLowerCase();
        const snippet = result.snippet.toLowerCase();
        
        // Skip court cases, legal articles, disambiguation pages
        if (title.includes('vs.') || title.includes('v.') || 
            title.includes('(disambiguation)') ||
            snippet.includes('court case') || 
            snippet.includes('litigation')) {
          continue;
        }
        
        // Prefer results that mention building, monument, temple, etc.
        if (snippet.includes('building') || snippet.includes('monument') || 
            snippet.includes('temple') || snippet.includes('palace') ||
            snippet.includes('located in') || snippet.includes('situated')) {
          pageTitle = result.title;
          break;
        }
      }
      
      console.log('Wikipedia found:', pageTitle);
      summaryRes = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle.replace(/ /g, '_'))}`
      );
    }
    
    if (!summaryRes.ok) {
      console.warn(`Wikipedia summary failed: ${summaryRes.status} - Rate limited or not found`);
      return null;
    }
    
    const wikiData = await summaryRes.json();
    
    // Add coordinates if available from Wikipedia
    if (wikiData.coordinates) {
      wikiData.lat = wikiData.coordinates.lat;
      wikiData.lng = wikiData.coordinates.lon;
      console.log('Using Wikipedia coordinates:', wikiData.lat, wikiData.lng);
    } else {
      console.warn('No coordinates in Wikipedia data for:', pageTitle);
    }
    
    return wikiData;
  } catch (error) {
    console.error("Wikipedia fetch error:", error);
    return null;
  }
};

export const generateNarration = async (locationName, wikiContext, wikipediaPage, landmarkContext = null) => {
  try {
    // Enhanced storytelling prompt for 2-3 minute narration
    const enhancedPrompt = `You are an expert tour guide with deep knowledge of world history, architecture, and geography. You have a gift for storytelling with a warm, engaging personality and a touch of light wit. Create an engaging, vivid audio narration (2-3 minutes when spoken) about ${locationName}.

Your narration should:
- Open with a captivating hook that draws listeners in
- Paint a vivid picture of the landmark's physical presence and atmosphere
- Share the fascinating historical backstory and key events
- Explain its geographical and cultural significance
- Include 2-3 fun facts, trivia, or "Did You Know?" moments that surprise and delight
  * Examples: unusual construction methods, surprising measurements, hidden symbolism, famous visitors, movie appearances, quirky traditions, world records, engineering marvels
- Use descriptive, sensory language that helps listeners visualize the scene
- Maintain an enthusiastic, storytelling tone throughout
- Add personality through light wit and clever observations (never forced, always natural)
  * Example: "It took 632 years to finish - which makes your home renovation delays seem pretty reasonable!"
  * Keep humor subtle, universal, and enhancing the facts (not distracting from them)
- End with a memorable takeaway or reflection

CRITICAL RULES:
- Never use phrases like "this station", "this stop", or "this location". Always refer to the landmark by its actual name: "${locationName}".
- DO NOT include any stage directions, sound effects, or music cues like "(music fades)", "(wind blowing)", etc.
- Write ONLY the spoken narration text - no parenthetical directions or scene descriptions
- This is pure audio narration, not a script with production notes

Write in a natural, conversational style as if you're standing right there with the visitor, sharing your passion and knowledge. Make history come alive with fascinating trivia!`;
    
    // Build comprehensive request body
    const requestBody = {
      pathId: 'monument-app',
      locationId: locationName.toLowerCase().replace(/\s+/g, '-'),
      locationTitle: locationName,
      enhancedPrompt: enhancedPrompt,
      wikipediaPage: wikipediaPage || locationName.replace(/\s+/g, '_'),
      timestamp: Date.now()
    };
    
    // Add rich landmark context from curated JSON
    if (landmarkContext) {
      requestBody.landmarkName = locationName;
      requestBody.description = landmarkContext.description;
      requestBody.significance = landmarkContext.significance;
      requestBody.year = landmarkContext.year;
      requestBody.category = landmarkContext.category;
      requestBody.country = landmarkContext.country;
      requestBody.city = landmarkContext.city;
      requestBody.height = landmarkContext.height;
      requestBody.isLandmark = true;
    }
    
    // Call your n8n webhook
    const response = await fetch('https://workflowly.online/webhook/pathfinder-narration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });
    
    const data = await response.json();
    console.log('n8n response has audioContent:', !!data.audioContent);
    return {
      narration: data.narration || "Welcome to this historic site. Take a moment to soak in the incredible atmosphere and rich history surrounding you.",
      audioContent: data.audioContent || null
    };
  } catch (error) {
    console.error("Narration generation error:", error);
    return {
      narration: "Welcome to this historic site. Imagine the countless stories these ancient paths could tell as you explore one of the world's most significant landmarks.",
      audioContent: null
    };
  }
};

export const geocodeLocation = async (query) => {
  try {
    // API key loaded via .env.local
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDLcDOKopyll9ByGplOcQ6sEUx3CYbLphU';
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${apiKey}`
    );
    const data = await res.json();
    
    console.log('Geocoding response:', data); // Debug log
    
    if (data.status === 'OK') {
      const result = data.results[0];
      return {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
        name: result.formatted_address
      };
    }
    
    console.error('Geocoding failed:', data.status, data.error_message);
    return null;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};
