const timeElement = document.querySelector('.board__time')

function UpdateTime() {

    if (!timeElement) return
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0'); 
    const minutes = String(now.getMinutes()).padStart(2,'0')
    timeElement.textContent = `${hours}:${minutes}`
}



export {UpdateTime}