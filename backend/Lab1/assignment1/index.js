import fs from 'fs';
const userdata = [];

function createFile(next) {
    fs.writeFile('data.json', JSON.stringify(userdata), (err) => {
        console.log("file is created");
        if (next) next();
    });
}

function read (next){
    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.log("error in reading file");
        } else {
            userdata.push(...JSON.parse(data));
            console.log(userdata);    
        }
        if (next) next();
    });

}


const newUserData ={
    name: "Deepak",
    age: 30,
    
}

function  update (next) {
    userdata.push(newUserData);
    fs.writeFile('data.json', JSON.stringify(userdata), (err) => {
        if (err) {
            console.log("error in updating file");

        } else {
            console.log("file is updated");
        }
        if (next) next();
    });

}


function delete1 (next) {
    fs.unlink('data.json', (err) => {
        if (err) {
            console.log("error in deleting file");
        } else {
            console.log("file is deleted");
        }
        if (next) next();
    });
}

// Run create -> read -> update in sequence so each step
// finishes writing/reading data.json before the next one starts.
createFile(() => {
    read(() => {
        update(() => {
            // delete1();
        });
    });
});




