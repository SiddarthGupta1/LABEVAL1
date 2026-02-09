import React, { useState, useEffect } from 'react';
import { Hammer, RotateCcw, CheckCircle2 } from 'lucide-react';

export const BridgeBuilderGame = ({ onComplete, onLogProgress, sessionId }) => {
    const [level, setLevel] = useState(1);
    const [targetGap, setTargetGap] = useState(5);
    const [filledBlocks, setFilledBlocks] = useState([]);
    const [availableBlocks, setAvailableBlocks] = useState([]);
    const [feedback, setFeedback] = useState("Build the bridge!");
    const [showSuccess, setShowSuccess] = useState(false);

    // Game Configuration
    const MAX_LEVEL = 5;

    useEffect(() => {
        startLevel(level);
    }, [level]);

    const startLevel = (currentLevel) => {
        // Difficulty scales: Gap logic
        // Level 1: Gap 3, blocks [1, 2, 3]
        // Level 5: Gap 10
        const newTarget = 2 + currentLevel + Math.floor(Math.random() * 2);
        setTargetGap(newTarget);
        setFilledBlocks([]);
        setFeedback(`Fill the gap of size ${newTarget}!`);
        setShowSuccess(false);

        // Generate blocks that GUARANTEE a solution + randomness
        // Simple approach: Give blocks 1 through newTarget/2 + some randoms
        const blocks = [];
        for (let i = 1; i <= newTarget; i++) {
            blocks.push({ id: `block-${i}`, value: Math.floor(Math.random() * 4) + 1 });
        }
        // Ensure we have exact pieces for at least one solution? 
        // Actually, let's just give a fixed set of usable blocks: 1, 2, 3, 4, 5
        // And infinite copies of them? Or a specific set?
        // Let's go with "Infinite Supply" of 1, 2, 3, 4 for simplicity and clarity.
        // User clicks a block type to add it.
    };

    const currentSum = filledBlocks.reduce((sum, block) => sum + block.value, 0);
    const remainingGap = targetGap - currentSum;

    const addBlock = (value) => {
        if (showSuccess) return;

        if (currentSum + value > targetGap) {
            setFeedback("Too long! The bridge broke. Try again.");
            playAudio('crash');
            shakeBridge();
            // Auto-reset after delay? Or let user reset.
            setTimeout(() => setFilledBlocks([]), 1000);
            return;
        }

        const newBlock = { id: Date.now(), value };
        const newFilled = [...filledBlocks, newBlock];
        setFilledBlocks(newFilled);

        const newSum = currentSum + value;
        if (newSum === targetGap) {
            handleSuccess();
        } else {
            setFeedback(`${targetGap - newSum} more to go...`);
            playAudio('place');
        }

        if (sessionId) onLogProgress('BridgeBuilder', 'PlaceBlock', true, 1);
    };

    const handleSuccess = () => {
        setFeedback("Perfect fit! The bridge is safe.");
        setShowSuccess(true);
        playAudio('success');

        setTimeout(() => {
            if (level < MAX_LEVEL) {
                setLevel(l => l + 1);
            } else {
                onComplete();
            }
        }, 2000);
    };

    const resetLevel = () => {
        setFilledBlocks([]);
        setFeedback("Try again!");
    };

    const playAudio = (type) => {
        console.log("Audio:", type);
        // Placeholder audio
    };

    const shakeBridge = () => {
        // Visual effect trigger handled via CSS class
    };

    return (
        <div className="flex flex-col items-center justify-between w-full h-full min-h-[600px] bg-gradient-to-b from-sky-300 to-sky-100 p-4 rounded-xl overflow-hidden relative">

            {/* Header */}
            <div className="w-full flex justify-between items-center p-4 bg-white/40 backdrop-blur-md rounded-2xl mb-8">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-sky-900">Level {level}</span>
                </div>
                <div className="text-2xl font-bold text-sky-800">
                    Target Gap: <span className="text-blue-600 text-3xl">{targetGap}</span>
                </div>
                <button onClick={resetLevel} className="p-2 bg-white rounded-full hover:bg-gray-100 shadow-sm">
                    <RotateCcw className="w-6 h-6 text-gray-600" />
                </button>
            </div>

            {/* Game Scene */}
            <div className="relative w-full flex-1 flex flex-col items-center justify-center">

                {/* Sky/Clouds Decoration */}
                <div className="absolute top-10 left-10 text-white/60 animate-pulse">☁️</div>
                <div className="absolute top-20 right-20 text-white/60 animate-pulse delay-700">☁️</div>

                {/* The Bridge Construction Site */}
                <div className="relative w-full max-w-2xl h-48 flex items-end mb-20">

                    {/* Left Bank */}
                    <div className="w-1/4 h-full bg-stone-700 rounded-l-lg flex items-center justify-center border-t-8 border-green-800 relative z-10">
                        <span className="text-4xl">🌲</span>
                    </div>

                    {/* The Gap / Water */}
                    <div className="flex-1 h-32 relative bg-blue-500/30 flex items-center justify-center border-b-4 border-blue-400">
                        {/* Water Animation */}
                        <div className="absolute bottom-2 text-2xl animate-bounce">🌊</div>

                        {/* Visualizing the Grid for the Bridge */}
                        <div className="absolute top-0 left-0 w-full h-4 bg-black/10 flex">
                            {Array.from({ length: targetGap }).map((_, i) => (
                                <div key={i} className="flex-1 border-r border-white/20 h-full"></div>
                            ))}
                        </div>

                        {/* Placed Blocks (The Bridge) */}
                        <div className="absolute top-[-40px] left-0 w-full flex transition-all duration-300">
                            {filledBlocks.map((block, idx) => (
                                <div
                                    key={block.id}
                                    className="h-10 bg-amber-600 border-2 border-amber-800 rounded-md flex items-center justify-center text-white font-bold shadow-lg animate-in fade-in slide-in-from-top-4"
                                    style={{
                                        width: `${(block.value / targetGap) * 100}%`,
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {block.value}
                                </div>
                            ))}
                            {/* Ghost/Target Outline */}
                            {remainingGap > 0 && (
                                <div
                                    className="h-10 border-2 border-dashed border-gray-400 bg-white/20 flex items-center justify-center text-gray-500 font-medium"
                                    style={{ width: `${(remainingGap / targetGap) * 100}%` }}
                                >
                                    {remainingGap} needed
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Bank */}
                    <div className="w-1/4 h-full bg-stone-700 rounded-r-lg flex items-center justify-center border-t-8 border-green-800 relative z-10">
                        {showSuccess && <span className="text-4xl animate-bounce">🚗</span>}
                        {!showSuccess && <span className="text-4xl text-gray-400">🏁</span>}
                    </div>
                </div>

                {/* Feedback Text */}
                <div className="mb-8 text-2xl font-bold text-sky-800 bg-white/60 px-6 py-2 rounded-full">
                    {feedback}
                </div>

            </div>

            {/* Control Panel: Block Palette */}
            <div className="w-full bg-white p-6 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
                <p className="text-center text-gray-500 mb-4 font-medium uppercase tracking-wider text-sm">Tap blocks to add to bridge</p>
                <div className="flex justify-center gap-4">
                    {[1, 2, 3, 4].map(val => (
                        <button
                            key={val}
                            onClick={() => addBlock(val)}
                            className="
                        group relative
                        w-20 h-20 
                        bg-amber-500 hover:bg-amber-400 active:scale-95
                        border-b-4 border-amber-700 active:border-b-0 active:translate-y-1
                        rounded-xl
                        flex flex-col items-center justify-center
                        transition-all
                    "
                        >
                            <span className="text-3xl font-black text-amber-900">{val}</span>
                            <div className="flex gap-1 mt-1">
                                {Array.from({ length: val }).map((_, i) => (
                                    <div key={i} className="w-2 h-2 bg-amber-800 rounded-full"></div>
                                ))}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
};
