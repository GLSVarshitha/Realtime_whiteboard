let canvas=document.querySelector("#board")
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
//draw something on canvas
let tool=canvas.getContext("2d");
let toolsArr=document.querySelectorAll(".tool");
let currtool="pencil";
for(let i=0;i<toolsArr.length;i++){
  toolsArr[i].addEventListener("click",function(){
    const toolName=toolsArr[i].id;
    if(toolName=="pencil"){
      currtool="pencil";
      tool.strokeStyle="red";
    }
    else if(toolName=="eraser"){
      currtool="eraser";
      tool.strokeStyle="white";
      tool.lineWidth=5;
      // console.log("Eraser is clicked");
    }
    else if(toolName=="download"){
      currtool="download";
      downloadFile();
      console.log("Download is clicked");
    }
    else if(toolName=="sticky"){
      currtool="sticky";
      createSticky();
      console.log("Sticky is clicked");
    }
    else if(toolName=="upload"){
      currtool="upload";
      uploadfile();
      console.log("Upload is clicked");
    }
    else if(toolName=="undo"){
      currtool="undo";
      console.log("Undo is clicked");
      undoFN();
    }
    else if(toolName=="redo"){
      console.log("Redo is clicked");
      redoFN();
    }
  })
}

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
let undoStack=[];
let toolbar=document.querySelector(".toolbar");
let isDrawing=false;
canvas.addEventListener("mousedown",function(e){
  // console.log("mouse down");
  // console.log("x",e.clientX);
  // console.log("y",e.clientY);
  let sidx=e.clientX;
  let sidy=e.clientY;
  let toolbarheight=getYdelta();
  tool.beginPath();
  tool.moveTo(sidx,sidy-toolbarheight);
  isDrawing=true;
  let pointDesc={
    desc:"md",
    x:sidx,
    y:sidy-toolbarheight
  }
  undoStack.push(pointDesc);
})

canvas.addEventListener("mousemove",function(e){
  if(isDrawing==false){
    return;
  }
  let eidx=e.clientX;1
  let eidy=e.clientY;
  let toolbarheight=getYdelta();
  tool.lineTo(eidx,eidy-toolbarheight);
  tool.stroke();
  let pointDesc={
    desc:"mm",
    x:eidx,
    y:eidy-toolbarheight
  }
  undoStack.push(pointDesc);
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

function createOuterShell(){
  let stickyDiv=document.createElement("div");
  let navDiv=document.createElement("div");
  let closeDiv=document.createElement("div");
  let minimiseDiv=document.createElement("div");
  stickyDiv.setAttribute("class","sticky");//the styling of sticky goes to the stickydiv
  navDiv.setAttribute("class","nav");
  closeDiv.innerText="X";
  minimiseDiv.innerText="_";
  stickyDiv.appendChild(navDiv);
  navDiv.appendChild(minimiseDiv);
  navDiv.appendChild(closeDiv);
  document.body.appendChild(stickyDiv);

  closeDiv.addEventListener("click",function(){
    stickyDiv.remove();
  })
  isMinimized=false;
  minimiseDiv.addEventListener("click",function(){
    textArea.style.display=isMinimized==true?"block":"none";
    isMinimized=!isMinimized;
  })

  //navbar--> mouse down,mouse move,mouse up
     let isStickyDown = false;
    // navbar -> mouse down , mouse mousemove, mouse up 

    navDiv.addEventListener("mousedown", function (e) {
        // initial point
        initialX = e.clientX
        initialY = e.clientY
        console.log("mousedown", initialX, initialY);
        isStickyDown = true;

    })
    navDiv.addEventListener("mousemove", function (e) {
        if (isStickyDown == true) {
            // final point 
            let finalX = e.clientX;
            let finalY = e.clientY;
            console.log("mousemove", finalX, finalY);
            //  distance
            let dx = finalX - initialX;
            let dy = finalY - initialY;
            //  move sticky
            //original top left
            let { top, left } = stickyDiv.getBoundingClientRect()
            // stickyPad.style.top=10+"px";
            stickyDiv.style.top = top + dy + "px";
            stickyDiv.style.left = left + dx + "px";
            initialX = finalX;
            initialY = finalY;
        }
    })
    navDiv.addEventListener("mouseup", function () {
        isStickyDown = false;
    })
    return stickyDiv;
}

// create sticky
//1.static version
//how it will be added to your UI

function createSticky(){
  let stickyDiv=createOuterShell();
  let textArea=document.createElement("textarea");
  textArea.setAttribute("class","text-area");
  stickyDiv.append(textArea);
}
let inputTag=document.querySelector(".input-tag");
function uploadfile(){
  //  console.log("uploaded file");
  inputTag.click();
  console.log("file uploaded");
  inputTag.addEventListener("change",function(){
    let data=inputTag.files[0];
    let img=document.createElement("img");
    let url=URL.createObjectURL(data);
    img.src=url;
    img.setAttribute("class","upload-img");
    let stickyDiv=createOuterShell();
    stickyDiv.append(img);
  })
}

function downloadFile(){
  // anchor Button
  // href-->canvas-->url
  // anchor click()
  // anchor remove
  let a=document.createElement("a");
  a.download="file.jpeg";
  let url=canvas.toDataURL("image/jpeg;base64");
  a.href=url;
  a.click();
  a.remove();
}
redoStack=[]
function undoFN(){
  if(undoStack.length>0){
    tool.clearRect(0,0,canvas.width,canvas.height);
    redoStack.push(undoStack.pop());
    for(let i=0;i<undoStack.length;i++){
      let {x,y,desc}=undoStack[i];
      if(desc=="md"){
        tool.beginPath();
        tool.moveTo(x,y);
      }
      else if(desc=="mm"){
        tool.lineTo(x,y);
        tool.stroke();
      }
    }
  }
}

function redoFN(){
  if(redoStack.length>0){
    tool.clearRect(0,0,canvas.width,canvas.height);
    undoStack.push(redoStack.pop());
    for(let i=0;i<undoStack.length;i++){
      let {x,y,desc}=undoStack[i];
      if(desc=="md"){
        tool.beginPath();
        tool.moveTo(x,y);
      }
      else if(desc=="mm"){
        tool.lineTo(x,y);
        tool.stroke();
      }
    }
  }
}