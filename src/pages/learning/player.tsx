import React from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

const VideoPlayer: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();

  return (
    <div className="container mx-auto p-4 overflow-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Video Player</h1>
      <div className="flex justify-center max-w-[1200px] h-screen">
        {videoId && (
          <div className="w-full max-w-[1080px] h-[720px]">
            {" "}
            {/* CSS orqali widthni boshqaramiz */}
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              controls
              width="100%"
              height="100%"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
