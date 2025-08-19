import React from "react";
import ManageClassFaculty from "../faculty/ManageClassFaculty";
const ManageclassAdmin = () => {
  return <ManageClassFaculty isEditable={false} />; // ❌ Admin and Student CANNOT edit
};

export default ManageclassAdmin;