// import React, { useEffect, useState } from 'react';
// import { createStudent, getStudents, updateStudent, deleteStudent } from '../../services/ManageStudentApi';
// import StudentForm from '../../components/ManageStudentForm';
// import { Pencil, Trash2, GraduationCap } from 'lucide-react';

// const ManageStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const [selectedDepartment, setSelectedDepartment] = useState("All");
//   const [selectedClass, setSelectedClass] = useState("All"); // ✅ Class filter state

//   const fetchStudents = async () => {
//     try {
//       const res = await getStudents();
//       setStudents(Array.isArray(res.data.students) ? res.data.students : []);
//     } catch (error) {
//       console.error("Failed to fetch students", error);
//       setStudents([]);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const handleAdd = async (data) => {
//     try {
//       await createStudent(data);
//       setShowForm(false);
//       fetchStudents();
//     } catch (error) {
//       console.error("Error while creating student:", error.response?.data || error.message);
//     }
//   };

//   const handleEdit = async (data) => {
//     try {
//       await updateStudent(editData._id, data);
//       setEditData(null);
//       setShowForm(false);
//       fetchStudents();
//     } catch (error) {
//       console.error("Error while updating student:", error.response?.data || error.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteStudent(id);
//       fetchStudents();
//     } catch (error) {
//       console.error("Error while deleting student:", error.response?.data || error.message);
//     }
//   };

//   const filteredStudents = students.filter(std => {
//     const matchesDepartment = selectedDepartment === "All" || std.department === selectedDepartment;
//     const matchesClass = selectedClass === "All" || std.className === selectedClass;
//     return matchesDepartment && matchesClass;
//   });

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
//         <GraduationCap className="w-6 h-6 text-violet-600" />
//         Manage Students
//       </h2>

//       <div className="flex justify-between items-center mb-4 flex-row-reverse">
//         <button
//           onClick={() => { setEditData(null); setShowForm(true); }}
//           className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
//         >
//           Add Student
//         </button>

//         <div className="flex items-center">
//           <label className="mr-2 font-medium text-sm">Select Department:</label>
//           <select
//             value={selectedDepartment}
//             onChange={(e) => setSelectedDepartment(e.target.value)}
//             className="border border-gray-300 rounded-md p-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
//           >
//             <option value="All">All</option>
//             <option value="Computer">Computer</option>
//             <option value="IT">IT</option>
//             <option value="ENTC">ENTC</option>
//             <option value="Mechanical">Mechanical</option>
//             <option value="Civil">Civil</option>
//             <option value="Auto Mobile">Auto Mobile</option>
//             <option value="Electrical">Electrical</option>
//           </select>
//         </div>
//       </div>

//       {/* ✅ Class Filter Buttons (above table) */}
//       <div className="flex gap-3 mb-4">
//         <span className="font-medium text-sm mt-1">Select Class:</span>
//         {["All", "FY", "SY", "TY"].map((cls) => (
//           <button
//             key={cls}
//             onClick={() => setSelectedClass(cls)}
//             className={`py-1 px-3 rounded-full text-sm border transition duration-200
//               ${selectedClass === cls ? "bg-violet-600 text-white" : "bg-white text-gray-700 border-gray-300"}
//             `}
//           >
//             {cls}
//           </button>
//         ))}
//       </div>

//       {showForm && (
//         <div className="mb-6">
//           <StudentForm
//             initialData={editData || {}}
//             onSubmit={editData ? handleEdit : handleAdd}
//             onCancel={() => setShowForm(false)}
//           />
//         </div>
//       )}

//       <div className="overflow-auto">
//         <table className="min-w-full border border-gray-300 text-sm">
//           <thead className="bg-gray-100 text-black">
//             <tr>
//               <th className="p-2 border">Name</th>
//               <th className="p-2 border">Roll No</th>
//               <th className="p-2 border">Course</th>
//               <th className="p-2 border">Semester</th>
//               <th className="p-2 border">Department</th>
//               <th className="p-2 border">Class</th>
//               <th className="p-2 border">Batch</th>
//               <th className="p-2 border">Phone</th>
//               <th className="p-2 border">DOB</th>
//               <th className="p-2 border">Gender</th>
//               <th className="p-2 border">Address</th>
//               <th className="p-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStudents.map(std => (
//               <tr key={std._id} className="text-center">
//                 <td className="p-2 border">{std.name}</td>
//                 <td className="p-2 border">{std. enrollmentNo}</td>
//                 <td className="p-2 border">{std.course}</td>
//                 <td className="p-2 border">{std.semester}</td>
//                 <td className="p-2 border">{std.department}</td>
//                 <td className="p-2 border">{std.className}</td>
//                 <td className="p-2 border">{std.batch}</td>
//                 <td className="p-2 border">{std.phone}</td>
//                 <td className="p-2 border">{std.dob}</td>
//                 <td className="p-2 border">{std.gender}</td>
//                 <td className="p-2 border">{std.address}</td>
//                 <td className="p-2 border space-x-2">
//                   <button
//                     onClick={() => { setEditData(std); setShowForm(true); }}
//                     className="text-blue-600 hover:text-blue-800"
//                     title="Edit"
//                   >
//                     <Pencil className="w-4 h-4" />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(std._id)}
//                     className="text-red-600 hover:text-red-800"
//                     title="Delete"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageStudents;
import React, { useEffect, useState } from 'react';
import { createStudent, getStudents, updateStudent, deleteStudent } from '../../services/ManageStudentApi';
import StudentForm from '../../components/ManageStudentForm';
import { Pencil, Trash2, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // ✅ import useAuth

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedClass, setSelectedClass] = useState("All");

  const { user } = useAuth(); // ✅ get current user
  const isAdmin = user?.role === 'admin'; // ✅ check if user is admin

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(Array.isArray(res.data.students) ? res.data.students : []);
    } catch (error) {
      console.error("Failed to fetch students", error);
      setStudents([]);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAdd = async (data) => {
    try {
      await createStudent(data);
      setShowForm(false);
      fetchStudents();
    } catch (error) {
      console.error("Error while creating student:", error.response?.data || error.message);
    }
  };

  const handleEdit = async (data) => {
    try {
      await updateStudent(editData._id, data);
      setEditData(null);
      setShowForm(false);
      fetchStudents();
    } catch (error) {
      console.error("Error while updating student:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (error) {
      console.error("Error while deleting student:", error.response?.data || error.message);
    }
  };

  const filteredStudents = students.filter(std => {
    const matchesDepartment = selectedDepartment === "All" || std.department === selectedDepartment;
    const matchesClass = selectedClass === "All" || std.className === selectedClass;
    return matchesDepartment && matchesClass;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <GraduationCap className="w-6 h-6 text-violet-600" />
        Manage Students
      </h2>

      <div className="flex justify-between items-center mb-4 flex-row-reverse">
        {isAdmin && (
          <button
            onClick={() => { setEditData(null); setShowForm(true); }}
            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            Add Student
          </button>
        )}

        <div className="flex items-center">
          <label className="mr-2 font-medium text-sm">Select Department:</label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="All">All</option>
            <option value="Computer">Computer</option>
            <option value="IT">IT</option>
            <option value="ENTC">ENTC</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="Auto Mobile">Auto Mobile</option>
            <option value="Electrical">Electrical</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <span className="font-medium text-sm mt-1">Select Class:</span>
        {["All", "FY", "SY", "TY"].map((cls) => (
          <button
            key={cls}
            onClick={() => setSelectedClass(cls)}
            className={`py-1 px-3 rounded-full text-sm border transition duration-200
              ${selectedClass === cls ? "bg-violet-600 text-white" : "bg-white text-gray-700 border-gray-300"}`}
          >
            {cls}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="mb-6">
          <StudentForm
            initialData={editData || {}}
            onSubmit={editData ? handleEdit : handleAdd}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="overflow-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Roll No</th>
              <th className="p-2 border">Course</th>
              <th className="p-2 border">Semester</th>
              <th className="p-2 border">Department</th>
              <th className="p-2 border">Class</th>
              <th className="p-2 border">Batch</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">DOB</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(std => (
              <tr key={std._id} className="text-center">
                <td className="p-2 border">{std.name}</td>
                <td className="p-2 border">{std.enrollmentNo}</td>
                <td className="p-2 border">{std.course}</td>
                <td className="p-2 border">{std.semester}</td>
                <td className="p-2 border">{std.department}</td>
                <td className="p-2 border">{std.className}</td>
                <td className="p-2 border">{std.batch}</td>
                <td className="p-2 border">{std.phone}</td>
                <td className="p-2 border">{std.dob}</td>
                <td className="p-2 border">{std.gender}</td>
                <td className="p-2 border">{std.address}</td>
                <td className="p-2 border space-x-2">
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => { setEditData(std); setShowForm(true); }}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(std._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudents;
