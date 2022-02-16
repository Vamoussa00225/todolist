
var toDo

window.addEventListener("load", () => {
	toDo = new toDoClass();
});

class toDoClass{
	constructor(){
		this.tasks = JSON.parse(localStorage.getItem('TASKS'));
		if (!this.tasks){
			this.tasks = [];
		}
		this.loadTasks();
		this.addEventListeners();
	};

	addEventListeners(){
		document.getElementById('addTask').addEventListener('keypress', event =>{
			if(event.keyCode === 13){
				this.addTask(event.target.value);
				event.target.value = "";
			}
		})

	}

	loadTasks(){
		let tasksHtml = this.tasks.reduce((html,task,index) => html += this.generateHTML(task, index), "");
		document.getElementById("list").innerHTML = tasksHtml;
		localStorage.setItem('TASKS', JSON.stringify(this.tasks));
	};

	generateHTML(task, index){
		return `
		<li class="task">
			<div ><label><input type="checkbox" value="" class=""></label></div>
			<div style=" margin-left: 0; flex-grow: 2; text-align: center;"> <p>${task.task}</p></div>
			<div class="trash" ><a onClick="toDo.delTask(event, ${index})" href="google.com"><img src="trash.png"/ class="img"></a></div>                                                           
		</li>
		`
	};

	addTaskClick(){
		let target = document.getElementById("addTask");
		this.addTask(target.value);
		target.value = ""
	}

	addTask(task){
		let newTask = {
			task
		};
		let parentDiv = document.getElementById("addTask").parentElement;
		if(task === ''){
			parentDiv.classList.add('has-error');
		}
		else {
			parentDiv.classList.remove('has-error');
			this.tasks.unshift(newTask);
			this.loadTasks();
		}
	}

	delTask(event, taskIndex){
		event.preventDefault();
		this.tasks.splice(taskIndex, 1);
		this.loadTasks();
	}
}