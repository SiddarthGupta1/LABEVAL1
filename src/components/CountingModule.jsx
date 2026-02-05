import { useEffect, useRef, useState } from 'react';
import { useHandTracking } from '../hooks/useHandTracking.js';
import { recognizeCountingGesture, countFingers } from '../utils/gestureRecognition.js';
import { HandIcon, CheckCircle } from 'lucide-react';

export function CountingModule({ sessionId, onComplete, onLogProgress }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { hands, isLoading } = useHandTracking(videoRef, canvasRef, true);

  const [targetNumber, setTargetNumber] = useState(1);
  const [detectedNumber, setDetectedNumber] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [completedNumbers, setCompletedNumbers] = useState([]);

  useEffect(() => {
    if (hands.length > 0) {
      const detected = recognizeCountingGesture(hands);
      setDetectedNumber(detected);

      if (detected === targetNumber && !showSuccess) {
        setShowSuccess(true);
        setCompletedNumbers(prev => [...prev, targetNumber]);
        onLogProgress('counting', `number_${targetNumber}`, true, attempts + 1);

        setTimeout(() => {
          setShowSuccess(false);
          if (targetNumber < 10) {
            setTargetNumber(targetNumber + 1);
            setAttempts(0);
          } else {
            onComplete();
          }
        }, 2000);
      } else if (detected !== targetNumber && detected > 0) {
        setAttempts(prev => prev + 1);
      }
    } else {
      setDetectedNumber(0);
    }
  }, [hands, targetNumber, showSuccess, attempts, onLogProgress, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
      <div className="mb-6 text-center">
        <h2 className="text-5xl font-extrabold text-blue-700 mb-2 flex items-center justify-center gap-4">
          <span className="text-6xl">🔢</span>
          Counting — Let's Count Together!
        </h2>
        <p className="text-2xl text-blue-800 max-w-3xl mx-auto">Make big slow finger shapes so the camera can see you — have fun while learning!</p>
      </div>

      <div className="flex gap-8 w-full max-w-6xl mx-auto items-center justify-center">
        <div className="flex-1 bg-white rounded-3xl shadow-2xl p-6 relative overflow-hidden">
          <div className="relative">
            <video
              ref={videoRef}
              className="hidden"
              playsInline
            />
            <canvas
              ref={canvasRef}
              width={640}
              height={480}
              className="w-full h-auto rounded-2xl bg-gray-900"
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-2xl">
                <div className="text-white text-xl">Loading camera...</div>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full text-white font-semibold shadow-md transition-all ${showSuccess ? 'bg-green-500 scale-105' : 'bg-pink-500'}`}>
              <HandIcon className="w-6 h-6 text-white" />
              <span className="text-2xl">{showSuccess ? `Great! I see ${detectedNumber}` : `I see ${detectedNumber}`}</span>
            </div>
          </div>
        </div>

        <div className="w-96 bg-white rounded-3xl shadow-2xl p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Target Number</h3>
          <div className="mb-6">
            <div className="w-full h-64 bg-gradient-to-br from-purple-400 via-pink-500 to-yellow-400 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
              <div className="text-11xl font-extrabold text-white drop-shadow-lg">{targetNumber}</div>
              {showSuccess && (
                <div className="absolute inset-0 bg-green-500 bg-opacity-95 flex flex-col items-center justify-center animate-pulse">
                  <CheckCircle className="w-28 h-28 text-white" />
                  <div className="mt-3 text-white text-2xl font-bold">Yay! You did it 🎉</div>
                </div>
              )}
            </div>
          </div> 

          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Progress</h4>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <div
                  key={num}
                  className={`w-full aspect-square rounded-xl flex items-center justify-center text-xl font-bold transition-all ${
                    completedNumbers.includes(num)
                      ? 'bg-green-500 text-white'
                      : num === targetNumber
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
            <p className="text-lg text-gray-800 leading-relaxed">
              <strong>How to play:</strong><br />
              Hold up the number with big, slow fingers. If the camera is shy, try moving your hand a little higher and keeping it steady. When you get it right, the card will cheer for you! ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
