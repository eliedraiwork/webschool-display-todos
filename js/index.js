'use strict';

function buildTodoCard(todo) {
	const todoCard = document.createElement('div');
	todoCard.innerText = JSON.stringify(todo);
	return todoCard;
}

function buildTodoItem(todo) {
	const itemDiv = document.createElement('div');
	itemDiv.classList.add('item-todo');

	if (todo.completed) {
		itemDiv.classList.add('done');
	} else {
		itemDiv.classList.add('not-done');
	}

	const h2Id = document.createElement('h2');
	h2Id.innerText = todo.id;
	itemDiv.appendChild(h2Id);

	itemDiv.addEventListener('click', (event) => {
		getSingleTodo(todo.id).then((singleTodo) => {
			document.querySelector('#card-todo').innerText = '';
			document
				.querySelector('#card-todo')
				.appendChild(buildTodoCard(singleTodo));
		});
	});
	return itemDiv;
}

async function getSingleTodo(id) {
	return fetch('https://jsonplaceholder.typicode.com/todos/' + id)
		.then((res) => res.json())
		.catch((err) => {
			console.log(err);
			return {};
		});
}

async function getTodoList() {
	return fetch('https://jsonplaceholder.typicode.com/todos')
		.then((res) => res.json())
		.catch((err) => {
			console.log(err);
			return [];
		});
}

async function main() {
	const todos = await getTodoList();

	todos.forEach((todo) => {
		document.querySelector('#div-list-todos').appendChild(buildTodoItem(todo));
	});
}

main();
