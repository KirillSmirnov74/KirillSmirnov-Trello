import { UpdateTime } from './utils/time.js';
import { TaskCreateModal } from './features/task-create/TaskCreateModal.js';
import { TaskCard } from './features/task-create/TaskCard.js';
import { GetData } from './utils/storage.js';
import { renderTaskCard } from './features/task-create/renderTaskCard.js';




document.addEventListener('DOMContentLoaded',() => {
    const tasksContainer = document.querySelector('.column__tasks')
    const data = GetData()
    UpdateTime()
    setInterval(UpdateTime,60000)

    const taskModal = new TaskCreateModal({
        addBtnSelector: '.column__btn_add',
        modalSelector: '.modal__todo',
        cancelBtnSelector: '.modal__btn_cancel',
        formSelector: '.modal__form',
        modalMenuSelector: '.modal__menu',
        dropdownToggleSelector: '.modal__dropdown-toggle',
        confirmBtnSelector: '.modal__btn_confirm',
        tasksContainerSelector: '.column__tasks',
        initialData: data,
    })

    taskModal.onTaskCreated = (cardElement) => {
        new TaskCard({
            cardElement: cardElement,
            modalInstance: taskModal,
        })
    }

    data.forEach(task => {
    tasksContainer.insertAdjacentHTML('beforeend',renderTaskCard(task))

      const cardElement = document.getElementById(task.id);
        if (cardElement) {
            new TaskCard({
                cardElement: cardElement,
                modalInstance: taskModal,
            });
        }
    });
})













