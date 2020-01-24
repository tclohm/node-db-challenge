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
	if(data.length > 1) {
		return data.map(resource => {
			return db('resources').insert(resource);
		});
	} else {
		return db('resources').insert(data);
	}
}

function getResources() {
	return db('resources');
}

function addProjects(data) {
	if(data.length > 1) {
		return data.map(project => {
			return db('projects').insert(project);
		});
	} else {
		return db('projects').insert(data);
	}
}

function getProjects() {
	return db('projects');
}

function addTasks(data) {
	if(data.length > 1) {
		return data.map(task => {
			return db('tasks').insert(task);
		});
	} else {
		return db('tasks').insert(task);
	}
}

function getTasks() {
	return db('tasks')
	.join('projects', 'tasks.project_id', 'projects.id')
	.select('project.name', 'project.description', 'tasks.description', 'tasks.notes', 'tasks.completed');

}