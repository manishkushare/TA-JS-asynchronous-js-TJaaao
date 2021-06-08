let bookContainer = document.querySelector(".book_list");
let popUp = document.querySelector(".pop_up");
popUp.style.visibility = "hidden";

function createBookUI(data){
  data.then(res => {
    res.forEach((res,index)=>{
      let li = document.createElement("li");
      let h2 = document.createElement("h2");
      let h3 = document.createElement("h3");
      let btn = document.createElement("button");
      btn.innerText = `Show Character ${res.characters.length}`;
      btn.setAttribute("data-id",index);
      h2.innerText = res.name
      h3.innerText = res.authors.join(" ");
      li.append(h2,h3,btn);
      bookContainer.append(li);
    })
  })
  
}

function fetchData(url){
  let data = fetch(url).then(res => res.json());
  return data;
}
let mainContent = fetchData("https://www.anapioficeandfire.com/api/books");
createBookUI(mainContent);

function handlePopUp(event){
  let id = event.target.dataset.id;
  let data = fetchData("https://www.anapioficeandfire.com/api/books");
  console.log(data.then(res => {
    console.log(res[id].characters)
  }));
}
bookContainer.addEventListener("click", handlePopUp);