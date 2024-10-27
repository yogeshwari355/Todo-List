
let todoListContEl = document.getElementById("todoListCont");

let userInEl = document.getElementById("userIn");

let errorMsg = document.getElementById("errorMsg");




// let todoList = [

//     {
//         title : "HTML",
//         id : 1
//     },
//     {
//         title : "CSS",
//         id : 2
//     },
//     {
//         title : "Javascript",
//         id : 3
//     }


// ]

function onGetParsedtodo(){

    let myTodoList = localStorage.getItem("myTodoList");

    if( myTodoList === null ){

        return [];

    }
    else{

        let parsedTodo = JSON.parse( myTodoList );

        return parsedTodo;
    }

}



let todoList = onGetParsedtodo();


function onStatusChanged(checkBoxId,titleId,todoId){

    let checkBoxEl = document.getElementById(checkBoxId);

    let titleEl = document.getElementById(titleId);

    if( checkBoxEl.checked === true ){

        titleEl.classList.add("checked");

    }
    else{

        titleEl.classList.remove("checked");

    }


    let newTodoId = todoId.slice(4);

    let index = todoList.findIndex( (each)=> each.id == newTodoId );

    for( let i = 0; i < todoList.length; i++){

        if( index === i ){

                if( todoList[i].isChecked === false ){

                    todoList[i].isChecked = true;

                }
                else{

                    todoList[i].isChecked = false;
                }


        }

    }


}


function onDeleteTodo(todoId){

    let myTodo = document.getElementById(todoId);

    todoListContEl.removeChild(myTodo);

    let newTodoId = todoId.slice(4);

    let index = todoList.findIndex( (each)=> each.id == newTodoId );

    todoList.splice(index,1);

    console.log( todoList );

}



function createAndAppendTodo(todo){

    let checkBoxId = "myCheckbox" + todo.id;
    let titleId = "myTitle" + todo.id;
    let todoId = "todo" + todo.id;

    let listCont = document.createElement("li");
    listCont.classList.add("list-cont");
    listCont.id = todoId;
    todoListContEl.appendChild( listCont );

    let checkboxEl = document.createElement("input");
    checkboxEl.type = "checkbox";
    checkboxEl.id = checkBoxId;
    if(todo.isChecked === true){
        checkboxEl.checked = true;
    }
    checkboxEl.onclick = function(){
        onStatusChanged(checkBoxId,titleId,todoId);
    }
    listCont.appendChild( checkboxEl );

    let labelEl = document.createElement("label");
    labelEl.classList.add("label-card");
    labelEl.htmlFor = checkBoxId;
    listCont.appendChild( labelEl );

    let titleEl = document.createElement("h4");
    titleEl.textContent = todo.title;
    titleEl.id = titleId;
    if( todo.isChecked === true ){
        titleEl.classList.add("checked");
    }
    labelEl.appendChild( titleEl );

    let deleteBtnEl = document.createElement("button");
    deleteBtnEl.classList.add("delete-btn");
    deleteBtnEl.onclick = function(){
        onDeleteTodo(todoId);
    }
    labelEl.appendChild( deleteBtnEl );

    let trashIconEl = document.createElement("i");
    trashIconEl.classList.add("fa-solid", "fa-trash");
    deleteBtnEl.appendChild( trashIconEl );


}



for ( each of todoList ){

    createAndAppendTodo(each);

}



function onAddTodo(){

    let date = new Date();

    let uniqueId = Math.ceil( Math.random() * date.getTime() )

    let newTodo = {
        title : userInEl.value,
        id : uniqueId,
        isChecked : false
    }


    if ( userInEl.value === "" ){

        errorMsg.textContent = "Please Provide Valid Input!!!!";

    }
    else{

        createAndAppendTodo( newTodo );
        todoList.push(newTodo);
        errorMsg.textContent = "";
        userInEl.value = "";

    }

    console.log( todoList );

}



function onSavetodo(){

    let stringyFyTodo = JSON.stringify( todoList );

    localStorage.setItem("myTodoList",stringyFyTodo);

}




