import {EventEmitter} from "node:events";

function createDOMElement() {
    const emitter = new EventEmitter();
    return {
        
        addEventListner(eventName, callback){
            emitter.on(eventName, callback)
        },

        removeEventListner(eventName, callback){
            emitter.off(eventName, callback)
        },

        dispatchEvent(event){
            emitter.emit(event.type,event)
        },
    };
}

const button = createDOMElement();
button.addEventListner('click',()=>{
    console.log("button clicked")
})



function handleClick(event){
    console.log('Button clicked');
    console.log('Event Type: ${event.type}');
    console.log('message: ${event.detail}' ) ;
}

button.addEventListner("click", handleClick);

button.dispatchEvent({
    type:"click",
    detail:"help from node.js",
});

