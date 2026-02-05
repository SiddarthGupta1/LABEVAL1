import { useEffect, useRef, useState } from 'react';
import { useHandTracking } from '../hooks/useHandTracking.js';
import { recognizeSocialGesture } from '../utils/gestureRecognition.js';
import { Hand, ThumbsUp, ThumbsDown, Heart, CheckCircle } from 'lucide-react';

const socialGestures = [
  {
    name: 'hello',
    icon: Hand,
    color: 'from-blue-400 to-blue-600',
    instruction: 'Raise one hand up once (palm visible) to say Hello',
    emoji: '👋'
  },
  {
    name: 'thumbs-up',
    icon: ThumbsUp,
    color: 'from-green-400 to-green-600',
    instruction: 'Point your thumb up with other fingers down',
    emoji: '👍'
  },
  {
    name: 'thumbs-down',
    icon: ThumbsDown,
    color: 'from-red-400 to-red-600',
    instruction: 'Point your thumb down with other fingers down',
    emoji: '👎'
  },
  {
    name: 'bye',
    icon: Hand,
    color: 'from-purple-400 to-purple-600',
    instruction: 'Wave one hand side-to-side for Bye',
    emoji: '👋'
  },
  {
    name: 'namaskaar',
    icon: Heart,
    color: 'from-pink-400 to-pink-600',
    instruction: 'Bring both hands together in front of your chest (Namaskaar)',
    emoji: '🙏'
  }
];

export function SocialSkillsModule({ sessionId, onComplete, onLogProgress }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { hands, isLoading } = useHandTracking(videoRef, canvasRef, true);

  const [currentGestureIndex, setCurrentGestureIndex] = useState(0);
  const [detectedGesture, setDetectedGesture] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [completedGestures, setCompletedGestures] = useState([]);

  const currentGesture = socialGestures[currentGestureIndex];

  const friendlyLabels = {
    hello: 'Hello! 👋',
    bye: 'Bye! 👋',
    'thumbs-up': 'Great job! 👍',
    'thumbs-down': 'Nice try 👎',
    namaskaar: 'Namaskaar 🙏'
  };

  // Wave and raise detection state
  const waveRef = useRef({ xs: [], lastWaveAt: 0 });
  const raiseRef = useRef({ ys: [], lastHelloAt: 0 });

  useEffect(() => {
    if (hands.length > 0) {
      // Push current wrist positions for wave/raise detection
      const h = hands[0];
      if (h && h.landmarks) {
        const wrist = h.landmarks[0];
        const now = Date.now();

        // wave history (x positions)
        const w = waveRef.current;
        w.xs.push({ x: wrist.x, t: now });
        if (w.xs.length > 20) w.xs.shift();

        // raise history (y positions)
        const r = raiseRef.current;
        r.ys.push({ y: wrist.y, t: now });
        if (r.ys.length > 20) r.ys.shift();

        // simple wave detection: count horizontal direction changes with amplitude
        let crossings = 0;
        for (let i = 2; i < w.xs.length; i++) {
          const dx1 = w.xs[i - 1].x - w.xs[i - 2].x;
          const dx2 = w.xs[i].x - w.xs[i - 1].x;
          if (dx1 * dx2 < 0 && Math.abs(dx2) > 0.03) crossings++;
        }
        const recentlyWaved = crossings >= 2 && (now - w.lastWaveAt) > 1500;

        // simple raise detection: check for quick upward movement across window
        const ys = r.ys.map(o => o.y);
        const yDiff = ys.length >= 2 ? ys[0] - ys[ys.length - 1] : 0; // positive if moved up
        const recentlyRaised = yDiff > 0.18 && (now - r.lastHelloAt) > 1500;

        // two-hand Namaskaar is handled in recognizeSocialGesture (higher priority)
        let detected = recognizeSocialGesture(hands);

        // override with wave/raise if detected by motion
        if (recentlyWaved) {
          detected = 'bye';
          waveRef.current.lastWaveAt = now;
        } else if (recentlyRaised) {
          detected = 'hello';
          raiseRef.current.lastHelloAt = now;
        }

        setDetectedGesture(detected);

        if (detected === currentGesture.name && !showSuccess) {
          setShowSuccess(true);
          setCompletedGestures(prev => [...prev, currentGesture.name]);
          onLogProgress('social_skills', currentGesture.name, true, attempts + 1);

          setTimeout(() => {
            setShowSuccess(false);
            if (currentGestureIndex < socialGestures.length - 1) {
              setCurrentGestureIndex(currentGestureIndex + 1);
              setAttempts(0);
            } else {
              onComplete();
            }
          }, 2000);
        } else if (detected !== currentGesture.name && detected !== null) {
          setAttempts(prev => prev + 1);
        }
      }
    } else {
      setDetectedGesture(null);
    }
  }, [hands, currentGesture.name, currentGestureIndex, showSuccess, attempts, onLogProgress, onComplete]);

  const GestureIcon = currentGesture.icon;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-green-50 to-teal-50 p-8">
      <div className="mb-6 text-center">
        <h2 className="text-5xl font-extrabold text-green-700 mb-2 flex items-center justify-center gap-4">
          <span className="text-6xl">🤝</span>
          Social Skills — Let's Play!
        </h2>
        <p className="text-2xl text-green-800 max-w-3xl mx-auto">
          Fun, friendly gestures for kids — big buttons, clear instructions, and bright visuals.
        </p>
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
            <div
              role="status"
              aria-live="polite"
              className={`inline-flex items-center gap-3 px-4 py-2 rounded-full font-semibold ${
                detectedGesture ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              } ${showSuccess ? 'animate-pulse' : ''}`}
            >
              <span className="text-2xl">{detectedGesture ? (detectedGesture === 'hello' ? '👋' : detectedGesture === 'bye' ? '👋' : detectedGesture === 'namaskaar' ? '🙏' : detectedGesture === 'thumbs-up' ? '👍' : detectedGesture === 'thumbs-down' ? '👎' : '✨') : '❓'}</span>
              <span className="text-lg">{detectedGesture ? friendlyLabels[detectedGesture] || detectedGesture : 'No gesture yet'}</span>
            </div>
          </div>
        </div>

        <div className="w-96 bg-white rounded-3xl shadow-2xl p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Target Gesture</h3>
          <div className="mb-6">
            <div className={`w-full h-56 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden`} style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(6,182,212,0.08))' }}>
              <div className="text-9xl mb-2">{currentGesture.emoji}</div>
              <div className="text-2xl font-extrabold text-gray-800 capitalize">Try: {currentGesture.name.replace('-', ' ')}</div>
              {showSuccess && (
                <div className="absolute -top-4 right-4 bg-white rounded-full p-3 shadow-lg flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
              )}
            </div>
            <div className="mt-4 text-center">
              <p className="text-xl font-semibold text-gray-800">{currentGesture.instruction}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Progress</h4>
            <div className="grid grid-cols-2 gap-3">
              {socialGestures.map((gesture) => (
                <div
                  key={gesture.name}
                  className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all ${
                    completedGestures.includes(gesture.name)
                      ? 'bg-green-500 text-white'
                      : gesture.name === currentGesture.name
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <div className="text-3xl mb-2">{gesture.emoji}</div>
                  <span className="text-sm font-semibold capitalize">{gesture.name.replace('-', ' ')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-xl">
            <h4 className="text-lg font-bold text-gray-800">How to play</h4>
            <ul className="mt-2 space-y-2 text-md text-gray-700">
              <li>• Look at the camera and follow the instruction above.</li>
              <li>• Make big, slow movements — that helps the app see your hands.</li>
              <li>• Try a few times if it doesn't work the first time.</li>
            </ul>
            <div className="mt-3 text-sm text-gray-600">Tip: Smile and have fun! 😊</div>
          </div>
        </div>
      </div>
    </div>
  );
}
