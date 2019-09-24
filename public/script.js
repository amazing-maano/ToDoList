let tasks, deletetask, update;

let taskdelete = function(tag){
	fetch('/deleteTask/'+tag.className,{method: 'DELETE'});
	window.location.href = "/";
}
let redirect = function(tag){
	console.log(tag.className)
	window.location = "/tasks/update/" + tag.className;
}

function addNewTask(tag){
		if(document.getElementById('new-task').style.display === 'block'){
			document.getElementById('new-task').style.display = 'none';
			tag.innerHTML = 'Add New Task';
		}else{
			document.getElementById('new-task').style.display = 'block';
			tag.innerHTML = 'Close';
		}
	
	}
window.onload = () => {
	tasks = document.getElementById('tasks');

	fetch('/main').then((res)=>{
		res.json().then((data)=>{
			data.forEach((item)=>{
				tasks.innerHTML += `<p class='task-item'>${item.info}</p><button class=${item._id} onclick="redirect(this); openForm()">Edit</button><button onclick='taskdelete(this)' class=${item._id}>Delete</button> <br/>`
			})
		})
	})
}

function openForm() {
	document.getElementById("myForm").style.display = "block";
  }

