// Utility function
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

// CREATE TODO FUNCTION
/*
1. Get todo from user input
2. Add todo to local storage
*/

const DB_NAME = 'todo_db';

const createTodo = () => {
    const todoInput = document.querySelector('#todo-input');
    const formMessageSpan = document.querySelector("#form-message");

    if (!todoInput.value) {
        formMessageSpan.innerHTML = "Todo is empty.";
        formMessageSpan.classList.remove("hidden");
        formMessageSpan.classList.add("text-xs", "text-red-400");

        setTimeout(() => {
            formMessageSpan.classList.add("hidden");
        }, 5000);

        return;
    }

    const newTodo = {
        id: uuid(),
        title: todoInput.value,
        created_at: Date.now(),
    };

   // check for ls
   const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
   //add new todo db array
   const new_todo_db = [...todo_db, newTodo];
   // add to ls
   localStorage.setItem(DB_NAME, JSON.stringify(new_todo_db));
    fetchTodos();
    todoInput.value = "";
};

// READ TODO FUNCTION
const fetchTodos = () => {
    const todoListContainer = document.querySelector('#todo-lists-container');
    const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
    const noTodo = todo_db.length === 0;
    if (noTodo) {
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

    const todos = todo_db
        .sort((a, b) =>
            a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0
            )
        .map((todo) => {
        return `
        <div class="group flex justify-between py-3 hover:bg-slate-50 px-2.5 rounded-lg">
        <a href="">${todo.title}</a>
        <section class="gap-3 hidden group-hover:flex ">
           <button onclick="handleEditMode('${todo.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>

           </button>

           <button onclick="deleteTodo('${todo.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>

           </button>
        </section>
    </div>
        `
    });
   todoListContainer.innerHTML = todos.join("");
};

// UPDATE TODO FUNCTION
const handleEditMode = (id) => {
    const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
    const todo_to_update = todo_db.find((todo) => todo.id === id);

    if (!todo_to_update) {
        return;
    }
    const todoInput = document.querySelector('#todo-input');
    todoInput.value = todo_to_update.title;

    const updateTodoBtn = document.querySelector('#update_todo_btn');
    updateTodoBtn.classList.remove("hidden"); //show update todo btn
    updateTodoBtn.setAttribute("todo_id_to_update", id);

    const addTodoBtn = document.querySelector('#add_todo_btn');
    addTodoBtn.classList.add("hidden"); // hide add todo btn
};

const updateTodo = () => {
    const todoInput = document.querySelector('#todo-input');
    if (!todoInput.value) {
        const formMessageSpan = document.querySelector("#form-message");
        formMessageSpan.innerHTML = "Please select Todo to update.";
        formMessageSpan.classList.remove("hidden");
        formMessageSpan.classList.add("text-xs", "text-red-400");

        setTimeout(() => {
            formMessageSpan.classList.add("hidden");
        }, 5000);

        return;
    }

    const updateTodoBtn = document.querySelector('#update_todo_btn');
    const todo_id_to_update = updateTodoBtn.getAttribute("todo_id_to_update");
    const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
    const updated_todo_db = todo_db.map((todo) => {
        if (todo.id === todo_id_to_update) {
            return { ...todo, title: todoInput.value };
        } else {
            return todo;
        }
    });

    localStorage.setItem(DB_NAME, JSON.stringify(updated_todo_db));
    fetchTodos();
    todoInput.value = '';

    updateTodoBtn.classList.add("hidden"); // hide update todo btn

    const addTodoBtn = document.querySelector('#add_todo_btn');
    addTodoBtn.classList.remove("hidden"); // show update todo btn
};

// DELETE TODO FUNCTION
const deleteTodo = (id) => {
    Swal.fire({
        title: 'Delete Todo!',
        text: 'Do you want to delete this todo?',
        icon: 'warning',
        confirmButtonText: 'Confirm',
        showCancelButton: true,
      }).then ((res) => {
            if(res.isConfirmed) {
                // Get todos ls
                const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
                // Filter out the todos that doesn't match the id
                const new_todo_db = todo_db.filter((todo) => todo.id !== id);
                // Set the new todos without the the todo that matches the id to the ls
                localStorage.setItem(DB_NAME, JSON.stringify(new_todo_db));

                fetchTodos();
        } else {
            return;
        }

      });

};

fetchTodos()
