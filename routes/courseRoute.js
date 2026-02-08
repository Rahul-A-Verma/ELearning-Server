import { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import { checkout, fetchLecture, fetchLectures, getAllCourses, getMyCourses, getSingleCourse, paymentVerification } from "../controller/courseController.js";

const route = Router();

route.get("/course/all", getAllCourses);
route.get("/course/:id", getSingleCourse);
route.get("/lectures/:id", isAuth, fetchLectures);
route.get("/lecture/:id", isAuth, fetchLecture);
route.get("/mycourse", isAuth, getMyCourses);
route.post("/course/checkout/:id", isAuth, checkout);
route.post("/verification/:id", isAuth, paymentVerification);
export default route;
