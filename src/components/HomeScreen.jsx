import { HandIcon, Square, Heart, MessageSquare } from 'lucide-react';

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full mx-auto justify-center">
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

        <button
          onClick={() => onSelectModule('bridge-builder')}
          className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all transform hover:scale-105 group"
        >
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
              <Square className="w-16 h-16 text-white" strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Bridge Builder</h2>
            <p className="text-lg text-gray-600 text-center">
              Fix the bridge to let the car cross!
            </p>
            <div className="mt-6 text-5xl">🌉</div>
          </div>
        </button>

        <button
          onClick={() => onSelectModule('feedback')}
          className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all transform hover:scale-105 group"
        >
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
              <MessageSquare className="w-16 h-16 text-white" strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Feedback</h2>
            <p className="text-lg text-gray-600 text-center">
              Share your experience using Class Components
            </p>
            <div className="mt-6 text-5xl">📋</div>
          </div>
        </button>

        <button
          onClick={() => onSelectModule('product-description')}
          className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all transform hover:scale-105 group"
        >
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-white"><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Product</h2>
            <p className="text-lg text-gray-600 text-center">
              View product details and features
            </p>
            <div className="mt-6 text-5xl">📦</div>
          </div>
        </button>

        <button
          onClick={() => onSelectModule('member-detail')}
          className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all transform hover:scale-105 group"
        >
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-rose-600 rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-white"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Team</h2>
            <p className="text-lg text-gray-600 text-center">
              View member and course details
            </p>
            <div className="mt-6 text-5xl">👥</div>
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
