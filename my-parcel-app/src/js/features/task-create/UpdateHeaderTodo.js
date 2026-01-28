export function UpdateHeadetTodo(arr) {
  const counter = document.querySelector('.count-todo');
  if (counter) {
    counter.textContent = arr.length;
  }
}