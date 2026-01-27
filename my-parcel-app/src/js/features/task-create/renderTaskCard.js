 export function renderTaskCard({id,title,description,timeNow,assignedTo}) {
  const userDisplay = assignedTo ?? 'Не выбран'
    return `<div id="${id}" class="task">
            <h3 class="task__title text-break">${title}</h3>
            <p class="task__description text-break">${description}</p>
            <div class="task__info">
              <p class="task__user">${userDisplay}</p>
              <p class="task__time fst-italic fw-semibold">${timeNow}</p>
            </div>
            <div class="task__actions">
              <div class="task__btns">
                <button type="button" class="btn btn-primary btn__task_edit">Edit</button>
                <button type="button" class="btn btn-primary btn__task_delete">Delete</button>
              </div>
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Move to
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </div>
            </div>
          </div>
          `
}