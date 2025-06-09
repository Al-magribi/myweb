import React, { useRef, useEffect } from "react";
import useVideoProgress from "../../../hooks/useVideoProgress";

const getYoutubeEmbedUrl = (url) => {
  // Mendukung format youtu.be/xxxx dan youtube.com/watch?v=xxxx
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const VideoPlayer = ({ lecture }) => {
  const videoRef = useRef(null);
  const { startTrackingProgress } = useVideoProgress(
    lecture?.id,
    lecture?.duration
  );

  console.log(lecture);

  useEffect(() => {
    if (
      videoRef.current &&
      lecture?.id &&
      lecture?.video_url &&
      !lecture.video_url.includes("youtu")
    ) {
      const cleanup = startTrackingProgress(videoRef.current);
      return cleanup;
    }
  }, [startTrackingProgress, lecture?.id, lecture?.video_url]);

  if (!lecture) {
    return (
      <div
        className='video-container position-relative bg-dark'
        style={{ minHeight: 400 }}
      >
        <div className='d-flex justify-content-center align-items-center h-100'>
          <span className='text-white'>No lecture selected</span>
        </div>
      </div>
    );
  }

  if (!lecture.video_url) {
    return (
      <div
        className='video-container position-relative bg-dark'
        style={{ minHeight: 400 }}
      >
        <div className='d-flex justify-content-center align-items-center h-100'>
          <span className='text-white'>
            No video available for this lecture
          </span>
        </div>
      </div>
    );
  }

  // Jika YouTube
  if (lecture.video_url.includes("youtu")) {
    const embedUrl = getYoutubeEmbedUrl(lecture.video_url);
    return (
      <div
        className='video-container position-relative bg-dark'
        style={{ minHeight: 400, height: 400 }}
      >
        {embedUrl ? (
          <iframe
            width='100%'
            height='100%'
            src={embedUrl}
            title={lecture.title}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            style={{ border: 0, height: "100%" }}
          ></iframe>
        ) : (
          <div className='d-flex justify-content-center align-items-center h-100'>
            <span className='text-white'>Invalid YouTube URL</span>
          </div>
        )}
      </div>
    );
  }

  // Jika file video langsung
  return (
    <div
      className='video-container position-relative bg-dark'
      style={{ minHeight: 400, height: 400 }}
    >
      <video
        ref={videoRef}
        className='w-100 h-100'
        controls
        playsInline
        controlsList='nodownload'
        style={{ objectFit: "contain", height: 400 }}
      >
        <source src={lecture.video_url} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
