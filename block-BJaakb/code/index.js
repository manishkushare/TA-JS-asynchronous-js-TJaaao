let input = document.querySelector("input");
const url = `https://api.unsplash.com/photos?client_id=ruzQetxrNoKE_gcFpQpUhCsBNFuBVQ4ceius0ak7Tsc`;
const getSearchUrl = (query)=> `https://api.unsplash.com/search/photos?client_id=ruzQetxrNoKE_gcFpQpUhCsBNFuBVQ4ceius0ak7Tsc&query=${query}`;
let imageContainer = document.querySelector(".gallery");

function fetch(url){
  return new Promise((resolve,reject)=>{
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = ()=> resolve(JSON.parse(xhr.response)); 
    xhr.onerror = () =>reject("Something went wrong");
    xhr.send();
  })
}

function displayImage(image){
  console.log("insdie display :",image);
  imageContainer.innerHTML = "";
  let ul = document.createElement("ul");
  image.forEach(imgage =>{
    let li = document.createElement("li");
    let img = document.createElement("img");
    img.src = imgage.urls.thumb;
    li.append(img);
    ul.append(li);
  })
  imageContainer.append(ul);
}

let data = fetch(url);
console.log("data :",data);
data.then(displayImage).catch((error)=> alert(error));

function handleInput(event){
  if(event.keyCode === 13){
    console.log("test");
    let searchData = fetch(getSearchUrl(input.value))
    console.log("inside handleInput :",searchData);
    searchData.then((searchInfo)=> displayImage(searchInfo.results))
    .catch((error)=> alert(error));
    input.value = "";
  }
}


input.addEventListener("keyup",handleInput);