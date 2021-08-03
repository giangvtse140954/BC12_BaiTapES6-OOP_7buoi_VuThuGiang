const addButton = document.getElementById('addItem');
const sortDown = document.getElementById('two');
const sortUp = document.getElementById('three');
const d = new Date();

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const time = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
const taskList = [
  new Task(1, 'make a call', time, 'progressing'),
  new Task(2, 'go to cinema', time, 'progressing'),
  new Task(3, 'do yoga', time, 'progressing'),
  new Task(4, 'buy some food', time, 'completed'),
  new Task(5, 'do homework', time, 'deleted'),
];
const taskManagement = new TaskManagement(taskList);

document.querySelector('.card__title p').innerHTML = time;

addButton.addEventListener('click', () => {
  const content = document.getElementById('newTask').value;
  if (content === '') {
    activateToast();
  } else {
    document.getElementById('newTask').value = '';
    const task = new Task(Date.now(), content, time, 'progressing');
    taskManagement.addTask(task);

    renderTask();
  }
});
sortDown.addEventListener('click', () => {
  const sortedList = taskManagement.getTaskList().sort((a, b) => {
    let orderBool = a.content > b.content;
    return orderBool ? 1 : -1;
  });
  const str = sortedList
    .map((task) => {
      if (task.status === 'progressing') {
        return `
    <li>
      ${task.content}
      <span class="todo__action">
        <i class="fa fa-trash-alt" onclick="deleteTask('${task.id}')"></i>
        <i class="fa fa-check-circle" onclick="updateStatus('${task.id}', '${task.status}')"></i>
      </span>
    </li>
  `;
      }
    })
    .join('');
  document.getElementById('todo').innerHTML = str;
});
sortUp.addEventListener('click', () => {
  const sortedList = taskManagement.getTaskList().sort((a, b) => {
    let orderBool = a.content < b.content;
    return orderBool ? 1 : -1;
  });
  const str = sortedList
    .map((task) => {
      if (task.status === 'progressing') {
        return `
    <li>
      ${task.content}
      <span class="todo__action">
        <i class="fa fa-trash-alt" onclick="deleteTask('${task.id}')"></i>
        <i class="fa fa-check-circle" onclick="updateStatus('${task.id}', '${task.status}')"></i>
      </span>
    </li>
  `;
      }
    })
    .join('');
  document.getElementById('todo').innerHTML = str;
});
function activateToast() {
  var x = document.getElementById('snackbar');
  x.className = 'show';
  setTimeout(function () {
    x.className = x.className.replace('show', '');
  }, 3000);
}
function renderTask() {
  const tasks = taskManagement.getTaskList();
  let progressingHtml = '';
  let completedHtml = '';
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.status === 'progressing') {
      progressingHtml += `
      <li>
        ${task.content}
        <span class="todo__action">
          <i class="fa fa-trash-alt" onclick="deleteTask('${task.id}')"></i>
          <i class="fa fa-check-circle" onclick="updateStatus('${task.id}', '${task.status}')"></i>
        </span>
      </li>
    `;
    } else if (task.status === 'completed') {
      completedHtml += `
      <li>
        ${task.content}
        <span class="todo__action">
          <i class="fa fa-trash-alt" onclick="deleteTask('${task.id}')"></i>
          <i class="fa fa-check-circle" onclick="updateStatus('${task.id}', '${task.status}')"></i>
        </span>
      </li>
    `;
    }
  }
  document.getElementById('completed').innerHTML = completedHtml;
  document.getElementById('todo').innerHTML = progressingHtml;
}
function deleteTask(id) {
  taskManagement.deleteTask(id);
  renderTask();
}
function updateStatus(id, status) {
  if (status === 'progressing') taskManagement.setStatus(id, 'completed');
  else if (status === 'completed') taskManagement.setStatus(id, 'progressing');
  renderTask();
}
renderTask();
