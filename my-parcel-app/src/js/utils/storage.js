export function SetData(data) {
    localStorage.setItem('tasks', JSON.stringify(data))
}

export function GetData() {
    let result = localStorage.getItem('tasks')
    return result ? JSON.parse(result) : []
}
