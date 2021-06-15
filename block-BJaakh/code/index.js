let inputTag = document.querySelector(".input_todo"); 
let root = document.querySelector(".todo_list_wrapper");
let baseURL = "https://sleepy-falls-37563.herokuapp.com/api/todo";
//create UI
function createUI(data){
    root.innerHTML = "";
    console.log(data,"inside create UI");
    data.forEach((todo,index) => {
        let div = document.createElement("div");
        div.classList.add("todo_list");
        let checkboxSpan = document.createElement("span");
        checkboxSpan.classList.add("checkbox");
        let inputCheckbox = document.createElement("input");
        inputCheckbox.setAttribute("type","checkbox");
        inputCheckbox.setAttribute("data-id",todo._id);
        inputCheckbox.setAttribute("name", "isCompleted");
        inputCheckbox.setAttribute("data-tag","checkbox");
        inputCheckbox.checked = todo.isCompleted;
        checkboxSpan.append(inputCheckbox);
        let para = document.createElement("p");
        para.innerText = todo.title;
        let deleteSpan = document.createElement("span");
        deleteSpan.classList.add("delete");
        deleteSpan.innerText = "❌";
        deleteSpan.setAttribute("data-delete-id", todo._id);
        deleteSpan.setAttribute("data-tag", "span");
        div.append(checkboxSpan,para,deleteSpan);
        root.append(div);
    })
}

// handle event on todo-list-wrapper using event delegation
function handleEvent(event){
    console.log("👴",event.target.dataset);
    if(event.target.dataset.tag === "span"){
        handleDelete(event);
    }
    else if(event.target.dataset.tag === "checkbox"){
        handleCheckbox(event);
    }
}
// handle delete, DELETE method
function handleDelete(event){
    let id = event.target.dataset.deleteId;
    console.log(id);
    let url = baseURL + `/${id}`;
    console.log(url, "👨");
    fetch(baseURL + `/${id}`, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json'
        }
    })
    // .then(res => {
    //     console.log(res, "res inside delete method, ");
    //     return res.json()  
    // } )
    // .then(data => {
    //     console.log(data,"data inside delete method,");
    //     createUI(data.todos);
    // })
    .then(() => fetchData());
}
// handle input checkbox , PUT method by udating isCompleted
function handleCheckbox(event){
    let id = event.target.dataset.id;
    console.dir(event.target);
    let data = {
        todos:{
            isCompleted : !event.target.checked,
        }
    }
    fetch(baseURL + `/${id}` , {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    })
    //giving error ******
    .then(res => {
        console.log(res, "res inside put method, handleCheckbox");
        return res.json()  
    } )
    .then(data => {
        console.log(data,"data inside put method, handleCheckbox");
        createUI(data.todos);
    })
    // .then(() => fetchData());
}
 
// handle post , using POST method to add new entity
function postTodo(data){
    console.log("inside post todo");
    fetch(baseURL , {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    })
    .then(res => res.json())
    .then(data => {
        console.log(data,"inside post data");
        createUI(data.todos);
    })
}
// handle input tag and get value
function handleInputTag(event){
    if(event.keyCode === 13){
        console.log("test");
        let data = {
            todo : {
                title : event.target.value,                                                          
                isCompleted : false,
            }
        }
        postTodo(data);
        
        
        event.target.value = "";
    }
} 
inputTag.addEventListener("keydown", handleInputTag);

root.addEventListener("click", handleEvent);

function fetchData(){
    fetch(baseURL)
    .then(res => res.json())
    .then(data => {
        createUI(data.todos)
    })    
}
fetchData();

