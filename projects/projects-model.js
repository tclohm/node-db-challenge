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
	getResourcesById,
	addProjects,
	getProjects,
	getProjectById,
	addTasks,
	getTasks,
	getTasksById
};

function addResources(data) {
	return db('resources').insert(data);
}

function getResources() {
	return db('resources');
}

function getResourcesById(project_id) {
	return db('resources-projects as rp')
			.join('resources as r', 'rp.resource_id', 'r.id')
			.where('rp.project_id', project_id)
			.select('r.id', 'r.name', 'r.description');
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

function getTasksById(project_id) {
	return db('tasks as t')
		.where("t.project_id", project_id)
		.select("t.id", "t.description", "t.notes", "t.completed");
}

function getProjectById(id) {
	return db('tasks')
		.where('project_id', id)
		.select('id', 'description', 'notes', 'completed')
		.then(tasks => {
			return db('resources-projects as rp')
				.where('project_id', id)
				.join('resources as r', 'rp.resource_id', 'r.id')
				.select('r.id', 'r.name', 'r.description')
				.then(resources => {
					return db('projects')
						.where('id', id)
						.first()
						.then(project => {
							return {
								...project,
								tasks,
								resources
							}
						})
				})
		})
	if(id) {
		return db('resources-projects as rp')
			.leftJoin('resources as r', 'r.id', 'rp.resource_id')
			.leftJoin('projects as p', 'rp.project_id', 'p.id')
			.where('rp.id', id)
			.select('p.id', 'p.name as name', 'p.description', 'p.completed', 'r.id as resources');
	}
	return null
}

function getProjectByIdentifer(project_id) {
	return db()
}