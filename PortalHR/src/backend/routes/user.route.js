import express from "express";
import { login, logout, register, updateProfile,submitAssessment, getAssessment, getJobSeekerUsers,getCurrentUser,deductToken} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";

import { submitPayment, getSubscription } from "../controllers/employer.controller.js"
 
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
router.route("/assessment").get(isAuthenticated, getAssessment)
router.route("/assessment/submit").post(isAuthenticated, submitAssessment);
router.route("/getJobSeekerUsers").get(getJobSeekerUsers)
router.route("/getCurrentUser").get(isAuthenticated, getCurrentUser)
router.post("/payment", isAuthenticated, submitPayment)
router.get("/subscription", isAuthenticated, getSubscription)
router.post('/deductToken',isAuthenticated,deductToken)

export default router;

