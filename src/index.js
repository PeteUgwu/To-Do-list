/* eslint-disable quotes */
import "./style.css";
import display from "./todo.js";

const edittodoForm = document.querySelector("#edit-todo-item");
const enterBtn = document.querySelector(".enter-btn");
const editTodoFormInput = document.querySelector(".todo-edit-input");

window.addEventListener("DOMContentLoaded", () => {
  const task = display.getTodo();
  display.loadTodo(task);
});

enterBtn.addEventListener("click", () => {
  display.addTodo();
});

edittodoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = Number(editTodoFormInput.getAttribute("id"));
  display.updateTaskInput(editTodoFormInput.value, id);
  editTodoFormInput.value = "";
  document.querySelector(".type-task").style.display = "block";
  edittodoForm.style.display = "none";
});
