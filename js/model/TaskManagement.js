class TaskManagement {
  constructor(list) {
    this.taskList = list;
  }
  getTaskList() {
    return this.taskList;
  }
  addTask(task) {
    this.taskList.push(task);
  }
  deleteTask(id) {
    const deletedIdx = this.findIndexById(id);
    this.taskList.splice(deletedIdx, 1);
  }
  setStatus(id, status) {
    const updatedIdx = this.findIndexById(id);
    this.taskList[updatedIdx].status = status;
  }
  findIndexById(id) {
    return this.taskList.findIndex((task) => id == task.id);
  }
}
