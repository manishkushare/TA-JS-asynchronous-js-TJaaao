let input = document.querySelector("input");
let imageContainer = document.querySelector(".image-wrap");

function createUI(data){
  imageContainer.innerHTML = "";
  let ul = document.createElement("ul");
  data.results.forEach(image =>{
    console.log(image);
    let li = document.createElement("li");
    let img = document.createElement("img");
    img.src = image.urls.full;
    li.append(img);
    ul.append(li);
  })
  imageContainer.append(ul);

}


function handleInput(event){
  // let photo = event.target.value;
  if(event.keyCode === 13){
    console.log("test");
    let xhr = new XMLHttpRequest();
    xhr.open("GET",`https://api.unsplash.com/search/photos?client_id=ruzQetxrNoKE_gcFpQpUhCsBNFuBVQ4ceius0ak7Tsc&query=${event.target.value}`);
    xhr.onload =()=>{
      let data = JSON.parse(xhr.response);
      console.log(data);
      createUI(data);
    }
    xhr.send();
  }

}

input.addEventListener("keyup",handleInput);
