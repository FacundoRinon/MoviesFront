import React from "react";

import "./index.scss";

const VideoPlayer = ({ video }) => {
  const videoUrl = `https://www.youtube.com/embed/${video.key}`;

  return (
    <div className="videoPlayer">
      <iframe
        className="videoPlayer__iframe"
        title={video.name}
        src={videoUrl}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
