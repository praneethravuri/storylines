import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home-page/Home';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';
import Help from './pages/Help';
import StoryMap from './pages/story-map/StoryMap';
import CreateStory from './pages/create-story/CreateStory';
import LandingPage from './pages/landing-page/LandingPage';
import DisplayStory from './pages/story/DisplayStory';
import { ThemeProvider } from './components/theme-provider';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import { Toaster } from './components/ui/toaster';

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="App relative overflow-y-hidden">
        <NavBar />
        <main className="">
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="/story-map/:id" element={<StoryMap />} />
            <Route path="story" element={<DisplayStory />} />
            <Route path="/create-story" element={<CreateStory />} />
            
          </Routes>
        </main>
        <div className="footer">
          <Footer />
        </div>
        <Toaster />
      </div>
    </ThemeProvider>
  );
};

export default App;