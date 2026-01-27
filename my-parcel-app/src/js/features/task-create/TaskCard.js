import { TaskCreateModal } from "./TaskCreateModal";

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
            this.btnDelete.addEventListener('click', () => this.handleClickBtnDeleteCard())
        }

        if(this.btnEdit) {
            this.btnEdit.addEventListener('click',() => this.handleClickBtnEditCard())
        }
    }

    handleClickBtnDeleteCard() {
       this.cardElement.remove()
    }

    handleClickBtnEditCard() {
        this.modal.openModal()
    }
      


}