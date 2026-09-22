import http from "http";

const SYSDATA = {
    message: "System information"
};

const userData = [
    {
        id: 1,
        name: "Dhruv",
        email: "dhruv@gmail.com"
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

const server = http.createServer(async (req, res) => {

    const url = req.url;
    const method = req.method;

    if (url == "/sys" && method == "GET") {

        res.end(JSON.stringify(SYSDATA));

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

    }

});

server.listen(3000, () => {
    console.log("server running on port 3000");
});