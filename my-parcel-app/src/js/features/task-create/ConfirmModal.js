export class ConfirmModal {
  constructor(modalSelector) {
    this.modal = document.querySelector(modalSelector);
    if (!this.modal) return;

    this.title = this.modal.querySelector('.modal-title');
    this.body = this.modal.querySelector('.modal__info');
    this.btnOk = this.modal.querySelector('.modal__btn_ok');
    this.btnCancel = this.modal.querySelector('.modal__btn_cancel');
    this.btnConfirm = this.modal.querySelector('.modal__btn_confirm');
    this.onConfirm = null

    this.btnOk?.addEventListener('click', () => {
      this.close();
    })
    
    this.btnCancel?.addEventListener('click', () => {
      this.close();
    })
    
    this.btnConfirm?.addEventListener('click', () => {
        const callback = this.onConfirm
        this.close()
        if (callback) callback()
    })

    this.modal.addEventListener('click', (event) => {
      if (event.target === this.modal) {
        this.close();
      }
    })
    }

  showLimitExceeded() {
    if (this.title) this.title.textContent = 'Limit Exceeded!';
    if (this.body) this.body.textContent = ' You can have up to 6 tasks in "In Progress. Please complete or move some tasks first.'

    
    this.btnOk.style.display = 'block';
    this.btnCancel.style.display = 'none';
    this.btnConfirm.style.display = 'none';
    
    this.open();
  }

  showDeleteConfirmation(onConfirm) {
    if (this.title) this.title.textContent = 'Warning!';
    if (this.body) this.body.textContent = 'Are you sure you want to delete all completed tasks?';
    
    this.btnOk.style.display = 'none';
    this.btnCancel.style.display = 'inline-block';
    this.btnConfirm.style.display = 'inline-block';
    
    this.onConfirm = onConfirm;
    this.open();
  }

  open() {
    this.modal.classList.add('show');
  }

  close() {
    this.modal.classList.remove('show');
    this.onConfirm = null;
  }
}