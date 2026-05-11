"use client";

import { useState, useEffect } from "react";
import { profileUpdateSchema, validateField, validateForm } from "@/lib/validation";
import { useAuth } from "@/context/AuthContext";

export default function Profile({ token, onLogout }) {
  const { updateUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    college: "",
    photoUrl: ""
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setFormData({
          name: data.user.name,
          phone: data.user.phone || "",
          college: data.user.college || "",
          photoUrl: data.user.photoUrl || ""
        });
      } else {
        setMessage({ type: "error", text: "Failed to load profile" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error loading profile" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setFieldErrors({});

    // Validate form
    const validation = validateForm(profileUpdateSchema, formData);

    if (!validation.success) {
      setFieldErrors(validation.errors);
      return;
    }

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        updateUser(data.user);
        setEditing(false);
        setMessage({ type: "success", text: "Profile updated successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to update profile" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error updating profile" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Real-time validation
    const fieldError = validateField(profileUpdateSchema, name, value);
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
        setMessage({ type: "error", text: data.error || 'Failed to upload photo' });
      }
    } catch (error) {
      setMessage({ type: "error", text: 'Error uploading photo' });
    } finally {
      setUploadingPhoto(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Failed to load profile</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                {user.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl">👤</span>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-white/80">{user.email}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition cursor-pointer"
              >
                Edit Profile
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Profile Photo
                </label>
                <div className="flex items-center gap-4">
                  {(previewUrl || formData.photoUrl) && (
                    <img
                      src={previewUrl || formData.photoUrl}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
                    />
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      disabled={uploadingPhoto}
                      className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {uploadingPhoto && (
                      <p className="text-indigo-600 text-sm mt-1">Uploading photo...</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                    fieldErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  required
                />
                {fieldErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
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
                  placeholder="+91 98765 43210"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                    fieldErrors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                  }`}
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
                  placeholder="e.g., IIT Delhi, Delhi University"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                    fieldErrors.college ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                />
                {fieldErrors.college && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.college}</p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition cursor-pointer"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      name: user.name,
                      phone: user.phone || "",
                      college: user.college || "",
                      photoUrl: user.photoUrl || ""
                    });
                    setPreviewUrl("");
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm text-gray-500">Full Name</label>
                  <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="text-lg font-semibold text-gray-800">{user.email}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm text-gray-500">Phone Number</label>
                  <p className="text-lg font-semibold text-gray-800">
                    {user.phone || "Not provided"}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm text-gray-500">College/University</label>
                  <p className="text-lg font-semibold text-gray-800">
                    {user.college || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
