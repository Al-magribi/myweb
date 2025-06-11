import React, { useRef, useEffect, useState } from "react";
import useVideoProgress from "../../../../hooks/useVideoProgress";
import { useSelector } from "react-redux";
import { useGetLectureProgressQuery } from "../../../../controller/api/course/ApiCourse";

const getYoutubeEmbedUrl = (url) => {
  // Mendukung format youtu.be/xxxx dan youtube.com/watch?v=xxxx
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const VideoPlayer = ({ lecture }) => {
  const { user } = useSelector((state) => state.auth);

  const videoRef = useRef(null);
  const youtubePlayerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [error, setError] = useState(null);
  const [isYoutube, setIsYoutube] = useState(false);

  const { data: lectureProgress, isLoading: isLoadingProgress } =
    useGetLectureProgressQuery(lecture?.id, {
      skip: !lecture?.id,
    });

  const {
    startTrackingProgress,
    updateVideoProgress,
    isTracking,
    lastSavedProgress,
    error: trackingError,
  } = useVideoProgress(lecture?.id, lecture?.duration, lectureProgress);

  const isCompleted = lectureProgress?.is_completed === true;

  // Reset states when lecture changes
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    setProgress(0);
    setIsBuffering(false);
    setError(null);
    setIsYoutube(false);

    // Cleanup YouTube player if it exists
    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.destroy();
      youtubePlayerRef.current = null;
    }
  }, [lecture?.id]);

  useEffect(() => {
    if (trackingError) {
      setError(trackingError);
    }
  }, [trackingError]);

  // Initialize YouTube Player
  useEffect(() => {
    if (lecture?.video_url?.includes("youtu")) {
      setIsYoutube(true);
      let ytInterval = null;
      const createPlayer = () => {
        const embedUrl = getYoutubeEmbedUrl(lecture.video_url);
        if (embedUrl) {
          if (youtubePlayerRef.current) {
            youtubePlayerRef.current.destroy();
            youtubePlayerRef.current = null;
          }
          youtubePlayerRef.current = new window.YT.Player("youtube-player", {
            height: "100%",
            width: "100%",
            videoId: embedUrl.split("/").pop(),
            playerVars: {
              playsinline: 1,
              controls: 1,
              rel: 0,
            },
            events: {
              onReady: (event) => {
                const dur = event.target.getDuration();
                setDuration(dur);
                if (lectureProgress?.watch_duration) {
                  event.target.seekTo(lectureProgress.watch_duration);
                  setCurrentTime(lectureProgress.watch_duration);
                  setProgress((lectureProgress.watch_duration / dur) * 100);
                }
              },
              onStateChange: (event) => {
                if (event.data === window.YT.PlayerState.PLAYING) {
                  setIsBuffering(false);
                  // Start interval for progress update
                  if (ytInterval) clearInterval(ytInterval);
                  if (!isCompleted) {
                    ytInterval = setInterval(() => {
                      if (youtubePlayerRef.current) {
                        const ct = youtubePlayerRef.current.getCurrentTime();
                        const dur = youtubePlayerRef.current.getDuration();
                        setCurrentTime(ct);
                        setProgress((ct / dur) * 100);
                        updateVideoProgress(ct, dur, true);
                      }
                    }, 5000);
                  }
                } else if (event.data === window.YT.PlayerState.PAUSED) {
                  if (ytInterval) clearInterval(ytInterval);
                  if (youtubePlayerRef.current && !isCompleted) {
                    const ct = youtubePlayerRef.current.getCurrentTime();
                    const dur = youtubePlayerRef.current.getDuration();
                    updateVideoProgress(ct, dur, true);
                  }
                } else if (event.data === window.YT.PlayerState.ENDED) {
                  if (ytInterval) clearInterval(ytInterval);
                  if (youtubePlayerRef.current && !isCompleted) {
                    const dur = youtubePlayerRef.current.getDuration();
                    updateVideoProgress(dur, dur, true);
                  }
                } else if (event.data === window.YT.PlayerState.BUFFERING) {
                  setIsBuffering(true);
                }
              },
              onError: (error) => {
                setError("Error playing YouTube video");
              },
            },
          });
        }
      };
      if (window.YT && window.YT.Player) {
        createPlayer();
      } else {
        // Load YouTube IFrame API if not loaded
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = createPlayer;
      }
      return () => {
        if (ytInterval) clearInterval(ytInterval);
        if (youtubePlayerRef.current) {
          youtubePlayerRef.current.destroy();
          youtubePlayerRef.current = null;
        }
      };
    }
  }, [lecture?.video_url, lectureProgress, updateVideoProgress, isCompleted]);

  useEffect(() => {
    if (
      videoRef.current &&
      lecture?.id &&
      lecture?.video_url &&
      !lecture.video_url.includes("youtu") &&
      lecture?.duration
    ) {
      console.log(
        "[VideoPlayer] Start tracking progress for",
        lecture?.id,
        lecture?.title
      );
      const cleanup = startTrackingProgress(videoRef.current);
      return cleanup;
    }
  }, [
    startTrackingProgress,
    lecture?.id,
    lecture?.video_url,
    lecture?.duration,
  ]);

  useEffect(() => {
    if (lectureProgress && !isYoutube && videoRef.current) {
      videoRef.current.currentTime = lectureProgress.watch_duration;
      setCurrentTime(lectureProgress.watch_duration);
      setProgress(
        (lectureProgress.watch_duration / lectureProgress.total_duration) * 100
      );
    }
  }, [lectureProgress, isYoutube]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const newTime = videoRef.current.currentTime;
      const newProgress = (newTime / videoRef.current.duration) * 100;
      setCurrentTime(newTime);
      setProgress(newProgress);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration;
      setDuration(videoDuration);
    }
  };

  const handleWaiting = () => {
    setIsBuffering(true);
  };

  const handlePlaying = () => {
    setIsBuffering(false);
  };

  if (!lecture) {
    return (
      <div
        className="video-container position-relative bg-dark"
        style={{ minHeight: 500 }}
      >
        <div className="d-flex justify-content-center align-items-center h-100">
          <span className="text-white">No lecture selected</span>
        </div>
      </div>
    );
  }

  if (!lecture.video_url) {
    return (
      <div
        className="video-container position-relative bg-dark"
        style={{ minHeight: 400 }}
      >
        <div className="d-flex justify-content-center align-items-center h-100">
          <span className="text-white">
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
      <>
        <div
          className="video-container position-relative bg-dark"
          style={{ minHeight: 500, height: 500 }}
        >
          <div
            id="youtube-player"
            style={{ width: "100%", height: "100%" }}
          ></div>
        </div>
        {/* Progress Information BELOW video */}
        <div className="bg-dark bg-opacity-75 p-2 mt-0">
          <div className="d-flex justify-content-between align-items-center text-white mb-1">
            <small>
              {formatTime(currentTime)} / {formatTime(duration)}
            </small>
            <small>
              {isCompleted ? (
                <span className="text-success">Completed!</span>
              ) : isBuffering ? (
                <span className="text-warning">Buffering...</span>
              ) : (
                `${Math.round(progress)}% watched`
              )}
            </small>
          </div>
          <div className="progress" style={{ height: "4px" }}>
            <div
              className={`progress-bar ${
                isCompleted ? "bg-success" : "bg-primary"
              }`}
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          {isTracking && !isCompleted && (
            <small className="text-success d-block mt-1">
              Progress is being saved...
            </small>
          )}
          {error && (
            <small className="text-danger d-block mt-1">Error: {error}</small>
          )}
        </div>
      </>
    );
  }

  // Jika file video langsung
  // Render hanya jika video_url valid
  if (lecture.video_url) {
    return (
      <>
        <div
          className="video-container position-relative bg-dark"
          style={{ minHeight: 400, height: 400 }}
        >
          <video
            ref={videoRef}
            key={lecture.id}
            className="w-100 h-100"
            controls
            playsInline
            controlsList="nodownload"
            style={{ objectFit: "contain", height: 400 }}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onWaiting={handleWaiting}
            onPlaying={handlePlaying}
          >
            <source src={lecture.video_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* Progress Information BELOW video */}
        <div className="bg-dark bg-opacity-75 p-2 mt-0">
          <div className="d-flex justify-content-between align-items-center text-white mb-1">
            <small>
              {formatTime(currentTime)} / {formatTime(duration)}
            </small>
            <small>
              {isCompleted ? (
                <span className="text-success">Completed!</span>
              ) : isBuffering ? (
                <span className="text-warning">Buffering...</span>
              ) : (
                `${Math.round(progress)}% watched`
              )}
            </small>
          </div>
          <div className="progress" style={{ height: "4px" }}>
            <div
              className={`progress-bar ${
                isCompleted ? "bg-success" : "bg-primary"
              }`}
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          {isTracking && !isCompleted && (
            <small className="text-success d-block mt-1">
              Progress is being saved...
            </small>
          )}
          {error && (
            <small className="text-danger d-block mt-1">Error: {error}</small>
          )}
        </div>
      </>
    );
  }

  // Fallback jika tidak ada video_url
  return (
    <div
      className="video-container position-relative bg-dark"
      style={{ minHeight: 400 }}
    >
      <div className="d-flex justify-content-center align-items-center h-100">
        <span className="text-white">No video available</span>
      </div>
    </div>
  );
};

export default VideoPlayer;
