console.log("Hello Worlllllllldddddddddd");

let ulele = document.querySelector("ul");
let liele = document.createElement('li');
liele.innerText = "I am so";
ulele.appendChild(liele);
// let liele1 = document.createElement('li');
// liele1.innerText = "I am so";
// ulele.appendChild(liele1);
// for(let i=1;i<=5;i++){
//   let liele = document.createElement('li');
//   liele.innerText = "I am so";
//   ulele.appendChild(liele);
// }
liele.addEventListener("click",liRemover)
function liRemover(){
  console.log("Li was clicked");
  liele.remove();
}