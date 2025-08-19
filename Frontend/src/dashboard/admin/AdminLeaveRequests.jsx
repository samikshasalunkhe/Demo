// import React, { useEffect, useState } from "react";
// import LeaveRequestTable from "../../components/LeaveRequestTable";

// const AdminLeaveRequests = () => {
//   const [requests, setRequests] = useState([]);

//   // 📌 Fetch all faculty leave requests (for Admin)
//   const fetchLeaves = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/v1/leave/admin", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const data = await res.json();
//       if (data.success) {
//         setRequests(data.data); // backend sends {success:true, data:[...]}
//       }
//     } catch (err) {
//       console.error("Error fetching admin leaves:", err);
//     }
//   };

//   useEffect(() => {
//     fetchLeaves();
//   }, []);

//   // 📌 Handle status change
//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/v1/leave/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         // update in UI also
//         setRequests((prev) =>
//           prev.map((req) =>
//             req._id === id ? { ...req, status: newStatus } : req
//           )
//         );
//       }
//     } catch (err) {
//       console.error("Error updating status:", err);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Admin Leave Requests</h2>
//       <LeaveRequestTable
//         requests={requests}          // ✅ correct prop name
//         onStatusChange={handleStatusChange}
//         isAdmin={true}               // ✅ tells table to show dropdown
//       />
//     </div>
//   );
// };

// export default AdminLeaveRequests;



import React, { useEffect, useState } from "react";
import LeaveRequestTable from "../../components/LeaveRequestTable";

const AdminLeaveRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📌 Fetch all faculty leave requests (for Admin)
  const fetchLeaves = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/leave/admin/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setRequests(data.data); // backend sends {success:true, data:[...]}
      } else {
        console.error("Failed to fetch leaves:", data.message);
      }
    } catch (err) {
      console.error("Error fetching admin leaves:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // 📌 Handle status change (Admin updates)
const handleStatusChange = async (id, newStatus) => {
  try {
    const res = await fetch(`http://localhost:5000/api/v1/leave/admin/status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const data = await res.json();
    if (data.success) {
      // ✅ Backend परत updated leave पाठवतो
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: data.leave.status } : req
        )
      );
    } else {
      console.error("Failed to update status:", data.message);
    }
  } catch (err) {
    console.error("Error updating status:", err);
  }
};

  if (loading) return <p className="p-4">Loading leave requests...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Leave Requests</h2>
      <LeaveRequestTable
        requests={requests}
        onStatusChange={handleStatusChange}
        isAdmin={true}
      />
    </div>
  );
};

export default AdminLeaveRequests;
