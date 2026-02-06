const Task=require("../models/Task");
const {taskSchema}=require("../utils/validate");
exports.createTask=async(req, res)=>{
    const {error}= taskSchema.validate(req.body);
    if (error) return res.status(400).json({message:error.message});
    
    const task=await Task.create({...req.body, createBy:req.user.id});
    res.json(task);
};
exports.getAllTasks=async(req, res)=>{
    const tasks=await Task.find();
    res.json(tasks);
};
exports.updateTask=async(req, res)=>{
    const task=await Task.findBtId(req.params.id);

    if(!task) return res.status(404).json({message:"Task not found"});

    if (task.createdBy.toString()!==req.user.id && req.user.role!=="admin"){
        return res.status(403).json({message:"Not allowed"});
    }
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
};
exports.deleteTask=async (req,res)=>{
    const task=await Task.findById(req.params.id);
    if(!task)return res.status(404).json({message:"Task not found"});
    if (task.createdBy.toString()!==req.user.id&&req.user.role!=="admin"){
        return res.status(403).json({message:"Not allowed"});
    }
    await task.deleteOne();
    res.json({message:"Task deleted"});
};