import { useEffect, useRef, useState, useCallback } from 'react';
import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

export function useHandTracking(videoRef, canvasRef, enabled = true) {
  const [hands, setHands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const handsInstance = useRef(null);
  const cameraInstance = useRef(null);

  const onResults = useCallback((results) => {
    if (!canvasRef.current) return;

    const canvasCtx = canvasRef.current.getContext('2d');
    if (!canvasCtx) return;

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

    if (results.multiHandLandmarks && results.multiHandedness) {
      const detectedHands = results.multiHandLandmarks.map((landmarks, index) => ({
        landmarks,
        handedness: results.multiHandedness[index].label,
      }));

      setHands(detectedHands);

      for (let i = 0; i < results.multiHandLandmarks.length; i++) {
        const landmarks = results.multiHandLandmarks[i];

        for (let j = 0; j < landmarks.length; j++) {
          const x = landmarks[j].x * canvasRef.current.width;
          const y = landmarks[j].y * canvasRef.current.height;

          canvasCtx.beginPath();
          canvasCtx.arc(x, y, 5, 0, 2 * Math.PI);
          canvasCtx.fillStyle = '#00FF00';
          canvasCtx.fill();
        }

        const connections = [
          [0, 1], [1, 2], [2, 3], [3, 4],
          [0, 5], [5, 6], [6, 7], [7, 8],
          [0, 9], [9, 10], [10, 11], [11, 12],
          [0, 13], [13, 14], [14, 15], [15, 16],
          [0, 17], [17, 18], [18, 19], [19, 20],
          [5, 9], [9, 13], [13, 17]
        ];

        canvasCtx.strokeStyle = '#00FF00';
        canvasCtx.lineWidth = 2;

        for (const [start, end] of connections) {
          const startX = landmarks[start].x * canvasRef.current.width;
          const startY = landmarks[start].y * canvasRef.current.height;
          const endX = landmarks[end].x * canvasRef.current.width;
          const endY = landmarks[end].y * canvasRef.current.height;

          canvasCtx.beginPath();
          canvasCtx.moveTo(startX, startY);
          canvasCtx.lineTo(endX, endY);
          canvasCtx.stroke();
        }
      }
    } else {
      setHands([]);
    }

    canvasCtx.restore();
  }, [canvasRef]);

  useEffect(() => {
    if (!enabled || !videoRef.current) return;

    const initializeHands = async () => {
      try {
        setIsLoading(true);

        handsInstance.current = new Hands({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          },
        });

        handsInstance.current.setOptions({
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        handsInstance.current.onResults(onResults);

        if (videoRef.current) {
          cameraInstance.current = new Camera(videoRef.current, {
            onFrame: async () => {
              if (videoRef.current && handsInstance.current) {
                await handsInstance.current.send({ image: videoRef.current });
              }
            },
            width: 640,
            height: 480,
          });

          await cameraInstance.current.start();
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing hand tracking:', err);
        setError('Failed to initialize camera or hand tracking');
        setIsLoading(false);
      }
    };

    initializeHands();

    return () => {
      if (cameraInstance.current) {
        cameraInstance.current.stop();
      }
      if (handsInstance.current) {
        handsInstance.current.close();
      }
    };
  }, [enabled, videoRef, onResults]);

  return { hands, isLoading, error };
}
