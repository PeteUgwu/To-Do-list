/* eslint-disable quotes */
import "./style.css";
import display from "./todo.js";

const enterBtn = document.querySelector(".enter-btn");

window.addEventListener("DOMContentLoaded", () => {
  const task = display.getTodo();
  display.loadTodo(task);
});

enterBtn.addEventListener("click", () => {
  display.addTodo();
});
