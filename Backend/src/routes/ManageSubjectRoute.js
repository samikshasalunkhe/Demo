// // import express from 'express';
// // import { createSubject, getAllSubjects, updateSubject, deleteSubject } from '../controller/ManageSubjectController.js';

// // const manageSubjectRouter = express.Router();

// // // create subjects router
// // manageSubjectRouter.post('/create-subject', createSubject);
// // // get all subjects router
// // manageSubjectRouter.get('/get-getallsubject', getAllSubjects); 
// // //update subject router
// // manageSubjectRouter.put('/update-subject', updateSubject);
// // //delete subject router
// // manageSubjectRouter.delete('/delete-subject', deleteSubject);

// // export default manageSubjectRouter;
// import express from 'express';
// import {
//   createSubject,
//   getAllSubjects,
//   updateSubject,
//   deleteSubject
// } from '../controller/ManageSubjectController.js';

// const manageSubjectRouter = express.Router();

// // ✅ Create subject
// manageSubjectRouter.post('/create-subject', createSubject);

// // ✅ Get all subjects
// manageSubjectRouter.get('/getall-subjects', getAllSubjects);

// // ✅ Update subject by ID (Send ID in params)
// manageSubjectRouter.put('/update-subject/:id', updateSubject);

// // ✅ Delete subject by ID (Send ID in params)
// manageSubjectRouter.delete('/delete-subject/:id', deleteSubject);

// export default manageSubjectRouter;
import express from 'express';
import {
  createSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject
} from '../controller/ManageSubjectController.js';
import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware.js';

const manageSubjectRouter = express.Router();

// ✅ Get all subjects - कोणताही logged-in user
manageSubjectRouter.get('/getall-subjects', isAuthenticated, getAllSubjects);

// ✅ Create subject - फक्त admin
manageSubjectRouter.post('/create-subject', isAuthenticated, isAdmin, createSubject);

// ✅ Update subject by ID - फक्त admin
manageSubjectRouter.put('/update-subject/:id', isAuthenticated, isAdmin, updateSubject);

// ✅ Delete subject by ID - फक्त admin
manageSubjectRouter.delete('/delete-subject/:id', isAuthenticated, isAdmin, deleteSubject);

export default manageSubjectRouter;
