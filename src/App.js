import React, { useState } from 'react';
import './App.css';
import { News } from './componants/News';
import Navbar from './componants/Navbar';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

function App() {
  const apiKey = process.env.REACT_APP_news_api; // Use REACT_APP_ prefix

  const [progress, setProgress] = useState(0);

  const handleSetProgress = (newProgress) => {
    setProgress(newProgress);
  };

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/general" element={<News setProgress={handleSetProgress} apiKey={apiKey} key="general" pageSize={8} country="in" category="general" />} />
          <Route exact path="/entertainment" element={<News setProgress={handleSetProgress} apiKey={apiKey} key="entertainment" pageSize={8} country="in" category="entertainment" />} />
          <Route exact path="/business" element={<News setProgress={handleSetProgress} apiKey={apiKey} key="business" pageSize={8} country="in" category="business" />} />
          <Route exact path="/health" element={<News setProgress={handleSetProgress} apiKey={apiKey} key="health" pageSize={8} country="in" category="health" />} />
          <Route exact path="/science" element={<News setProgress={handleSetProgress} apiKey={apiKey} key="science" pageSize={8} country="in" category="science" />} />
          <Route exact path="/sports" element={<News setProgress={handleSetProgress} apiKey={apiKey} key="sports" pageSize={8} country="in" category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={handleSetProgress} apiKey={apiKey} key="technology" pageSize={8} country="in" category="technology" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
