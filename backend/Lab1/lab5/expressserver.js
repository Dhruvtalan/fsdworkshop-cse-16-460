import express from "express";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
const port = process.env.PORT||3002;
const app = express();
const userData = [
    {
        id: 101,
        name:"dhruv",
        email:"dhruv@gmail.com",
    },
    {
        id: 102,
        name:"dhruv",
        email:"dhruv@gmail.com",
    },
    {
        id: 103,
        name:"dhruv",
        email:"dhruv@gmail.com",
    },
    {
        id: 104,
        name:"dhruv",
        email:"dhruv@gmail.com",
    }
];
app.get("/user", (req,res)=>{
    try{
        res.json(userData);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
