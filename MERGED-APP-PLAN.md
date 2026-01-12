# Merged Geography & Travel App - Master Plan

## 🌍 Overview

Combining three geography/travel apps into one comprehensive platform:
1. **LandmarksGuide** - AI audio tours for 100 world landmarks
2. **City Guess** - Daily city guessing game with 6 clues
3. **Travel Itinerary Builder** - AI trip planner with weather integration

**Result:** A complete geography education and travel planning platform

---

## 🎯 Core Value Proposition

**"Your Daily Geography Adventure"**

- Learn about world landmarks with AI-narrated audio tours
- Challenge yourself with daily geography games
- Plan personalized trips with AI-powered itineraries
- Explore the world through an interactive map
- Build daily learning streaks

---

## ✨ Complete Feature Set

### 1. AI Audio Tours (Current)
- 100+ world landmarks with detailed narrations
- Azure TTS (Andrew & Emma Neural voices)
- 2-3 minute storytelling format
- Historical facts, significance, fun trivia
- Background music at 10% volume
- Search and filter by category, country, city

### 2. Interactive World Map (New)
- Toggle between Grid View and Map View
- See all landmarks pinned geographically
- Color-coded by category
- Click pins to open landmark details
- Zoom/pan functionality
- Filter categories on map
- Search to zoom to specific landmarks
- Tech: React-Leaflet + OpenStreetMap (free, no API key)

### 3. Daily Geography Challenges (New)

**Two Challenge Types (Alternating):**

#### Mystery Mode (Mon/Wed/Fri)
- Guess the City OR Guess the Landmark
- 6 progressive clues (vague to specific)
- Blurred/partial images
- Submit answer after each clue
- Reveal full image + audio tour on correct guess
- Fun fact at completion

#### Learning Mode (Tue/Thu/Sat)
- Featured landmark of the day
- Listen to full AI audio tour
- 3-question quiz after audio
- Test retention
- Immediate feedback

#### Streak Tracking
- Daily completion tracking
- Fire emoji visualization
- Milestone achievements (7 days, 30 days, etc.)
- Stats dashboard (total completed, quiz accuracy, best streak)
- Shareable results

### 4. AI Trip Planner (New)

**Input:**
- Destination city
- Travel dates
- Interest categories (landmarks, food, nightlife, adventure)
- Number of days

**Output:**
- Day-by-day itinerary
- Weather forecast for each day
- Landmark audio tours integrated
- Time slots and suggested order
- Indoor/outdoor activity balance
- View on map
- Export to calendar
- Share itinerary

### 5. User Engagement Features

- "I've Visited" checkmarks
- Bucket list functionality
- Learning dashboard with stats
- Achievement badges
- Social sharing
- Dark mode

---

## 🛠️ Technical Stack

### Frontend
- React (Vite)
- TailwindCSS
- React-Leaflet (maps)
- Deployed: Vercel

### Audio/TTS
- Microsoft Azure Speech Services
- Free tier: 500k characters/month
- Voices: Andrew & Emma Neural

### AI/LLM
- n8n webhook for narration
- LLaMA/GPT for trip planning
- Weather API: OpenWeather

### Data Storage
- Local: landmarks.json
- LocalStorage: user progress
- Future: Firebase/Supabase

---

## 📅 Implementation Roadmap

### Phase 1: Interactive Map (Week 1)
**Time:** 2-3 hours

Tasks:
- Install react-leaflet
- Create MapView component
- Add toggle button (Grid | Map)
- Plot landmarks on map
- Color-code by category
- Add pin popups
- Mobile responsive

### Phase 2: Daily Challenge (Week 1-2)
**Time:** 8-10 hours

Tasks:
- Build streak tracking
- Daily rotation algorithm
- Mystery Mode (guessing game)
- Learning Mode (audio + quiz)
- Stats dashboard
- Content creation (600 clues)

### Phase 3: Trip Planner (Week 2-3)
**Time:** 6-8 hours

Tasks:
- TripPlanner UI
- AI integration
- Weather API
- Itinerary display
- Map integration
- Export/share features

### Phase 4: Engagement Features (Week 3-4)
**Time:** 5-6 hours

Tasks:
- Visited checkmarks
- Bucket list
- Dashboard
- Achievement badges
- PWA setup

### Phase 5: Monetization (Week 4+)
**Time:** 4-5 hours

Tasks:
- Google AdSense
- Premium paywall
- Stripe integration
- Email signup

---

## 💰 Monetization Strategy

### Free Tier
- 5 landmarks/month
- Daily challenge (unlimited)
- Map view
- Ads
- 1 trip plan/month

### Premium ($6.99/month or $49/year)
- Unlimited landmarks
- Offline downloads
- Ad-free
- Unlimited trip planning
- Voice preference
- Custom playlists

### Revenue Projections

| Timeline | Free Users | Premium | Revenue/Month |
|----------|------------|---------|---------------|
| Month 3  | 500        | 20      | $500          |
| Month 6  | 2,000      | 100     | $2,000        |
| Month 12 | 10,000     | 300     | $5,000        |

---

## 🎯 Success Metrics

### Engagement
- Daily active users
- Streak retention (7-day, 30-day)
- Average session time
- Challenges completed

### Growth
- New signups/week
- Conversion to premium
- Referral rate
- Social shares

### Quality
- Quiz accuracy
- Audio completion rate
- Trip planner usage
- User ratings

---

## 🚀 Next Steps

1. **Finalize domain name** (.com availability)
2. **Build Interactive Map** (Phase 1)
3. **Create Daily Challenge** (Phase 2)
4. **Test with users**
5. **Launch MVP**
6. **Add Trip Planner** (Phase 3)
7. **Monetize** (Phase 5)

---

## 📝 Content Requirements

### For Launch
- 100 landmarks with audio ✅
- 100 landmark images ✅
- 600 mystery clues (6 per landmark)
- 300 quiz questions (3 per landmark)
- Category tags ✅
- Coordinates ✅

### Post-Launch
- City data (for City Guess mode)
- More landmark photos (galleries)
- Video content
- User-generated content

---

## 🎨 Branding Considerations

**Current:** landmarksguide.vercel.app
**Future:** [TBD].com

**Top Name Options:**
- WanderQuest.com
- RoamDaily.com
- VentureMap.com
- WanderWise.com
- PlanWander.com

**Tagline Ideas:**
- "Your Daily Geography Adventure"
- "Explore. Learn. Plan."
- "Where Learning Meets Adventure"

---

## 🏆 Competitive Advantages

vs Google Arts & Culture:
- ✅ AI audio narration (they don't have)
- ✅ Daily challenges (gamification)
- ✅ Trip planning integration

vs Rick Steves Audio:
- ✅ AI-generated, always fresh
- ✅ Daily challenges
- ✅ Interactive map
- ✅ Free tier

vs Duolingo:
- ✅ Geography focus (underserved)
- ✅ Real travel utility
- ✅ Audio + visual learning

**Unique Position:** Only app combining geography education, gamification, and practical travel planning

---

**Document Version:** 1.0  
**Last Updated:** January 11, 2026  
**Status:** Planning Phase
