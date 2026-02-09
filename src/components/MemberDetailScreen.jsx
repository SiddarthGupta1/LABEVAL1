
import React from 'react';
import { User, Briefcase, Mail, MapPin, School } from 'lucide-react';

import profileImage from '../images/profile.jpg';

export function MemberDetailScreen() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 md:p-12">
            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Student/Member Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                    <div className="pt-20 pb-8 px-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Member Details</h2>
                        <div className="space-y-4 mt-6">
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Name</p>
                                <p className="text-xl font-medium text-gray-800">Siddarth Gupta</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Roll Number</p>
                                <p className="text-xl font-medium text-gray-800">CB.SC.U4CSE23747</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Stream</p>
                                <p className="text-xl font-medium text-gray-800">Computer Science & Engineering</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course & Faculty Details Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <School className="w-6 h-6" />
                            Course Details
                        </h2>
                    </div>
                    <div className="p-8 flex-1 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div>
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Course Code</p>
                                <p className="text-lg font-medium text-gray-800">23CSE399</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Course Name</p>
                                <p className="text-lg font-medium text-gray-800">Full Stack Frameworks</p>
                            </div>

                            <div className="border-t border-gray-100 pt-6 mt-2">
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 text-blue-600">Course Teacher</p>

                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <Briefcase className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-lg">Dr. T. Senthil Kumar</p>
                                        <p className="text-gray-600">Professor</p>
                                        <p className="text-gray-600 text-sm">Amrita School of Computing</p>
                                        <p className="text-gray-600 text-sm">Amrita Vishwa Vidyapeetham</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-gray-600 mb-2">
                                    <MapPin className="w-5 h-5 text-gray-400" />
                                    <span>Coimbatore - 641112</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <a href="mailto:t_senthilkumar@cb.amrita.edu" className="hover:text-emerald-600 transition-colors">t_senthilkumar@cb.amrita.edu</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project Details Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 lg:col-span-2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Briefcase className="w-6 h-6" />
                            Project Details
                        </h2>
                    </div>
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Product Name</p>
                                <p className="text-lg font-medium text-gray-800">Gesture Learning Platform</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">GitHub Repository</p>
                                <a href="https://github.com/SiddarthGupta1/LABEVAL1" className="text-lg font-medium text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-2">
                                    View Source Code
                                </a>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Academic Collaborator</p>
                                <p className="text-lg font-medium text-gray-800">Dr. T. Senthil Kumar</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Industry Collaborator</p>
                                <p className="text-lg font-medium text-gray-800">TBA</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
