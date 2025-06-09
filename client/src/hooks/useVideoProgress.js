import { useCallback, useEffect, useRef } from "react";
import { useUpdateLectureProgressMutation } from "../controller/api/course/ApiCourse";

const useVideoProgress = (lectureId, totalDuration) => {
  const [updateProgress] = useUpdateLectureProgressMutation();
  const progressInterval = useRef(null);
  const lastUpdateTime = useRef(0);

  const updateVideoProgress = useCallback(
    async (currentTime) => {
      const now = Date.now();
      // Only update if at least 5 seconds have passed since last update
      if (now - lastUpdateTime.current < 5000) return;

      try {
        const isCompleted = currentTime >= totalDuration * 0.95; // Consider video completed at 95%
        await updateProgress({
          lecture_id: lectureId,
          watch_duration: Math.floor(currentTime),
          total_duration: totalDuration,
          is_completed: isCompleted,
        });
        lastUpdateTime.current = now;
      } catch (error) {
        console.error("Error updating video progress:", error);
      }
    },
    [lectureId, totalDuration, updateProgress]
  );

  const startTrackingProgress = useCallback(
    (videoElement) => {
      if (!videoElement) return;

      // Clear any existing interval
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }

      // Update progress every 5 seconds
      progressInterval.current = setInterval(() => {
        if (!videoElement.paused) {
          updateVideoProgress(videoElement.currentTime);
        }
      }, 5000);

      // Update progress when video ends
      const handleVideoEnd = () => {
        updateVideoProgress(videoElement.duration);
      };

      videoElement.addEventListener("ended", handleVideoEnd);

      return () => {
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
        videoElement.removeEventListener("ended", handleVideoEnd);
      };
    },
    [updateVideoProgress]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  return { startTrackingProgress };
};

export default useVideoProgress;
