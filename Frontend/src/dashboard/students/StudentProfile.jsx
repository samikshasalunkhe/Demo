import React from "react";

const StudentProfile = () => {
  const student = {
    userId: "UID202507",
    name: "Srushti Bhagwan Pingale",
    gender: "Female",
    email: "srushti@example.com",
    rollNo: "STU2025002",
    course: "B.Sc Computer Science",
    semester: "6th Semester",
    year: "Third Year",
    department: "Computer Science",
    batch: "2022-2025",
    phone: "9876543210",
    dob: "2003-08-20",
    address: "Pune, Maharashtra",
    profilePic: "", // Leave this blank to test default
  };

  // Default profile image
  const defaultPic = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-[#1e1b4b] to-gray-900 text-white flex justify-center items-center py-10 px-4">
      <div className="backdrop-blur-lg bg-white/30 border border-white/40 shadow-xl rounded-2xl max-w-4xl w-full px-8 py-10 text-gray-900">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <img
            src={student.profilePic || defaultPic}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
          />
          <h2 className="text-3xl font-semibold mt-4">{student.name}</h2>
          <p className="text-gray-600">{student.email}</p>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ProfileField label="User ID" value={student.userId} />
          <ProfileField label="Roll Number" value={student.rollNo} />
          <ProfileField label="Gender" value={student.gender} />
          <ProfileField label="Phone" value={student.phone} />
          <ProfileField label="Course" value={student.course} />
          <ProfileField label="Semester" value={student.semester} />
          <ProfileField label="Year" value={student.year} />
          <ProfileField label="Department" value={student.department} />
          <ProfileField label="Batch" value={student.batch} />
          <ProfileField label="Date of Birth" value={student.dob} />
          <ProfileField label="Address" value={student.address} />
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-medium text-gray-800">{value}</p>
  </div>
);

export default StudentProfile;