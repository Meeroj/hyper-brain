import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Video {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    resourceId: {
      videoId: string;
    };
  };
}

const Playlist: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const navigate = useNavigate();
  const API_KEY = "AIzaSyAobjc7NJOdAUTI6BZ-wfAp8D1rM3wNidE";
  const PLAYLIST_ID = "PLX3GyfarzgygFDknQv62TBpvwOWBucZce";

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlistItems`,
          {
            params: {
              part: "snippet",
              maxResults: 10,
              playlistId: PLAYLIST_ID,
              key: API_KEY,
            },
          }
        );
        setVideos(response.data.items);
      } catch (error) {
        console.error("Error fetching playlist items:", error);
      }
    };

    fetchVideos();
  }, [API_KEY, PLAYLIST_ID]);

  const handleVideoClick = (videoId: string) => {
    navigate(`/dashboard/learning/${videoId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">YouTube Playlist</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <li
            key={video.id}
            className="flex flex-col items-center border rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-200"
            onClick={() => handleVideoClick(video.snippet.resourceId.videoId)}
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-full h-40 object-cover rounded-t-xl"
            />
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-center text-blue-600">
                {video.snippet.title}
              </h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
