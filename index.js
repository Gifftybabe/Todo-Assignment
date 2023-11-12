// CREATE TODO FUNCTION
/*
1. Get todo from user input
2. Add todo to local storage
*/

// "use strict"
// Database Name
const dB_Name = 'todo_Db';

// GLobal Variables
const todoInput = document.querySelector('#todoInput');
const updateTodoBtn = document.querySelector("#update_todo_btn");
const addTodoBtn = document.querySelector("#add_todo_btn");

// Create Todo
// const createTodo =  (e) => {
//     e.preventDefault();
//     try {
//     if(!todoInput.value){

//         showMessage("Todo title cannot be empty");
//         return;
//     }


//     const newTodo = {
//         id: uuid(),
//         title: todoInput.value,
//         date: Date.now(),
//     };

const createTodo = (e) => {
  e.preventDefault();
  try {
      const trimmedTitle = todoInput.value.trim();

      if (!trimmedTitle) {
          showMessage("Todo title cannot be empty");
          return;
      }

      const newTodo = {
          id: uuid(),
          title: trimmedTitle,
          date: Date.now(),
      };


   // check for ls

    const todo_Db = getDb(dB_Name)
    //add new todo db array
    const newTodo_DB = [...todo_Db, newTodo];

    // add to ls
    setDb(dB_Name, newTodo_DB);
    fetchTodo();
    // setting the input field to empty after clicking the add todo button
    resetFormInput();
}
catch (error) {
    showMessage(error.message);
}
};

// READ TODO FUNCTION
const fetchTodo = () => {
    const todo_Db = getDb(dB_Name);

    const emptyTodo = todo_Db.length === 0;
    const todoListContainer = document.querySelector('#todo-list-container');

    if (emptyTodo) {
        todoListContainer.innerHTML = `<div id="noTodos" class="p-6">
        <div class="flex flex-col items-center gap-1">
          <dotlottie-player
            src="https://lottie.host/c5708dda-b284-4922-b148-f580a81f560a/r9ud98gKp3.lottie"
            background="transparent"
            speed="1"
            style="width: 300px; height: 300px"
            direction="1"
            mode="normal"
            loop
            autoplay
          ></dotlottie-player>
          <h2 class="text-3xl font-semibold">
            It's a good day. No todos left...
          </h2>
        </div>
      </div>`;
        return;
    }


    const todos = sortTodosByDate(todo_Db).map((todo) => {
        return `
        <div class="group flex justify-between items-center py-3 px-2.5 bg-slate-100 rounded-lg hover:bg-slate-100">
      <button onclick="handle_Preview_Todo('${todo.id}')"> ${todo.title} </button>

            <section class="flex gap-4 hidden group-hover:block">

                <button onclick="handleEditMode('${todo.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
                </button>

                <button onclick="deleteTodo('${todo.id}')"
                type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
                </button>

            </section>
        </div>
        <span class="text-slate-400  text-sm flex gap-2 justify-center items-center">Date Added: ${new Date(todo.date).toLocaleString()}</span>
        `;
    });

    todoListContainer.innerHTML = todos.join('');
};

fetchTodo();

// UPDATE TODO FUNCTION
function handleEditMode(id){
const todo_Db = getDb(dB_Name);
const todo_to_update = todo_Db.find((todo) => todo.id === id);
if(!todo_to_update){
    return;
}


todoInput.value = todo_to_update.title

const updateTodoBtn = document.querySelector("#update_todo_btn");
updateTodoBtn.classList.remove("hidden"); // Show the Update button

updateTodoBtn.setAttribute("todo_id_to_update", id);

const addBtn = document.querySelector("#add_todo_btn");
addBtn.classList.add("hidden"); // Hide the Add button

const cancelBtn = document.querySelector("#cancel_todo_btn");
cancelBtn.classList.remove("hidden"); // Show the Cancel button

// Add an event listener to hide the Cancel button and show the Add button when Update or Cancel is clicked
updateTodoBtn.addEventListener("click", function() {
  cancelBtn.classList.add("hidden"); // Hide the Cancel button
  addBtn.classList.remove("hidden"); // Show the Add button
});

cancelBtn.addEventListener("click", () => {
    resetFormInput();
  cancelBtn.classList.add("hidden"); // Hide the Cancel button
  addBtn.classList.remove("hidden"); // Show the Add button
  updateTodoBtn.classList.add("hidden");
});



};

const updateTodo = (e) =>{
    e.preventDefault();
    if(!todoInput.value){
      showMessage("Kindly enter a task title to update")
        return;
    }


    const todo_id_to_update= updateTodoBtn.getAttribute("todo_id_to_update")
    const todo_Db = getDb(dB_Name);
    const updated_todo_Db = todo_Db.map((todo) => {
        if(todo.id === todo_id_to_update){
    return{...todo, title: todoInput.value}
        } else{
            return todo;
        }
    });



    // localStorage.setItem(dB_Name, JSON.stringify(updated_todo_Db))
    setDb(dB_Name, updated_todo_Db);
    fetchTodo();
    resetFormInput();


updateTodoBtn.classList.add("hidden") // hide updateTodoBtn
const cancelBtn = document.querySelector("#cancel_todo_btn");
cancelBtn.classList.remove("hidden"); // show cancelBtn

const addBtn = document.querySelector("#add_todo_btn")
addBtn.classList.remove("hidden")  // show addBtn


};
// DELETE TODO FUNCTION
const deleteTodo = (id) => {
    Swal.fire({
        title: 'Delete Todo',
        text: 'Do you want to delete this todo',
        icon: 'warning',
        confirmButtonText: 'Yes!',
        showCancelButton: true,
        cancelButtonText: 'No, cancel!',
      }).then((res) => {

        if(res.isConfirmed){
        const todo_Db = getDb(dB_Name);
        const new_todo_Db = todo_Db.filter((todo) => todo.id !== id)

        setDb(dB_Name, new_todo_Db);
        fetchTodo()
        } else{
            return;
        }

      });

};

const handle_Preview_Todo = function (id) {
    setDb("current_Preview_Todo", id);
    window.location.href = "/preview.html";
  };

