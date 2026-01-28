import { SetData } from "../../utils/storage";
import { UpdateHeadetTodo } from "./UpdateHeaderTodo";

export class TaskCard{
    constructor({ cardElement, modalInstance }) {
        this.cardElement = cardElement;
        this.modal = modalInstance; // экземпляр класса TaskCreateModal
        this.btnEdit = this.cardElement.querySelector('.btn__task_edit')
        this.btnDelete = this.cardElement.querySelector('.btn__task_delete')

        this.initCard();
    }

    initCard() {
        if (this.btnDelete) {
            this.btnDelete.addEventListener('click', (event) => this.handleClickBtnDeleteCard(event))
        }

        if(this.btnEdit) {
            this.btnEdit.addEventListener('click',() => this.handleClickBtnEditCard())
        }
    }

    handleClickBtnDeleteCard(event) {
     const cardElement = event.target.closest('.task')
     const cardId = cardElement.id
     this.modal.data = this.modal.data.filter(item => item.id !== cardId)
     SetData(this.modal.data)
     this.cardElement.remove()
     UpdateHeadetTodo(this.modal.data)
    }

    handleClickBtnEditCard() {
        this.modal.openModal()
    }
}