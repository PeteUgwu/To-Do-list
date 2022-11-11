/* eslint-disable quotes */
const InnerTodo = document.querySelector(".todo-inner");

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
      <i class=" vertical-menu fa-solid fa-ellipsis-vertical"></i>
      </div>
    </div>
    <hr />`;
    });
    InnerTodo.innerHTML = display;
    this.addRemoveEvent();
  };

  static addTodo = () => {
    const text = document.querySelector(".type-task").value;
    if (text !== "") {
      const newInput = { text, completed: false };
      const toDos = display.getTodo();
      toDos.push(newInput);
      localStorage.setItem("todo", JSON.stringify(toDos));
      this.loadTodo(toDos);
    }
  };
}
