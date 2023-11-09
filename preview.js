"use strict";

const dB_Name = "todo_db";
const handlePreviewEdit = function (e) {
  e.preventDefault();
  document.querySelector("#preview_form").classList.remove("hidden");
  const editTitle = document.querySelector("#title_edit").value;
  const todoDescription = document.querySelector("#todo_description").value;

  const todo_db = getDb("todo_Db");
  const currentPreviewtaskID = getDb("current_Preview_Todo");
  const taskID = todo_db.findIndex((todo) => todo.id === currentPreviewtaskID);

  if (taskID !== -1) {
    // Update the currentTodo with the new title and added description
    if (editTitle === "" || todoDescription === "") {
      return;
    } else {
      const updatedCurrentTodo = {
        ...todo_db[taskID],
        title: editTitle,
        description: todoDescription,
      };
      // Update the todo_db in local storage with the modified currentTodo
      todo_db[taskID] = updatedCurrentTodo;
      setDb("todo_Db", todo_db);
    }

    document.querySelector("#preview_form").classList.add("hidden");
    renderPreviewtaskID();
  } else {
    console.error("Task not found in the database.");
  }
};

const renderPreviewtaskID = function () {
  const todo_db = getDb("todo_Db");
  const currentPreviewtaskID = getDb("current_Preview_Todo");
  const currentTodo = todo_db.find((todo) => todo.id === currentPreviewtaskID);

  const { title, id, date, description } = currentTodo;
  const todo_Preview_Container = document.querySelector("#preview-container");

  return (todo_Preview_Container.innerHTML = `
  <section id="preview-container">
            <section class=" group flex justify-between items-center gap-2">
            <h3 class="text-xl text-slate-400 font-bold" ><input class="p-3" type="checkbox" name="done"
                id="complete" onchange="pending()"/>
                ${title}</h3>
            <div class="flex items-center gap-2 hidden group-hover:block">
                <button onclick="previewEditForm(event)">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-green-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
                </button>

                <button onclick="deleteTodo('${id}')"
                type="button">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-red-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
                </button>
            </div>
        </section>

          <section class=""
          >
                <p class="text-sm text-slate-400" > ${
                  description || "Your description will appear here"
                }</p>
                <section class="mt-4">

                    <span class="text-slate-200 text-sm">
                    ${getDate(date)}
                    </span>
                    <span class="mx-2 text-white">&middot;</span>
                    <span
                    class=" text-slate-800 bg-slate-400
                    text-xs px-2 py-1 rounded-full"
                    id="task">
                        Pending
                    </span>
                </section>
                </section>
        </section>`);
};

renderPreviewtaskID();
const previewEditForm = (e) => {
  e.preventDefault();

  document.querySelector("#preview_form").classList.toggle("hidden");
};

// Delete todo
const deleteTodo = (id) => {
  Swal.fire({
    title: "Delete Task",
    text: "Do you want to delete this task",
    icon: "warning",
    confirmButtonText: "Yes!",
    showCancelButton: true,
  }).then((res) => {
    if (res.isConfirmed) {
      const todo_db = getDb(dB_Name);
      const new_todo_db = todo_db.filter((todo) => todo.id !== id);

      setDb(dB_Name, new_todo_db);
      window.location.href = "/index.html";
    } else {
      return;
    }
  });
};

const pending = function () {
  const taskStatus = document.querySelector("#task");
  const checkTask = document.querySelector("#complete");

  if (checkTask.checked === true) {
    taskStatus.textContent = "Completed";
    taskStatus.classList.remove("bg-red-300");
    taskStatus.classList.add("bg-green-700");
  } else {
    taskStatus.textContent = "Pending";
    taskStatus.classList.remove("bg-green-700");
    taskStatus.classList.add("bg-");
  }
};
pending();
