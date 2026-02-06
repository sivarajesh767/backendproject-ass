require("dotenv").config();
const express=require("express");
const cors=require("cors");
const helmet=require("helmet");
const connectDB=require("./config/db");
const authRoutes=require("./routes/authRoutes");
const taskRoutes=require("./routes/taskRoutes");
const app=expess();
connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.listen(process.env.PORT,()=>{
    console.log(Server running on port ${process.env.PORT});

});