let userInfo = document.querySelector(".userInfo");
let input = document.querySelector("input");
let userFollowingInfo = document.querySelector(".userFollowingInfo");
let userFollowerInfo = document.querySelector(".userFollowersInfo");

function createUserUI(data){
  userInfo.innerHTML = "";
  let img = document.createElement("img");
  img.src = data.avatar_url;
  let h2 = document.createElement("h2");
  h2.innerText = data.name;
  let a = document.createElement("a");
  a.href = data.url;
  a.innerText = data.url;
  userInfo.append(img,h2,a);
}

function createUserFollowingUI(data){
  userFollowingInfo.innerHTML = "";
  console.log("test inside following");
  let h3 = document.createElement("h3");
  h3.innerText = "Followings:";
  let ul= document.createElement("ul");
  console.log(data);
  [...data].forEach(element => {
  console.log("test");
    let li = document.createElement("li");
    let img = document.createElement("img");
    let h2 = document.createElement("h2");
    let a = document.createElement("a");
    img.src = element.avatar_url;
    h2.innerText = element.login;
    a.href = element.html_url;
    a.innerText = element.html_url;
    li.append(img,h2,a);
    ul.append(li);
  });
  userFollowingInfo.append(h3,ul);
}
function createUserFollowerUI(data){
  userFollowerInfo.innerHTML = "";
  console.log("test inside following");
  let h3 = document.createElement("h3");
  h3.innerText = "Followers:";
  let ul= document.createElement("ul");
  console.log(data);
  [...data].forEach(element => {
  console.log("test");
    let li = document.createElement("li");
    let img = document.createElement("img");
    let h2 = document.createElement("h2");
    let a = document.createElement("a");
    img.src = element.avatar_url;
    h2.innerText = element.login;
    a.href = element.html_url;
    a.innerText = element.html_url;
    li.append(img,h2,a);
    ul.append(li);
  });
  userFollowerInfo.append(h3,ul);
}

function handleInput(event){
  console.dir(event);
  if(event.keyCode === 13){
    console.log("test");
    let username = event.target.value;
    // user data
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.github.com/users/${username}`);
    
    xhr.onload = () =>{
      let userData = JSON.parse(xhr.response);
      createUserUI(userData);
    }
    xhr.send();
    // user followings
    let following  = new XMLHttpRequest();
    following.open("GET", `https://api.github.com/users/${username}/following`);
    following.onload = ()=>{
      let userFollowingData =JSON.parse(following.response);
      createUserFollowingUI(userFollowingData);
    }
    following.send();

    // user followers
    let followers = new XMLHttpRequest();
    followers.open("GET", `https://api.github.com/users/${username}/followers`);
    followers.onload = ()=> {
      let userFollowerData = JSON.parse(followers.response);
      createUserFollowerUI(userFollowerData);
    }
    followers.send();
  }
}

input.addEventListener("keyup",handleInput);