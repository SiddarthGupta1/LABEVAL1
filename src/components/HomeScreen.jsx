import { HandIcon, Square, Heart } from 'lucide-react';

export function HomeScreen({ onSelectModule }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          Gesture Learning
        </h1>
        <p className="text-2xl text-gray-600">
          Learn with your hands! Choose a module to begin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full mx-auto justify-center">
        <button
          onClick={() => onSelectModule('counting')}
          className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all transform hover:scale-105 group"
        >
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
              <HandIcon className="w-16 h-16 text-white" strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Counting</h2>
            <p className="text-lg text-gray-600 text-center">
              Learn to count from 1 to 10 using your fingers
            </p>
            <div className="mt-6 text-5xl">🔢</div>
          </div>
        </button>



        <button
          onClick={() => onSelectModule('social')}
          className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all transform hover:scale-105 group"
        >
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
              <Heart className="w-16 h-16 text-white" strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Social Skills</h2>
            <p className="text-lg text-gray-600 text-center">
              Practice friendly gestures and greetings
            </p>
            <div className="mt-6 text-5xl">👋</div>
          </div>
        </button>
      </div>

      <div className="mt-12 text-center max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            <strong className="text-blue-600">Welcome!</strong> This app helps you learn through hand gestures.
            Make sure your camera is enabled, and follow the instructions on screen. Have fun learning!
          </p>
        </div>
      </div>
    </div>
  );
}
