import { Star, Trophy, Sparkles } from 'lucide-react';

export function CelebrationScreen({ moduleName, onContinue }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400"></div>

        <div className="flex justify-center gap-4 mb-6 animate-bounce">
          <Star className="w-16 h-16 text-yellow-500 fill-yellow-500" />
          <Trophy className="w-20 h-20 text-orange-500 fill-orange-500" />
          <Star className="w-16 h-16 text-yellow-500 fill-yellow-500" />
        </div>

        <h2 className="text-5xl font-bold text-gray-800 mb-4">
          Amazing Job!
        </h2>

        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-pink-500" />
          <p className="text-2xl text-gray-700">
            You completed the <span className="font-bold text-orange-600">{moduleName}</span> module!
          </p>
          <Sparkles className="w-6 h-6 text-pink-500" />
        </div>

        <div className="mb-8">
          <div className="text-7xl mb-4">🎉</div>
          <p className="text-xl text-gray-600">
            You're doing great! Keep learning and having fun!
          </p>
        </div>

        <button
          onClick={onContinue}
          className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white text-2xl font-bold py-4 px-12 rounded-2xl shadow-lg transition-all transform hover:scale-105"
        >
          Continue Learning
        </button>
      </div>
    </div>
  );
}
