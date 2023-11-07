function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

const resetFormInput = () => {
    const todoInput = document.querySelector('#todo-input');
    todoInput.value = "";
};

const showMessage = (title) => {
    const formMessageSpan = document.querySelector("#form-message");
    formMessageSpan.innerHTML = title;
    formMessageSpan.classList.remove("hidden");
    formMessageSpan.classList.add("text-xs", "text-red-400");

    setTimeout(() => {
        formMessageSpan.classList.add("hidden");
    }, 5000);
};

const getDb = (DB_NAME) => {
    if (!DB_NAME) {
        throw new Error("DB_NAME must be specified")
    }
    return JSON.parse(localStorage.getItem(DB_NAME)) || [];
};

const setDb = (DB_NAME, newData) => {
    if (!DB_NAME) {
        throw new Error("DB_NAME must be specified")
    }

    if (!newData) {
        throw new Error("Data is missing...")
    }

    localStorage.setItem(DB_NAME, JSON.stringify(newData));
};

function getDate(timestamp) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Get the day of the week
    const dayOfWeek = daysOfWeek[date.getDay()];

    return `${dayOfWeek}: ${year}-${month}-${day} : ${hours}:${minutes}`;
  }


const handlePreviewTodo = (id) => {
    setDb("current_preview_todo_id", id);
    window.location.href = "/preview.html";
};
