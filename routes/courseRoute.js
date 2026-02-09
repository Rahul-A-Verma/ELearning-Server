import { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import { 
    checkout, 
    fetchLecture, 
    fetchLectures, 
    getAllCourses, 
    getMyCourses, 
    getSingleCourse, 
    paymentVerification 
} from "../controller/courseController.js";

const router = Router();

router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", isAuth, fetchLectures);
router.get("/lecture/:id", isAuth, fetchLecture);
router.get("/mycourse", isAuth, getMyCourses);
router.post("/course/checkout/:id", isAuth, checkout);
router.post("/verification/:id", isAuth, paymentVerification);

export default router;