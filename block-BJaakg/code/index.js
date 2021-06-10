let bookContainer = document.querySelector(".book_list");
let popUp = document.querySelector(".pop_up");
let popUpList = document.querySelector(".pop_up_list");
let closePopUp = document.querySelector(".close_popup");
let main = document.querySelector(".main");
let errorElem = document.querySelector(".error");


const bookUrl = "https://www.anapioficeandfire.com/api/books"

function handleError(message = "Something went wrong"){
  main.style.display=  "none";
  errorElem.innerText = message;
}
function handleSpin(rootElem, status = false){
  if(status){
    console.log("entered");
    rootElem.innerHTML = `<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> `
  }
}


function createPopUpUI(data){
  // handleSpin(spinBase);
  popUpList.innerHTML = "";
  Promise.all(data.map(elem => {
    return fetch(elem).then(res => res.json());
  }))
  .then(data => { 
    console.log(data);
    data.forEach(character => {
      console.log(character,"inside for each");
      let li = document.createElement("li");
      li.innerText = `${character.name} : (${character.aliases.join()})`;
      popUpList.append(li);
    })
  })
  .finally(() => handleSpin(popUp));
  
}

function createBookUI(data){
  popUp.style.display = "none";
  bookContainer.innerHTML = "";
  data.forEach((res,index)=>{
      let li = document.createElement("li");
      let h2 = document.createElement("h2");
      let h3 = document.createElement("h3");
      let btn = document.createElement("button");
      btn.innerText = `Show Character ${res.characters.length}`;
      btn.setAttribute("data-id",index);
      btn.classList.add("btn");
      btn.addEventListener("click",()=> {
        popUp.style.display = "block";
        bookContainer.style.display = "none";
        createPopUpUI(res.characters);
        closePopUp.addEventListener("click", ()=> {
          popUp.style.display = "none";
          bookContainer.style.display = "grid";
        })
      })
      h2.innerText = res.name
      h3.innerText = res.authors.join(" ");
      li.append(h2,h3,btn);
      bookContainer.append(li);
    })
  
}

function fetchData(){
  handleSpin(bookContainer,true);
  fetch(bookUrl).then(res => {
    if(res.ok){
      return res.json()
    }
    else{
      throw new Error("Response no ok!")
    }
  })
  .then(data => {
    createBookUI(data);
  })
  .catch(error => {
    handleError(error);
  })
  .finally(()=> handleSpin(bookContainer));
}

if(navigator.onLine){
  fetchData();
}
else {
  handleError("check your internet connect");
}