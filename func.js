const f1 = () =>{
    console.log("F1");
};

function f2(){
    console.log("F2");
}

//create 3 functions named f1 f2 f3 each will print fucntion name define main funtion and 
//first print main then call f1 f2 and f3 and at last print end call main function and show 
//the output. in java script
const f3 = () => console.log("F3");

function main(){
    console.log("main");
    //f1();
    setTimeout(f1,0);
    setImmediate (f2);
    f3();
    console.log("end");
}
main();