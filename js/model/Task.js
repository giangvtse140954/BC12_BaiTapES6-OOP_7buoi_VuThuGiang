class Task {
  constructor(id, content, time, status) {
    this.id = id;
    this.content = content;
    this.time = time;
    this.status = status;
  }
  setStatus = (status) => {
    this.status = status;
  };
}
