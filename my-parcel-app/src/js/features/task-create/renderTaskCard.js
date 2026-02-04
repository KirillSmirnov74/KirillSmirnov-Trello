export function renderTaskCard({ id, title, description, timeNow, assignedTo, status = 'todo',color = '#f1f5f9' }) {
  const userDisplay = assignedTo ?? 'Не выбран'
  const bgColor = color

  let dropdownItems = '';
  
  if (status === 'todo') {
    dropdownItems = `
      <li><a class="dropdown-item" href="#">In Progress</a></li>
      <li><a class="dropdown-item" href="#">Done</a></li>
    `;
  } else if (status === 'in-progress') {
    dropdownItems = `
      <li><a class="dropdown-item" href="#">Todo</a></li>
      <li><a class="dropdown-item" href="#">Done</a></li>
    `;
  } else if (status === 'done') {
    dropdownItems = `
      <li><a class="dropdown-item" href="#">Todo</a></li>
      <li><a class="dropdown-item" href="#">In Progress</a></li>
    `;
  }

  return `
    <div id="${id}" class="task" style="background-color: ${bgColor}">
      <h3 class="task__title text-break">${title}</h3>
      <p class="task__description text-break">${description}</p>
      <div class="task__info">
        <p class="task__user">${userDisplay}</p>
        <time class="task__time fst-italic fw-semibold">${timeNow}</time>
      </div>
      <div class="task__actions">
        <div class="task__btns">
          <button type="button" class="btn__task_edit">Edit</button>
          <button type="button" class="btn__task_delete">Delete</button>
        </div>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Move to
          </button>
          <ul class="dropdown-menu">
            ${dropdownItems}
          </ul>
        </div>
      </div>
    </div>
  `;
}