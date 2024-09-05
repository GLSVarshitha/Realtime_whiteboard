let pencilelement=document.querySelector("#pencil");
let eraserelement=document.querySelector("#eraser");
let stickyelement=document.querySelector("#sticky");
let uploadelement=document.querySelector("#upload");
let downloadelement=document.querySelector("#download");
let undoelement=document.querySelector("#undo");
let redoelement=document.querySelector("#redo");

pencilelement.addEventListener("click",function tellpencil(){
  console.log("Pencil is clicked!!!");
})
let canvas=document.querySelector("#board")
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
//draw something on canvas
let tool=canvas.getContext("2d");
//to start the drawing
// tool.beginPath();
// //starting point of the drawing
// tool.moveTo(50,50);
// //move the pencil to a point
// tool.lineTo(200,400);
// tool.stroke();
// // tool.closePath();------optional
// //---------------->Path 2
// tool.beginPath();
// tool.strokeStyle="red";
// tool.lineWidth=5;
// tool.moveTo(250,250);
// //move the pencil to a point
// tool.lineTo(500,600);
// tool.stroke();
// console.log("tool",tool);
let toolbar=document.querySelector(".toolbar");
let isDrawing=false;
canvas.addEventListener("mousedown",function(e){
  // console.log("mouse down");
  // console.log("x",e.clientX);
  // console.log("y",e.clientY);
  let x=e.clientX;
  let y=e.clientY;
  let toolbarheight=getYdelta();
  tool.beginPath();
  tool.moveTo(x,y-toolbarheight);
  isDrawing=true;
})


canvas.addEventListener("mousemove",function(e){
  if(isDrawing==false){
    return;
  }
  let x=e.clientX;
  let y=e.clientY;
  let toolbarheight=getYdelta();
  tool.lineTo(x,y-toolbarheight);
  tool.stroke();
})

canvas.addEventListener("mouseup",function(e){
  // console.log("mouse up");
  // console.log("x",e.clientX);
  // console.log("y",e.clientY);
  isDrawing=false;
})


function getYdelta(){
  let heightOfToolbar=toolbar.getBoundingClientRect().height;
  return heightOfToolbar;
}

eraserelement.addEventListener("click",function telleraser(){
  console.log("Eraser is clicked!!!");
})