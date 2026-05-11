"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { signupSchema, loginSchema, validateField, validateForm } from "@/lib/validation";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    college: "",
    gender: "",
    photoUrl: ""
  });
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    // Validate form
    const schema = isLogin ? loginSchema : signupSchema;
    const validation = validateForm(schema, formData);

    if (!validation.success) {
      setFieldErrors(validation.errors);
      return;
    }

    setLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token);
        onClose();
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Real-time validation
    const schema = isLogin ? loginSchema : signupSchema;
    const fieldError = validateField(schema, name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        setFormData(prev => ({ ...prev, photoUrl: data.url }));
        setPreviewUrl(data.url);
      } else {
        setError(data.error || 'Failed to upload photo');
      }
    } catch (error) {
      setError('Error uploading photo');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFieldErrors({});
    setFormData({
      email: "",
      password: "",
      name: "",
      phone: "",
      college: "",
      gender: "",
      photoUrl: ""
    });
    setPreviewUrl("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
          <h2 className="text-2xl font-bold">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h2>
          <p className="text-white/80 mt-1">
            {isLogin
              ? "Login to access your profile"
              : "Join ARGminds to explore higher education"}
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                      fieldErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                    }`}
                    placeholder="John Doe"
                  />
                  {fieldErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={handleChange}
                        className="mr-2"
                        required
                      />
                      <span>Male</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleChange}
                        className="mr-2"
                        required
                      />
                      <span>Female</span>
                    </label>
                  </div>
                  {fieldErrors.gender && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.gender}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Profile Photo (Optional)
                  </label>
                  <div className="flex items-center gap-4">
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      disabled={uploadingPhoto}
                      className="flex-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                  </div>
                  {uploadingPhoto && (
                    <p className="text-indigo-600 text-sm mt-1">Uploading photo...</p>
                  )}
                  {!previewUrl && !formData.photoUrl && (
                    <p className="text-gray-400 text-xs mt-1">Default avatar will be used based on gender</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                      fieldErrors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                    }`}
                    placeholder="+91 98765 43210"
                  />
                  {fieldErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.phone}</p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">Format: +91 98765 43210 or 9876543210</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    College/University
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                      fieldErrors.college ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                    }`}
                    placeholder="e.g., IIT Delhi"
                  />
                  {fieldErrors.college && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.college}</p>
                  )}
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                  fieldErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                }`}
                placeholder="john@example.com"
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                  fieldErrors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                }`}
                placeholder="••••••••"
              />
              {fieldErrors.password && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
              )}
              {!isLogin && (
                <p className="text-gray-400 text-xs mt-1">Minimum 6 characters</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={switchMode}
                className="text-indigo-600 font-semibold hover:underline cursor-pointer"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
