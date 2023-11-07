

const renderCurrentPreviewTodo = () => {
    const todo_db = getDb("todo_db");
    const currentPreviewTodoId = getDb("current_preview_todo_id");
    const currentTodo = todo_db.find((todo) => todo.id === currentPreviewTodoId);
    const { title, id, date, description } = currentTodo;

    const todo_preview_container = document.querySelector("#todo_preview_container");


todo_preview_container.innerHTML = `
<section class="flex justify-between items-center">
  <h3 class="xl font-semibold">${title}</h3>
  <div class="flex items-center gap-2">
    <button onclick="handleEditMode()">
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

    <button onclick="deleteTodo()">
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

<section>
  <p class="text-slate-700">
    ${description || ""}
  </p>
  <section mt-3>
    <span class="text-sm">${getDate(date)}</span>
    <span class="mx-1">&middot;</span>
    <span
      class="bg-slate-400 text-xs rounded-md px-2 py-1 text-slate-800"
      >Pending</span
    >
  </section>
</section>

`
};
renderCurrentPreviewTodo();

