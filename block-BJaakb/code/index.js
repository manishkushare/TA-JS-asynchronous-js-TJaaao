let input = document.createElement("input");

function handleInput(event,url){
  if(event.keyCode===13){
    return new Promise((resolve,reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET",url)
      xhr.onload = ()=> resolve(JSON.parse(xhr.response));
      xhr.onerror = () => reject("SOmething went wrong");
      xhr.send();
    })
    
  }
}

let data = handleInput()
input.addEventListener("keyup",(event)=> handleInput(event,`https://api.unsplash.com/search/photos?client_id=ruzQetxrNoKE_gcFpQpUhCsBNFuBVQ4ceius0ak7Tsc&query=${event.target.value}`));