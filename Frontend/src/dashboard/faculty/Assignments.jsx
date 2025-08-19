// import React, { useState } from "react";
// import { PlusCircle, Trash2, PencilLine, FileText } from "lucide-react";

// const Assignments = () => {
//   const [assignments, setAssignments] = useState([
//     {
//       id: 1,
//       title: "Math Assignment 1",
//       description: "Complete exercises 1 to 10",
//       dueDate: "2025-07-31",
//     },
//     {
//       id: 2,
//       title: "Science Lab Report",
//       description: "Submit chemistry lab report on acids",
//       dueDate: "2025-08-02",
//     },
//   ]);

//   const [newAssignment, setNewAssignment] = useState({
//     title: "",
//     description: "",
//     dueDate: "",
//   });

//   const handleAddAssignment = (e) => {
//     e.preventDefault();
//     if (!newAssignment.title || !newAssignment.description || !newAssignment.dueDate) return;

//     setAssignments([
//       ...assignments,
//       { ...newAssignment, id: assignments.length + 1 },
//     ]);
//     setNewAssignment({ title: "", description: "", dueDate: "" });
//   };

//   const handleDelete = (id) => {
//     const updated = assignments.filter((a) => a.id !== id);
//     setAssignments(updated);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-[#1e1b4b] to-gray-900 p-6 text-white">
//       <div className="flex items-center gap-2 mb-6">
//         <FileText className="text-yellow-400" />
//         <h2 className="text-3xl font-bold text-yellow-300">Assignments</h2>
//       </div>

//       {/* Add Assignment Form */}
//       <form
//         onSubmit={handleAddAssignment}
//         className="bg-[#1f2937] rounded-xl p-4 mb-6 shadow-md space-y-4 max-w-xl"
//       >
//         <div>
//           <label className="text-sm text-gray-300">Title</label>
//           <input
//             type="text"
//             placeholder="Enter assignment title"
//             className="w-full p-2 rounded bg-gray-800 text-white"
//             value={newAssignment.title}
//             onChange={(e) =>
//               setNewAssignment({ ...newAssignment, title: e.target.value })
//             }
//           />
//         </div>
//         <div>
//           <label className="text-sm text-gray-300">Description</label>
//           <textarea
//             placeholder="Enter description"
//             className="w-full p-2 rounded bg-gray-800 text-white"
//             value={newAssignment.description}
//             onChange={(e) =>
//               setNewAssignment({
//                 ...newAssignment,
//                 description: e.target.value,
//               })
//             }
//           />
//         </div>
//         <div>
//           <label className="text-sm text-gray-300">Due Date</label>
//           <input
//             type="date"
//             className="w-full p-2 rounded bg-gray-800 text-white"
//             value={newAssignment.dueDate}
//             onChange={(e) =>
//               setNewAssignment({ ...newAssignment, dueDate: e.target.value })
//             }
//           />
//         </div>
//         <button
//           type="submit"
//           className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
//         >
//           <PlusCircle size={18} /> Add Assignment
//         </button>
//       </form>

//       {/* Assignment List */}
//       <div className="bg-[#1e293b] p-4 rounded-xl shadow-lg max-w-3xl space-y-4">
//         {assignments.map((a) => (
//           <div
//             key={a.id}
//             className="border-b border-gray-600 pb-3 flex justify-between items-start"
//           >
//             <div>
//               <h3 className="text-lg font-semibold text-indigo-300">
//                 {a.title}
//               </h3>
//               <p className="text-sm text-gray-300">{a.description}</p>
//               <p className="text-sm text-yellow-400 mt-1">
//                 Due: {a.dueDate}
//               </p>
//             </div>
//             <div className="flex gap-3">
//               <button className="text-blue-400 hover:text-blue-300">
//                 <PencilLine size={18} />
//               </button>
//               <button
//                 onClick={() => handleDelete(a.id)}
//                 className="text-red-400 hover:text-red-300"
//               >
//                 <Trash2 size={18} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Assignments;




import React, { useState, useEffect } from "react";
import FacultyAssignmentForm from "../../components/FacultyAssignmentForm";
import axios from "axios";

const FacultyAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const faculty = JSON.parse(localStorage.getItem("user"));

 const fetchAssignments = async () => {
  try {
    const res = await axios.get(`/api/assignments/faculty/${faculty._id}`);
    console.log(res.data); // Debug output
    setAssignments(res.data.assignments || []); // Use only the array
  } catch (err) {
    console.error("Error fetching faculty assignments:", err);
  }
};


  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Assignments</h2>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close Form" : "Add Assignment"}
      </button>

      {showForm && <FacultyAssignmentForm onSuccess={fetchAssignments} />}

      <div>
        {assignments.length === 0 ? (
          <p>No assignments found.</p>
        ) : (
          assignments.map((a) => (
            <div key={a._id} className="border p-3 mb-3 rounded shadow">
              <h3 className="font-semibold">{a.title}</h3>
              <p>{a.description}</p>
              <p>
                <strong>Subject:</strong> {a.subject}
              </p>
              {a.fileUrl && (
                <a
                  href={a.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View File
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FacultyAssignments;