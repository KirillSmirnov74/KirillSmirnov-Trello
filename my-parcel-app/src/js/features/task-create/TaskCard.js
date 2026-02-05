import { SetData } from "../../utils/storage";
import { UpdateHeadetTodo } from "./UpdateHeaderTodo";

export class TaskCard {
  constructor({
    cardElement,
    modalInstance,
    inProgressContainer,
    todoContainer,
    doneContainer,
    confirmModal,
  }) {
    this.cardElement = cardElement;
    this.modal = modalInstance;
    this.btnEdit = this.cardElement.querySelector('.btn__task_edit')
    this.btnDelete = this.cardElement.querySelector('.btn__task_delete')
    this.inProgressContainer = inProgressContainer
    this.todoContainer = todoContainer
    this.doneContainer = doneContainer
    this.confirmModal = confirmModal // экземпляр класса ConfirmModal

    this.initCard()
  }

  initCard() {
    if (this.btnDelete) {
      this.btnDelete.addEventListener('click', (event) => this.handleClickBtnDeleteCard(event))
    }

    if (this.btnEdit) {
      this.btnEdit.addEventListener('click', (event) => this.updateModal(event))
    }

    if (this.cardElement.querySelector('.dropdown-menu')) {
      this.cardElement.querySelector('.dropdown-menu').addEventListener('click', (event) => this.todoMoveTo(event))
    }
  }

  handleClickBtnDeleteCard(event) {
    const cardElement = event.target.closest('.task')
    const cardId = cardElement.id
    this.modal.data = this.modal.data.filter(item => item.id !== cardId)
    SetData(this.modal.data)
    this.cardElement.remove()
    UpdateHeadetTodo(
      this.modal.data,
      '.column__count_todo',
      '.column__count_in-progress',
      '.column__count_done'

    )
  }

  updateModal(event) {
    const cardElement = event.target.closest('.task')
    const inputTitleElement = cardElement.querySelector('.task__title').textContent.trim()
    const inputDescriptionElement = cardElement.querySelector('.task__description').textContent.trim()
    const userName = cardElement.querySelector('.task__user').textContent.trim()

    this.modal.form.querySelector('.modal__dropdown-toggle-text').textContent = userName
    this.modal.form.querySelector('.modal__input_title').value = inputTitleElement
    this.modal.form.querySelector('.modal__input_description').value = inputDescriptionElement
    this.modal.currentTaskId = cardElement.id;
    this.modal.mode = 'edit'
    this.modal.openModal()
  }

  todoMoveTo(event) {
    const text = event.target.textContent.toLowerCase()
    const dropdown = this.cardElement.querySelector('.dropdown-menu')

    if (text.includes('progress')) {
      const task = this.modal.data.find(task => task.id === this.cardElement.id)
      const currentInProgressCount = this.modal.data.filter(task => task.status === 'in-progress').length

      if (currentInProgressCount >= 6) {
        this.confirmModal?.showLimitExceeded()
        return
      }



      if (task) {
        task.status = 'in-progress'
        SetData(this.modal.data);

        UpdateHeadetTodo(
          this.modal.data,
          '.column__count_todo',
          '.column__count_in-progress',
          '.column__count_done'
        );

        dropdown.innerHTML = `
        <li><a class="dropdown-item" href="#">Todo</a></li>
        <li><a class="dropdown-item" href="#">Done</a></li>
      `
      }
      this.inProgressContainer.append(this.cardElement);

    } else if (text.includes('done')) {
      const task = this.modal.data.find(t => t.id === this.cardElement.id)
      if (task) {
        task.status = 'done'
        SetData(this.modal.data)

        UpdateHeadetTodo(
          this.modal.data,
          '.column__count_todo',
          '.column__count_in-progress',
          '.column__count_done'
        );

        dropdown.innerHTML = `
        <li><a class="dropdown-item" href="#">Todo</a></li>
        <li><a class="dropdown-item" href="#">In Progress</a></li>
      `;
      }
      this.doneContainer.append(this.cardElement);
    } else if (text.includes('todo')) {
      const task = this.modal.data.find(t => t.id === this.cardElement.id)
      if (task) {
        task.status = 'todo'
        SetData(this.modal.data);

        UpdateHeadetTodo(
          this.modal.data,
          '.column__count_todo',
          '.column__count_in-progress',
          '.column__count_done'
        );

        dropdown.innerHTML = `
      <li><a class="dropdown-item" href="#">In Progress</a></li>
      <li><a class="dropdown-item" href="#">Done</a></li>
    `
      }
      this.todoContainer.append(this.cardElement);
    }
  }
}