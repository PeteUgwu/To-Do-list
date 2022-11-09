/* eslint-disable quotes */
import "./style.css";

const InnerTodo = document.querySelector(".todo-inner");

const ToDo = [
  {
    description: "Will play",
    completed: true,
    i: 0,
  },
  {
    description: "Will Eating",
    completed: true,
    i: 1,
  },
  {
    description: "Wash",
    completed: true,
    i: 2,
  },
  {
    description: "Go to club",
    completed: true,
    i: 3,
  },
];

let display = " ";
const loadTasks = (item) => {
  item.forEach((elem) => {
    display += `
    <div class="todo-check flex">
    <div class="checkbox">
      <input
        type="checkbox"
        id="to-do-check"
        name="To-Do"
        value="Add"
      />
      <label for="todo">${elem.description}</label><br />
    </div>
    <i class="fa-solid fa-ellipsis-vertical"></i>
  </div>
  <hr />`;
  });
  InnerTodo.innerHTML = display;
};
loadTasks(ToDo);
