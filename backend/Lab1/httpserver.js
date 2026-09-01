import http from "http";

const userdata = {
    id: 1,
    name: "dt",
    email:"c.m@abes.ac.in",
},
};

const server = http.createServer((req,res)=>{
    const url=req.url;
    const method=req.method;
    if(url=='/msg' && method=='GET'){
    res.end("this is welcome message from the server");
    }
    else if(url=="/sys" && method=="GET"){
    res.end("this is system information");
    }
    else if(url=="/admin" && method=="GET"){
    res.end("welcome Dhruv");
    }
    else if(url=="/data" && method=="GET"){
    res.statusCode=201;
    res.end(JSON.stringify(userdata));
    }

    
});

server.listen(3000,()=>{
    console.log("server running on port 3000");
});

