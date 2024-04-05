// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const dialog = document.getElementById("#addTasks");
const taskNameInput = document.getElementById("#task-name");
const dueDateInput = document.getElementById("#due-date");
const taskDiscriptionInput = document.getElementById("#task-information");

function showTaskInput() {
  dialog.showModal()
}

// Todo: create a function to generate a unique task id
function generateTaskId() {

  let tasks = JSON.parse(localStorage.getItem('tasks'));

  return tasks;
}


function saveTaskstoStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(taskList));
}

// Todo: create a function to create a task card
function createTaskCard(tasks) {
  const taskCard = $('<div>')
  .addClass('card task-card draggable my-3')
  .attr('data-project-id', task.id);
const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
const cardBody = $('<div>').addClass('card-body');
const cardDescription = $('<p>').addClass('card-text').text(task.discription);
const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
const cardDeleteBtn = $('<button>')
  .addClass('btn btn-danger delete')
  .text('Delete')
  .attr('data-project-id', task.id);
cardDeleteBtn.on('click', handleDeleteTask);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  const tasks = readTasksFromStorage();

  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  
  for (let task of tasks) {
    if (task.status === 'to-do') {
      todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
    }
  }

  
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    
    helper: function (e) {
    
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();

  
  const taskName = taskNameInput.val().trim();
  const taskDiscription = taskDiscriptionInput.val().trim();
  const dueDate = dueDateInput.val();

  const newTask = {
    
    name: taskName,
    Discription: taskDiscription,
    dueDate: dueDate,
    status: 'to-do',
  }
  const task = readTasksfromStorage();
  task.push(newTask);

 
  saveTaskstoStorage(task);

  printProjectData();

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  event.preventDefault()
  const taskId = $(this).attr('data-project-id');
  
  tasks.forEach((task) => {
    if (task.id === taskId) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });

 
  saveTaskstoStorage(task);

  
  printProjectData();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

 const tasks = readTasksFromStorage();

 /
 const taskId = ui.draggable[0].dataset.taskId;

 const newStatus = event.target.id;

 for (let task of tasks) {
   
   if (task.id === taskId) {
     task.status = newStatus;
   }
 }
 // ? Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
 localStorage.setItem('tasks', JSON.stringify(tasks));
 printProjectData();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

  printProjectData();

$('.lane').droppable({
  accept: '.draggable',
  drop: handleDrop,
});
});
