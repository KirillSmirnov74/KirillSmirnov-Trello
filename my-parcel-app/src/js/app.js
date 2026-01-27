import { UpdateTime } from './utils/time.js';
import { TaskCreateModal } from './features/task-create/TaskCreateModal.js';
import { TaskCard } from './features/task-create/TaskCard.js';



document.addEventListener('DOMContentLoaded',() => {
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
    })

    taskModal.onTaskCreated = (cardElement,taskData) => {
        new TaskCard({
            cardElement: cardElement,
            modalInstance: taskModal,
            taskData: taskData
        })
    }

    

    
})










