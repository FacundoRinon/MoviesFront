import React from "react";

import "./index.scss";

const VideoPlayer = ({ videoInfo }) => {
  const videoUrl = `https://www.youtube.com/embed/${videoInfo.key}`;

  console.log(videoInfo);

  return (
    <div className="videoPlayer">
      <iframe
        className="videoPlayer__iframe"
        title={videoInfo.name}
        src={videoUrl}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
