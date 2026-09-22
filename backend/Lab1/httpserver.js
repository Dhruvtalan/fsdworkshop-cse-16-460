import http from "http";

const userData = [
    {
        id: 1,
        name: "dt",
        email: "c.m@abes.ac.in"
    },
    {
        id: 2,
        name: "Rahul",
        email: "rahul@gmail.com"
    },
    {
        id: 3,
        name: "Aman",
        email: "aman@gmail.com"
    }
];

const SYSDATA = {
    message: "System information"
};

const server = http.createServer(async (req, res) => {

    const url = req.url;
    const method = req.method;

    if (url == "/msg" && method == "GET") {

        res.end("this is welcome message from the server");

    } else if (url == "/sys" && method == "GET") {

        res.end(JSON.stringify(SYSDATA));

    } else if (url == "/users/1" && method == "GET") {

        res.end("welcome Dhruv");

    } else if (url == "/data" && method == "GET") {

        res.statusCode = 201;
        res.end(JSON.stringify(userData));

    } else if (url == "/users" && method == "GET") {

        res.end(JSON.stringify(userData));

    } else if (url.startsWith("/users/") && method == "GET") {

        const id = url.split("/")[2];

        console.log(id);

        const user = userData.find((u) => u.id == id);

        if (!user) {
            return res.end("user not found");
        }

        res.end(JSON.stringify(user));

    } else if (url == "/create" && method == "POST") {

        res.end("create user");

    }
    
    else if(url.startsWith("/delete/") && method =="DELETE"){
        const id = url.split("/")[2];
        const index = userData.findIndex((u) => u.id == id);
        if (index == -1){
            res.end("data not found");
        }
        userData.splice(index,1)
        res.end("data deleted ")
    }
    //assignment 3 (user data mai email update karni hai using put method updated )
    
    else {

        res.statusCode = 404;
        res.end("Route not found");

    }
});

server.listen(3000, () => {
    console.log("server running on port 3000");
});