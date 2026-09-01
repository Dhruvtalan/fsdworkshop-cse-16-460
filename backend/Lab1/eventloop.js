console.log("start");

process.nextTick(()=>{
    console.log("nextTick");
})

setTimeout(()=>{
    console.log("first setTimeout");
}, 5000);

setTimeout(()=>{
    console.log("second setTimeout");
}, 0);

setImmediate(()=>{
    console.log("setImmediate");
});

console.log("End");