import { renderTaskCard } from "./renderTaskCard";
import { SetData } from "../../utils/storage";
import { UpdateHeadetTodo } from "./UpdateHeaderTodo";
import { TASK_COLORS } from "../../utils/colors";

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
        deleteAllBtnSelector,
        doneContSelector,
        clearBtnSelector,
        initialData = []

    }) {
    
        this.addBtn = document.querySelector(addBtnSelector);
        this.modal = document.querySelector(modalSelector);
        this.cancelBtn = document.querySelector(cancelBtnSelector);
        this.modalMenu  = document.querySelector(modalMenuSelector);
        this.dropdownToggle = document.querySelector(dropdownToggleSelector);
        this.form = document.querySelector(formSelector);
        this.btnConfirm = document.querySelector(confirmBtnSelector);
        this.tasksContainer = document.querySelector(tasksContainerSelector);
        this.deleteAllDoneBtn = document.querySelector(deleteAllBtnSelector);
        this.doneContainer = document.querySelector(doneContSelector);
        this.clearBtn = document.querySelector(clearBtnSelector)
        this.colorToggle = document.querySelector('.modal__dropdown-toggle-color');
        this.colorMenu = document.querySelector('.modal__menu-color');
        this.selectedColor = TASK_COLORS[0].value; // по умолчанию серый
        this.selectedUser = null;
        this.currentTaskId = null;
        this.mode = 'create';
        this.arrayUser = users
        this.data = Array.isArray(initialData) ? [...initialData] : [];

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
        })
        }

        if (this.form) {
        this.form.addEventListener('submit',(event) => {
            this.handleFormSubmit(event)
        })
        }

        if (this.clearBtn) {
            this.clearBtn.addEventListener('click',() => this.clearForm())
        }

        if (this.colorToggle && this.colorMenu) {
            this.createColorList();
            this.colorToggle.addEventListener('click', () => this.toggleColorMenu());
            this.colorMenu.addEventListener('click', (e) => this.chooseColor(e));

            this.colorMenu.addEventListener('mouseover', (e) => {
            const btn = e.target.closest('button');
            if (btn && btn.dataset.color) {
                this.previewColor(btn.dataset.color);
             }
            })

            this.colorMenu.addEventListener('mouseleave', () => {
            this.previewColor(this.selectedColor);
        })

        document.addEventListener('click', (e) => {
        if (
            !this.colorToggle.contains(e.target) &&
            !this.colorMenu.contains(e.target)
        ) {
        this.closeColorMenu();
        this.previewColor(this.selectedColor);
        }
        })
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
        this.mode = 'create';
        this.currentTaskId = null;
        this.selectedColor = TASK_COLORS[0].value;
        this.applyColor(); // вернуть фон к серому
    }

    openModalMenu() {
        this.modalMenu.classList.add('show')
    }

    closeModalMenu() {
        this.modalMenu.classList.remove('show')
    }

    handleFormSubmit(event) {
        event.preventDefault()
        if(this.mode == 'create') {
            this.handleCreate()
        } else {
            this.handleEdit(event)
        }
    }

    handleCreate() {

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
            status: 'todo',
            timeNow: `${hours}:${minutes}`,
            assignedTo: this.selectedUser?.name || null,    
            assignedUserId: this.selectedUser?.id || null,
            color: this.selectedColor
        }

        this.tasksContainer.insertAdjacentHTML('beforeend',renderTaskCard(todo))

        const cardElement = document.getElementById(todo.id)

        if (cardElement && typeof this.onTaskCreated === 'function') {
            this.onTaskCreated(cardElement, todo)
        }  
        this.data.push(todo)
        SetData(this.data)
        UpdateHeadetTodo(
            this.data,
            '.column__count_todo',
            '.column__count_in-progress',
            '.column__count_done'
        )
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

handleEdit() {
    const titleValue = this.form.querySelector('.modal__input_title').value.trim();
    const desValue = this.form.querySelector('.modal__input_description').value.trim();
    if (!titleValue || !desValue) return;


    const taskIndex = this.data.findIndex(task => task.id === this.currentTaskId);
    if (taskIndex === -1) return;

    this.data[taskIndex] = {
        ...this.data[taskIndex],
        title: titleValue,
        description: desValue,
        assignedTo: this.selectedUser?.name || null,
        assignedUserId: this.selectedUser?.id || null,
        color: this.selectedColor
    };

    SetData(this.data);
    UpdateHeadetTodo(
        this.data,
        '.column__count_todo',
        '.column__count_in-progress',
        '.column__count_done'
    )

    if (typeof this.onTaskEdited === 'function') {
        this.onTaskEdited(this.currentTaskId, this.data[taskIndex]);
    }

    this.closeModal();
} 

openEditModal(task) {
  this.mode = 'edit';
  this.currentTaskId = task.id;

  // Заполняем поля формы
  this.form.querySelector('.modal__input_title').value = task.title;
  this.form.querySelector('.modal__input_description').value = task.description;

  // Выбираем пользователя
  if (task.assignedTo) {
    this.selectedUser = { id: task.assignedUserId, name: task.assignedTo };
    const textSpan = this.dropdownToggle.querySelector('span');
    if (textSpan) textSpan.textContent = task.assignedTo;
  }

  // 🔑 Устанавливаем цвет
  this.selectedColor = task.color || TASK_COLORS[0].value;
  this.applyColor(); // обновляем фон модалки

  this.openModal();
}



handleClickBtnDeleteAll() {
  this.doneContainer.innerHTML = ''
  this.data = this.data.filter(task => task.status !== 'done')
  SetData(this.data)

  UpdateHeadetTodo(
    this.data,
    '.column__count_todo',
    '.column__count_in-progress',
    '.column__count_done'
  )
}

clearForm() {
    const inputTitleElement = this.modal.querySelector('.modal__input_title')
    const inputDescriptionElement = this.modal.querySelector('.modal__input_description')

    if (inputTitleElement) inputTitleElement.value = ''
    if (inputDescriptionElement) inputDescriptionElement.value = ''

    this.selectedUser = null;
    const textSpan = this.dropdownToggle?.querySelector('span');
    if (textSpan) textSpan.textContent = 'Select user'

}
// Генерация списка цветов
createColorList() {
  this.colorMenu.innerHTML = '';
  TASK_COLORS.forEach(color => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'dropdown-item w-full text-left px-3 py-2 hover:bg-gray-100';
    button.dataset.color = color.value;
    button.textContent = color.name;
    li.appendChild(button);
    this.colorMenu.appendChild(li);
  });
}

// Предпросмотр цвета
previewColor(color) {
  this.modal.style.backgroundColor = color;
}

// Применить выбранный цвет
applyColor() {
  this.previewColor(this.selectedColor);
}

// Обработчик выбора цвета
chooseColor(event) {
  const button = event.target.closest('button');
  if (!button || !button.dataset.color) return;

  this.selectedColor = button.dataset.color;
  this.applyColor();
  this.closeColorMenu();
}

// Открытие/закрытие меню цветов
toggleColorMenu() {
  this.colorMenu.classList.toggle('show');
}

closeColorMenu() {
  this.colorMenu.classList.remove('show');
}
    
}

