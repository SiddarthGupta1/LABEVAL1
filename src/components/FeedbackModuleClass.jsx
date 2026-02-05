import React from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { logProgress } from '../lib/supabase.js';

// CLASS COMPONENT - Using ES6 class syntax extending React.Component
export class FeedbackModuleClass extends React.Component {
  constructor(props) {
    super(props);
    
    // State Management in Class Component
    this.state = {
      formData: {
        userName: '',
        email: '',
        moduleRating: '5',
        feedback: '',
        difficulty: 'medium',
        wouldRecommend: true
      },
      submitted: false,
      errors: {}
    };

    // Bind event handlers to this context
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  // Lifecycle Method - Runs when component is first rendered
  componentDidMount() {
    console.log('FeedbackModuleClass mounted');
  }

  // Lifecycle Method - Runs when component updates
  componentDidUpdate(prevProps, prevState) {
    if (this.state.submitted !== prevState.submitted && this.state.submitted) {
      console.log('Form submitted, will redirect in 2 seconds');
    }
  }

  // Lifecycle Method - Cleanup when component unmounts
  componentWillUnmount() {
    console.log('FeedbackModuleClass unmounting');
  }

  // Event Handler - Input change handler
  handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    
    // Update formData in state
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: type === 'checkbox' ? checked : value
      },
      // Clear error when user starts typing
      errors: {
        ...prevState.errors,
        [name]: ''
      }
    }));
  }

  // Validation Method
  validateForm() {
    const newErrors = {};
    const { formData } = this.state;

    if (!formData.userName.trim()) {
      newErrors.userName = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.feedback.trim()) {
      newErrors.feedback = 'Please share your feedback';
    }

    this.setState({ errors: newErrors });
    return Object.keys(newErrors).length === 0;
  }

  // Event Handler - Form submission
  handleSubmit = async (e) => {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    try {
      const { sessionId, onComplete } = this.props;
      
      // Log to Supabase
      if (sessionId) {
        await logProgress({
          session_id: sessionId,
          module: 'feedback-class',
          activity: 'form_submission',
          success: true,
          attempts: 1
        });
      }

      // Show success state
      this.setState({ submitted: true });

      // Reset form after 2 seconds
      setTimeout(() => {
        this.setState({
          formData: {
            userName: '',
            email: '',
            moduleRating: '5',
            feedback: '',
            difficulty: 'medium',
            wouldRecommend: true
          },
          submitted: false
        });
        if (onComplete) {
          onComplete('feedback-class');
        }
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  // Render method - Required in class components
  render() {
    const { onBack } = this.props;
    const { formData, submitted, errors } = this.state;

    if (submitted) {
      return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-green-100 to-teal-100 p-8">
          <div className="text-center">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Thank You!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Your feedback has been recorded successfully.
            </p>
            <p className="text-lg text-gray-500">
              Redirecting you back...
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center w-full min-h-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Go back"
        >
          ← Back
        </button>

        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-800 mb-3">
              Share Your Feedback
            </h1>
            <p className="text-xl text-gray-600">
              Help us improve by sharing your experience
            </p>
            <p className="text-sm text-purple-600 mt-2">
              (Class Component Example)
            </p>
          </div>

          {/* Form Component */}
          <form
            onSubmit={this.handleSubmit}
            className="bg-white rounded-3xl shadow-2xl p-8"
          >
            {/* Name Input Field */}
            <div className="mb-6">
              <label
                htmlFor="userName"
                className="block text-lg font-semibold text-gray-700 mb-2"
              >
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={this.handleInputChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
                  errors.userName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
              )}
            </div>

            {/* Email Input Field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-lg font-semibold text-gray-700 mb-2"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={this.handleInputChange}
                placeholder="your.email@example.com"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Rating Select */}
            <div className="mb-6">
              <label
                htmlFor="moduleRating"
                className="block text-lg font-semibold text-gray-700 mb-2"
              >
                How would you rate your experience?
              </label>
              <select
                id="moduleRating"
                name="moduleRating"
                value={formData.moduleRating}
                onChange={this.handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="1">⭐ Poor</option>
                <option value="2">⭐⭐ Fair</option>
                <option value="3">⭐⭐⭐ Good</option>
                <option value="4">⭐⭐⭐⭐ Very Good</option>
                <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
              </select>
            </div>

            {/* Difficulty Radio Buttons */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Difficulty Level
              </label>
              <div className="space-y-2">
                {['easy', 'medium', 'hard'].map(level => (
                  <label key={level} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="difficulty"
                      value={level}
                      checked={formData.difficulty === level}
                      onChange={this.handleInputChange}
                      className="w-4 h-4 mr-3 cursor-pointer"
                    />
                    <span className="text-gray-700 capitalize">
                      {level === 'easy' && '😊 Easy'}
                      {level === 'medium' && '😐 Medium'}
                      {level === 'hard' && '😤 Hard'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Checkbox - Would Recommend */}
            <div className="mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="wouldRecommend"
                  checked={formData.wouldRecommend}
                  onChange={this.handleInputChange}
                  className="w-5 h-5 mr-3 cursor-pointer rounded accent-purple-500"
                />
                <span className="text-gray-700 text-lg">
                  I would recommend this app to others
                </span>
              </label>
            </div>

            {/* Feedback Textarea */}
            <div className="mb-6">
              <label
                htmlFor="feedback"
                className="block text-lg font-semibold text-gray-700 mb-2"
              >
                Your Feedback <span className="text-red-500">*</span>
              </label>
              <textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={this.handleInputChange}
                placeholder="Share your thoughts, suggestions, or improvements..."
                rows="5"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none ${
                  errors.feedback ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.feedback && (
                <p className="text-red-500 text-sm mt-1">{errors.feedback}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-lg"
            >
              <Send className="w-5 h-5" />
              Submit Feedback
            </button>
          </form>

          {/* Information Box */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-700 text-center">
              <strong className="text-purple-600">This is a Class Component!</strong> It uses React.Component lifecycle methods and state management.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
