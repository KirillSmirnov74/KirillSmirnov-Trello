import { UpdateTime } from './utils/time.js';
import { TaskCreateModal } from './features/task-create/TaskCreateModal.js';
import { TaskCard } from './features/task-create/TaskCard.js';
import { GetData } from './utils/storage.js';
import { renderTaskCard } from './features/task-create/renderTaskCard.js';
import { UpdateHeadetTodo } from './features/task-create/UpdateHeaderTodo.js';
import { ConfirmModal } from './features/task-create/ConfirmModal.js';




document.addEventListener('DOMContentLoaded', () => {
  const columnCountTodo = document.querySelector('.count-todo')
  const inProgressContainer = document.querySelector('.column__tasks_in-progress')
  const todoContainer = document.querySelector('.column__tasks_todo')
  const doneContainer = document.querySelector('.column__tasks_done')

  const data = GetData()
  UpdateHeadetTodo(
    data,
    '.column__count_todo',
    '.column__count_in-progress',
    '.column__count_done'
  )

  UpdateTime()
  setInterval(UpdateTime, 60000)
  const confirmModal = new ConfirmModal('#confirmModal')

  const taskModal = new TaskCreateModal({
    addBtnSelector: '.column__btn_add',
    modalSelector: '.modal__todo',
    cancelBtnSelector: '.modal__btn_cancel',
    formSelector: '.modal__form',
    modalMenuSelector: '.modal__menu',
    dropdownToggleSelector: '.modal__dropdown-toggle',
    confirmBtnSelector: '.modal__btn_confirm',
    tasksContainerSelector: '.column__tasks_todo',
    doneContSelector: '.column__tasks_done',
    clearBtnSelector: '.modal__btn_clear',
    initialData: data,
  })

  taskModal.onTaskCreated = (cardElement) => {
    new TaskCard({
      cardElement: cardElement,
      modalInstance: taskModal,
      inProgressContainer,
      todoContainer,
      doneContainer,
      confirmModal
    })
  }

  taskModal.onTaskEdited = (taskId, newData) => {
    const card = document.getElementById(taskId);
    if (!card) return;

    card.querySelector('.task__title').textContent = newData.title;
    card.querySelector('.task__description').textContent = newData.description;

    const userEl = card.querySelector('.task__user');
    if (userEl) {
      userEl.textContent = newData.assignedTo || 'Не назначен';
    }

    const bgColor = newData.color || '#f1f5f9';
    card.style.backgroundColor = bgColor;
  };


  const deleteAllBtn = document.querySelector('.column__btn_delete')
  deleteAllBtn?.addEventListener('click', (event) => {
    event.preventDefault()

    confirmModal.showDeleteConfirmation(() => {
      taskModal.handleClickBtnDeleteAll()
    })
  })

  data.forEach(task => {
    let container;

    if (task.status === 'in-progress') {
      container = inProgressContainer;
    } else if (task.status === 'done') {
      container = doneContainer;
    } else {
      container = todoContainer;
    }

    if (container) {
      container.insertAdjacentHTML('beforeend', renderTaskCard(task))
      const cardElement = container.lastElementChild;

      if (cardElement) {
        new TaskCard({
          cardElement,
          modalInstance: taskModal,
          inProgressContainer,
          doneContainer,
          todoContainer,
          confirmModal: confirmModal,
        });
      }
    }
  })
})













