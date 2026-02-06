const express=reuire('express');
const verifyToken=require("../middleware/authMiddleware");
const {createTask, getAllTasks, updateTask, deleteTask}=require("../controllers/taskController");

const router=express.Router();
router.use(verifyToken);
router.post("/",createTask);
router.get("/", getAllTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports=router;