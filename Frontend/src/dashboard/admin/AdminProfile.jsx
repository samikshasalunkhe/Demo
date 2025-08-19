import React, { useState, useEffect } from "react";
import { createAdminProfile, getAdminProfile, updateAdminProfile } from "../../services/AdminProfileApi";

const AdminProfile = () => {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    college: "",
    role: ""
  });

  const [editMode, setEditMode] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
  
  const fetchProfile = async () => {
    try {
      const data = await getAdminProfile();
      setAdminData(data);  // data मध्ये _id येईल
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };
  fetchProfile();
}, []);


  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
  try {
    await updateAdminProfile(adminData);  // आता id सह data जाईल
    setEditMode(false);
    setSuccessMsg("Profile updated successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  } catch (err) {
    console.error("Error updating profile:", err);
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-[#020020] px-4">
      <div className="bg-white p-10 rounded-xl w-full max-w-2xl shadow-lg">
        {/* Edit Button */}
        <div className="flex justify-end mb-4">
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
            >
              Edit
            </button>
          )}
        </div>

        {/* Success Message */}
        {successMsg && (
          <div className="text-green-600 font-semibold mb-4 text-center">
            {successMsg}
          </div>
        )}

        {/* Input Fields */}
        <div className="mt-6 space-y-4">
          {["name", "email", "college", "role"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-black capitalize">
                {field}
              </label>
              <input
                type="text"
                name={field}
                value={adminData[field] || ""}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              />
            </div>
          ))}
        </div>

        {/* Save/Cancel Buttons */}
        {editMode && (
          <div className="flex justify-end mt-6 space-x-3">
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
