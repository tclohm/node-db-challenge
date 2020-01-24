const db = require('../data/db-config.js');

//adding resources.
//retrieving a list of resources.
//adding projects.
//retrieving a list of projects.
//adding tasks.
//retrieving a list of tasks. The list of tasks should include the project name and project description.

module.exports = {
	addResources,
	getResources,
	addProjects,
	getProjects,
	addTasks,
	getTasks,
};

function addResources(data) {
	return db('resources').insert(data);

}

function getResources() {
	return db('resources');
}

function addProjects(data) {
	return db('projects').insert(data);
}

function getProjects() {
	return db('projects');
}

function addTasks(data) {
	return db('tasks').insert(data);
}

function getTasks() {
	return db('tasks')
	.join('projects', 'tasks.project_id', 'projects.id')
	.select('projects.name as project_name', 'projects.description as project_description', 'tasks.description', 'tasks.notes', 'tasks.completed');

}