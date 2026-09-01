import fs from "node:fs/promises";

const filepath = "userdata.txt";

async function createfile(content){
    try{
        await fs.writefile(filepath, content, "utf8");
        console.log("file created successfully! ");
    } 
    catch (err){
        console.error
    }
}

async function readfile(){
    try{
        const data = await fs.readfile(filepath, "utf8");
        console.log ("file content:\n",data);
        return data;
    } catch 
}