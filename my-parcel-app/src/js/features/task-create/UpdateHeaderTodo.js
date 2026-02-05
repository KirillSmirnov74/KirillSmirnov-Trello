export function UpdateHeadetTodo(arr, todoContSelector, inProgContSelector, doneContSelector) {
  const counterTodoElement = document.querySelector(todoContSelector)
  const counterInProgress = document.querySelector(inProgContSelector)
  const counterDone = document.querySelector(doneContSelector)

  if (counterTodoElement) {
    const todoCount = arr.filter(task => task.status === 'todo').length;
    counterTodoElement.textContent = todoCount
  }

  if (counterInProgress) {
    const inProgCount = arr.filter(task => task.status === 'in-progress').length
    counterInProgress.textContent = inProgCount
  }

  if (counterDone) {
    const doneCount = arr.filter(task => task.status === 'done').length
    counterDone.textContent = doneCount
  }
}