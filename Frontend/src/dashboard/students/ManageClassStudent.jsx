import React from "react";
//import ManageClass from "../faculty/ManageClassFaculty";
import ManageClassFaculty from "../faculty/ManageClassFaculty";
const ManageclassStudent = () => {
 return <ManageClassFaculty isEditable={false} />; // ❌ Admin and Student CANNOT edit
};

export default ManageclassStudent;