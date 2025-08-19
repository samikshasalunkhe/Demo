// import React from "react";
// import { Outlet } from "react-router-dom";
// import FacultySidebar from "./FacultySidebar";

// const Faculty = () => {
//   return (
//     <div style={{ display: "flex" }}>
//       <FacultySidebar />
//       <div style={{ flex: 1, marginLeft: "8px" }}>
//         <Outlet /> {/* This is where nested route (like /dashboard) will render */}
//       </div>
//     </div>
//   );
// };

// export default Faculty;


// Faculty.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import FacultySidebar from '../../components/FacultySidebar.jsx'

const Faculty = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <FacultySidebar />

      {/* Main content */}
      <div className="flex-1 p-4">
        <Outlet /> {/* ✅ हे आवश्यक आहे nested route साठी */}
      </div>
    </div>
  );
};

export default Faculty;
