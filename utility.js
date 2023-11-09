function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

//Form reset
const resetFormInput = () => {
    const todoInput = document.querySelector('#todoInput');
    todoInput.value = " ";
}


const showMessage = (title) => {
    const errorMessageSpan = document.querySelector("#error-message")
        errorMessageSpan.innerHTML = title;
        errorMessageSpan.classList.remove("hidden");
        errorMessageSpan.classList.add("text-base", "text-red-400");

        setTimeout(() =>{
            errorMessageSpan.classList.add("hidden")
        }, 4000);
    }

    // Local Storage
    const getDb = (dB_Name) =>{
    if (!dB_Name) {
        throw new Error("Database not found");
    }
    return JSON.parse(localStorage.getItem(dB_Name)) || [];
    };

    const setDb = (dB_Name, new_todo_Db) =>{
        if (!(dB_Name)) {
            throw new Error("Database not found");
        }
        if (!(new_todo_Db)) {
            throw new Error("newData not found");
        }
 localStorage.setItem(dB_Name, JSON.stringify(new_todo_Db));
    }


    const sortTodosByDate = (todo_Db) => {
        return todo_Db.sort((a, b) => b.date - a.date);
    }

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


