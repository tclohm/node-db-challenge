const express = require('express');
const helmet = require('helmet');

const Projects = require('./projects-model.js');

const router = express.Router();

function checkAndPost(req, res, method) {
	if(Array.isArray(req.body)) {
		req.body.map(data => {
			method(req.body)
				.then(obj => {
					res.status(200).json(req.body)
				})
				.catch(err => {
					res.status(500).json(err)
				})
		})
	} else {
		const wrappedBody = [req.body]
		wrappedBody.map(data => {
			method(wrappedBody)
				.then(obj => {
					res.status(200).json(req.body)
				})
				.catch(err => {
					res.status(500).json(err)
				})
		})
	}
}

router.get('/projects', (req, res) => {
	Projects.getProjects()
		.then(projects => {
			res.status(200).json(projects);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: '🤔, we can\'t find all the projects' });
		})
});

router.get('/projects/:id', (req, res) => {
	const { id } = req.params;
	if(id) {
		Projects.getProjectById(id)
			.then(project => {
				res.status(200).json(project)
			})
			.catch(err => {
				res.status(500).json({ message: 'not happening!' })
			})
	} else {
		res.status(400).json({ message: '👎, id doesn\'t exist' });
	}
})

router.get('/projects/:id/tasks', (req, res) => {
	const { id } = req.params;
	if(id) {
		Projects.getTasksById(id)
			.then(tasks => {
				const t = tasks.map(task => {
					return {
						...task,
						completed: task.completed === 0 ? false : true
					};
				})
				res.status(200).json(t)
			})
			.catch(err => {
				res.status(500).json({ message: 'couldn\'t retrieve tasks for project'})
			})
	} else {
		res.status(400).json({ message: '👎, id doesn\'t exist' });
	}
})

router.get('/projects/:id/resources', (req, res) => {
	const { id } = req.params;
	if(id) {
		Projects.getResourcesById(id)
			.then(resources => {
				res.status(200).json(resources)
			})
			.catch(err => {
				res.status(500).json({ message: 'couldn\'t retrieve resources for project'})
			})
	} else {
		res.status(400).json({ message: '👎, id doesn\'t exist' });
	}
})

router.post('/projects', (req, res) => {
	checkAndPost(req, res, Projects.addProjects);
});

router.get('/resources', (req, res) => {
	Projects.getResources()
		.then(resources => {
			res.status(200).json(resources);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: '🙅‍♂️, we could not find all the resources' });
		})
});

router.post('/resources', (req, res) => {
	checkAndPost(req, res, Projects.addResources);
})

router.get('/tasks', (req, res) => {
	Projects.getTasks()
		.then(tasks => {
			res.status(200).json(tasks)
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: '✋, we couldn\'t find all the tasks' });
		})
});

router.post('/tasks', (req, res) => {
	checkAndPost(req, res, Projects.addTasks);
})




module.exports = router;