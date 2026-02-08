import express from "express";
import { isAdmin, isAuth } from "../middleware/isAuth.js";
import { uploadFiles } from "../middleware/multer.js";
import { addLectures, createCourse, deleteCourse, deleteLecture, getAllStats, getAllUser, updateRole, } from "../controller/adminController.js";

const route = express.Router();

route.post("/course/new", isAuth, isAdmin, uploadFiles, createCourse);
route.post("/course/:id", isAuth, isAdmin, uploadFiles, addLectures);
route.delete("/course/:id", isAuth, isAdmin, deleteCourse);
route.delete("/lecture/:id", isAuth, isAdmin, deleteLecture);

route.get("/stats", isAuth, isAdmin, getAllStats);
route.put("/user/:id", isAuth, updateRole);
route.get("/users", isAuth, isAdmin, getAllUser);

export default route;
