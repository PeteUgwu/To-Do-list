/* eslint-disable quotes */
const InnerTodo = document.querySelector(".todo-inner");
let isEdit = false;
let editId = null;

export default class display {
  static getTodo = () => {
    let Todo;
    if (localStorage.getItem("todo") == null) {
      Todo = [];
    } else {
      Todo = JSON.parse(localStorage.getItem("todo"));
    }
    return Todo;
  };

  static addRemoveEvent = () => {
    const trash = document.querySelectorAll(".trash");
    trash.forEach((task, i) => {
      task.addEventListener("click", (ev) => {
        ev.preventDefault();
        this.removeTodo(i);
      });
    });
  };

  static removeTodo = (id) => {
    const toDos = display.getTodo();
    toDos.splice(id, 1);
    localStorage.setItem("todo", JSON.stringify(toDos));
    this.loadTodo(toDos);
  };

  static loadTodo = (item) => {
    let display = " ";
    item.forEach((elem, i) => {
      display += `
      <div class="todo-check flex">
      <div class="checkbox">
        <input
          type="checkbox"
          id="to-do-check"
          name="To-Do"
          value="Add" maxlength="10"/>
        <label for="todo">${elem.text}</label><br />
      </div>
      <div class= "check-icons">
      <div class="trash">
      <i class="fa-solid fa-trash" id="${i}"></i>
      </div>
      <i class="edit-btn vertical-menu fa-solid fa-ellipsis-vertical" id="${i}"></i>
      </div>
    </div>
    <hr />`;
    });
    InnerTodo.innerHTML = display;
    this.addRemoveEvent();
    this.editEvent();
  };

  static addTodo = () => {
    const text = document.querySelector(".type-task").value;
    if (text !== "") {
      const toDos = display.getTodo();
      const newInput = { text, completed: false, index: toDos.length };

      if (isEdit) {
        const singleTodo = toDos.find((item, index) => index === editId);
        Object.assign(singleTodo, newInput);
        localStorage.setItem("todo", JSON.stringify(toDos));
        this.loadTodo(toDos);
        isEdit = false;
        editId = null;
        document.querySelector(".type-task").value = "";
        return;
      }
      toDos.push(newInput);
      localStorage.setItem("todo", JSON.stringify(toDos));
      this.loadTodo(toDos);
      document.querySelector(".type-task").value = "";
    }
  };

  static editTodo = (id) => {
    const toDos = display.getTodo();
    const findTodo = toDos.find((item, index) => index === id);
    document.querySelector(".type-task").value = findTodo.text;
    isEdit = true;
    editId = id;
  };

  static editEvent = () => {
    const editButton = document.querySelectorAll(".edit-btn");
    editButton.forEach((task, i) => {
      task.addEventListener("click", (ev) => {
        ev.preventDefault();
        this.editTodo(i);
      });
    });
  };
}
