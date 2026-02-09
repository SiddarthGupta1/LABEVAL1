import React from 'react';
import { Package, CheckCircle, Globe } from 'lucide-react';

export function ProductDescriptionScreen() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
                {/* Header */}
                <div className="bg-indigo-600 p-8 text-white text-center">
                    <Package className="w-16 h-16 mx-auto mb-4" />
                    <h1 className="text-4xl font-bold mb-2">Gesture Learning Platform</h1>
                    <p className="text-xl opacity-90">Interactive Learning for Special Needs</p>
                </div>

                <div className="p-8 md:p-12">
                    {/* Description Section */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Globe className="w-6 h-6 text-indigo-600" />
                            Product Overview
                        </h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                            <p>
                                This activity is an interactive, webcam-based learning experience designed specifically for autistic children. The child performs simple hand gestures such as counting with fingers, waving, raising a hand, and a two-hand greeting in front of the camera. The application uses MediaPipe-based hand tracking to detect these gestures and provides immediate, clear visual feedback through large, colorful targets, a status indicator, and a celebratory screen to reinforce successful attempts.
                            </p>
                            <p>
                                The activity emphasizes predictable, low-stress interactions, repetition, and positive reinforcement. The sensory-friendly interface is designed to build confidence, support learning, and encourage the development of basic social skills in a comfortable environment.
                            </p>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <CheckCircle className="w-6 h-6 text-emerald-600" />
                            Key Features
                        </h3>
                        <ul className="grid grid-cols-1 gap-4">
                            <li className="bg-indigo-50 p-4 rounded-xl flex items-start gap-4">
                                <div className="mt-1">
                                    <CheckCircle className="w-6 h-6 text-indigo-600" />
                                </div>
                                <span className="text-gray-700 font-medium">
                                    Provides a predictable and structured learning environment that reduces sensory overload and anxiety.
                                </span>
                            </li>
                            <li className="bg-purple-50 p-4 rounded-xl flex items-start gap-4">
                                <div className="mt-1">
                                    <CheckCircle className="w-6 h-6 text-purple-600" />
                                </div>
                                <span className="text-gray-700 font-medium">
                                    Uses clear visual cues, large text, and colourful, high-contrast UI elements to improve focus and comprehension.
                                </span>
                            </li>
                            <li className="bg-pink-50 p-4 rounded-xl flex items-start gap-4">
                                <div className="mt-1">
                                    <CheckCircle className="w-6 h-6 text-pink-600" />
                                </div>
                                <span className="text-gray-700 font-medium">
                                    Offers immediate positive feedback through visual celebrations to reinforce learning and motivation.
                                </span>
                            </li>
                            <li className="bg-blue-50 p-4 rounded-xl flex items-start gap-4">
                                <div className="mt-1">
                                    <CheckCircle className="w-6 h-6 text-blue-600" />
                                </div>
                                <span className="text-gray-700 font-medium">
                                    Supports gradual skill-building (such as counting and social gestures) with local session and progress tracking, ensuring privacy and offline usability.
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
