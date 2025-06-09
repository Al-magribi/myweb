import React from "react";

const VideoPlayer = ({ videoId }) => {
  return (
    <div className='ratio ratio-16x9 bg-dark' style={{ minHeight: 400 }}>
      {videoId ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title='Course Video'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          className='w-100 h-100 border-0'
        ></iframe>
      ) : (
        <div className='d-flex justify-content-center align-items-center h-100'>
          <span className='text-white'>No video available</span>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
