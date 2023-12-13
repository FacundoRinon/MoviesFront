import React from "react";

import "./index.scss";

const VideoPlayer = ({ videos }) => {
  const trailer = videos[1];

  const videoUrl = `https://www.youtube.com/embed/${trailer.key}`;

  return (
    <div className="videoPlayer">
      <iframe
        className="videoPlayer__iframe"
        title={trailer.name}
        src={videoUrl}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
