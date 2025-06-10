import { useCallback, useEffect, useRef, useState } from "react";
import { useUpdateLectureProgressMutation } from "../controller/api/course/ApiCourse";

const useVideoProgress = (lectureId, totalDuration, lectureProgress) => {
  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [isTracking, setIsTracking] = useState(false);
  const [lastSavedProgress, setLastSavedProgress] = useState(0);
  const [error, setError] = useState(null);
  const lastUpdateTimeRef = useRef(0);
  const intervalRef = useRef(null);

  const isCompleted = lectureProgress?.is_completed === true;

  const updateVideoProgress = useCallback(
    async (currentTime, duration, isYoutube = false) => {
      if (isCompleted) {
        return;
      }
      try {
        // Ensure both are integers
        const watch_duration = Math.floor(currentTime);
        const total_duration = Math.floor(duration);

        if (!lectureId || !totalDuration) {
          setError("Missing lecture ID or duration");
          return;
        }

        const now = Date.now();
        if (now - lastUpdateTimeRef.current < 5000 && !isYoutube) {
          // For YouTube, always allow update (interval handled in VideoPlayer)
          return;
        }

        const progress = (watch_duration / total_duration) * 100;
        const isCompletedCalc = progress >= 95;

        const result = await updateLectureProgress({
          lecture_id: lectureId,
          watch_duration,
          total_duration,
          is_completed: isCompletedCalc,
        });

        lastUpdateTimeRef.current = now;
        setLastSavedProgress(watch_duration);
      } catch (err) {
        setError(err.message);
      }
    },
    [lectureId, totalDuration, updateLectureProgress, isCompleted]
  );

  const startTrackingProgress = useCallback(
    (videoElement) => {
      if (isCompleted) {
        return;
      }

      if (!lectureId || !totalDuration) {
        setError("Missing lecture ID or duration");
        return;
      }

      setIsTracking(true);
      setError(null);

      // If it's a YouTube video, do nothing (handled in VideoPlayer)
      if (typeof videoElement === "object" && videoElement.isYoutube) {
        return () => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        };
      }

      // For regular video elements
      if (!videoElement || !(videoElement instanceof HTMLVideoElement)) {
        setError("Invalid video element");
        return;
      }

      const handleTimeUpdate = () => {
        if (videoElement.paused) return;
        updateVideoProgress(videoElement.currentTime, videoElement.duration);
      };

      const handlePause = () => {
        updateVideoProgress(videoElement.currentTime, videoElement.duration);
      };

      const handleSeeked = () => {
        updateVideoProgress(videoElement.currentTime, videoElement.duration);
      };

      const handleEnded = () => {
        updateVideoProgress(videoElement.duration, videoElement.duration);
      };

      videoElement.addEventListener("timeupdate", handleTimeUpdate);
      videoElement.addEventListener("pause", handlePause);
      videoElement.addEventListener("seeked", handleSeeked);
      videoElement.addEventListener("ended", handleEnded);

      // Set up interval for regular updates
      intervalRef.current = setInterval(() => {
        if (!videoElement.paused) {
          updateVideoProgress(videoElement.currentTime, videoElement.duration);
        }
      }, 5000);

      return () => {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        videoElement.removeEventListener("pause", handlePause);
        videoElement.removeEventListener("seeked", handleSeeked);
        videoElement.removeEventListener("ended", handleEnded);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setIsTracking(false);
      };
    },
    [lectureId, totalDuration, updateVideoProgress, isCompleted]
  );

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    startTrackingProgress,
    updateVideoProgress,
    isTracking,
    lastSavedProgress,
    error,
  };
};

export default useVideoProgress;
