let url = `https://api.spaceflightnewsapi.net/v3/Articles/?_limit=30`;
let newsContainer = document.querySelector(".news_wrap");
let select = document.querySelector("select");
let filteredNewsSite = [];
let errorWrap = document.querySelector(".error_message_wrap");
let main = document.querySelector(".main");
// errorWrap.style.display = "none";

function handleLoad(status = false){
  if(status){
    newsContainer.innerHTML = `<div class="lds-hourglass"></div>`;
  } 
}

function renderNews(news){
  newsContainer.innerHTML = "";
  news.forEach(n => {
    let li = document.createElement("li");
    li.classList.add("news");
    let image = document.createElement("img");
    image.src = n.imageUrl;
    let div = document.createElement("div");
    div.classList.add("news_info");
    let span = document.createElement("span");
    span.classList.add("source");
    span.innerText = n.newsSite;
    let h2 = document.createElement("h2");
    h2.innerText = n.title;
    let p = document.createElement("p");
    p.innerText = n.summary;
    let anchor = document.createElement("a");
    anchor.href = n.url;
    let btn = document.createElement("button");
    anchor.append(btn);
    btn.classList.add("source");
    btn.innerText = "Read More!"
    div.append(span,h2,p,anchor);
    li.append(image,div);
    newsContainer.append(li)
  })
}

function createDropdown(data){
  data.forEach(elem => {
    let option = document.createElement("option");
    option.value = elem;
    option.innerText = elem;
    select.append(option);
  })
}

function init(){
  handleLoad(true);
  let data  = fetch(url).then((response)=> {
    if(!response.ok){
      throw new Error(`Error happened: ${response.status}`)
    }
    return response.json()
  })
  .then(newsInfo => {
    errorWrap.style.visibility = "hidden";
    handleLoad();
    if(Array.isArray(newsInfo)){
      console.log(newsInfo);
    renderNews(newsInfo);
    newsInfo.forEach(n => {
      if(!filteredNewsSite.includes(n.newsSite)){
        filteredNewsSite.push(n.newsSite);
      }
    })
    createDropdown(filteredNewsSite);
    select.addEventListener("change",(event)=> handleSelect(event,newsInfo))
    }
    
  })
  .catch(error => {
    main.style.visibility = "hidden";
    errorWrap.style.visibility = "visible";
    document.querySelector(".error").innerText = error;
  })
  
}

function handleSelect(event,data){
  let value = event.target.value;
  if(value !== ""){
    let filtererdData = data.reduce((acc,cv)=> {
      if(value === cv.newsSite){
        acc.push(cv);
      }
      return acc;
    },[])
    renderNews(filtererdData);

  }
  else {
    renderNews(data);
  }
}

if(navigator.onLine){
  init();

}else{
  document.querySelector(".error").innerText = "Check your internet connection";
}


