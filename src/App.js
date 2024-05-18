import React, { useState, useRef, useEffect } from "react";
import VideoPlayer from "./components/VideoPlayer";
import Notes from "./components/Notes";

import "./App.css";

const App = () => {
  const [currentVideoId, setCurrentVideoId] = useState("O6P86uwfdR0");

  const [videoInfo, setVideoInfo] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${currentVideoId}&key=AIzaSyBnvFfZaXf6z6TFFRU5e9lGXcd-nJ4xSCM`
        );
        const videoData = response.data.items[0].snippet;
        setVideoInfo({
          title: videoData.title,
          description: videoData.description,
        });
      } catch (error) {
        console.error("Error in fetching video details:", error);
      }
    };

    fetchVideoDetails();
  }, [currentVideoId]);

  return (
    <div className="App">
      <h1>YouTube Video Note Taker</h1>
      <input
        type="text"
        value={currentVideoId}
        onChange={(e) => setCurrentVideoId(e.target.value)}
        placeholder="Enter any youtube video ID..."
      />
      <VideoPlayer />
      <div>
        <h2>{videoInfo.title}</h2>
        <p>{videoInfo.description}</p>
      </div>
      <Notes />
    </div>
  );
};

export default App;
