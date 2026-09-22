import fs from "node:fs/promises";

const filepath = "userdata.txt";

async function createfile(content){
    try{
        await fs.writeFile(filepath, content, "utf8");
        console.log("file created successfully! ");
    } 
    catch (err){
        console.error(err);
    }
}

async function readfile(){
    try{
        const data = await fs.readFile(filepath, "utf8");
        console.log ("file content:\n",data);
        return data;
    } catch (err) {
        console.error(err);
    }
}

async function main(){
    await createfile("Hello from Lab1 filedemo!");
    await readfile();
}

main();
