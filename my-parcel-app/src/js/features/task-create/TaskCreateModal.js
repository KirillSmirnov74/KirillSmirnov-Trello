import { renderTaskCard } from "./renderTaskCard";
const users = [
  { id: 1, name: 'Ivan' },
  { id: 2, name: 'Polina' },
  { id: 3, name: 'Alex' },
  { id: 4, name: 'Sergei' },
  { id: 5, name: 'Vitalii' }
];
export class TaskCreateModal {
    constructor({
        addBtnSelector,
        modalSelector,
        cancelBtnSelector,
        modalMenuSelector,
        dropdownToggleSelector,
        formSelector,
        confirmBtnSelector,
        tasksContainerSelector,

    }) {
    
        this.addBtn = document.querySelector(addBtnSelector);
        this.modal = document.querySelector(modalSelector);
        this.cancelBtn = document.querySelector(cancelBtnSelector);
        this.modalMenu  = document.querySelector(modalMenuSelector);
        this.dropdownToggle = document.querySelector(dropdownToggleSelector);
        this.form = document.querySelector(formSelector);
        this.btnConfirm = document.querySelector(confirmBtnSelector);
        this.tasksContainer = document.querySelector(tasksContainerSelector);
        this.selectedUser = null;
        this.arrayUser = users

        if (!this.addBtn || !this.modal) {
            console.warn('TaskCreateModal: не найдены необходимые элементы');
            return;
        }

        this.initModal()
    }

   initModal() {
        this.createlistUsers(users)
        this.addBtn.addEventListener('click', () => this.openModal());
        this.modalMenu.addEventListener('click',(event) => this.chooseUser(event))

        if (this.cancelBtn) {
            this.cancelBtn.addEventListener('click', () => this.closeModal());
        }

        if (this.dropdownToggle && this.modalMenu) {
            this.dropdownToggle.addEventListener('click', () => {
            this.modalMenu.classList.toggle('show');
        });

      if (this.form) {
        this.form.addEventListener('submit',(event) => {
            this.handleFormSubmit(event)
        })
      }
    }
    }

    openModal() {
        this.modal.classList.add('show')
    }

    closeModal() {
        this.modal.classList.remove('show')
        this.form.querySelector('.modal__input_title').value = ''
        this.form.querySelector('.modal__input_description').value = ''
        const textSpan = this.dropdownToggle.querySelector('span')
        if (textSpan) {
            textSpan.textContent = 'Select user'
        } 
        this.selectedUser = null
    }

    openModalMenu() {
        this.modalMenu.classList.add('show')
    }

    closeModalMenu() {
        this.modalMenu.classList.remove('show')
    }

    handleFormSubmit(event) {
        event.preventDefault()

        
        const now = new Date()
        const titleValue = this.form.querySelector('.modal__input_title').value.trim()
        const descriptionValue = this.form.querySelector('.modal__input_description').value.trim()
        const minutes = String(now.getMinutes()).padStart(2,'0')
        const hours = String(now.getHours()).padStart(2,'0')

        if (titleValue === '' || descriptionValue === '') return

        const todo = {
            id: crypto.randomUUID(),
            title: titleValue,
            description: descriptionValue,
            isChecked: false,
            timeNow: `${hours}:${minutes}`,
            assignedTo: this.selectedUser?.name || null,    
            assignedUserId: this.selectedUser?.id || null,
        }

       
        this.tasksContainer.insertAdjacentHTML('beforeend',renderTaskCard(todo))

        const cardElement = document.getElementById(todo.id)

        if (cardElement && typeof this.onTaskCreated === 'function') {
            this.onTaskCreated(cardElement, todo)
        }
        
        this.closeModal()
    }

    createlistUsers(users) {
        users.forEach(user => {
            const li = document.createElement('li')
            const a = document.createElement('a')
            a.classList.add('dropdown-item')
            a.href = '#'
            a.textContent = user.name
            li.append(a)
            this.modalMenu.append(li)
        });
    }

 chooseUser(event) {
  if (!event.target.classList.contains('dropdown-item')) return;

  event.preventDefault();
  const userName = event.target.textContent;
  const userId = users.find(u => u.name === userName)?.id;

  this.selectedUser = { id: userId, name: userName };

  const textSpan = this.dropdownToggle.querySelector('span');
  if (textSpan) textSpan.textContent = userName;

  this.closeModalMenu();
}

}

