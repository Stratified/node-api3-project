const router = require('express').Router();

const users = require('./userDb');

router.post('/', validateUser, (req, res) => {
	users
		.insert(req.body)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});

router.post('/:id/posts', validatePost, (req, res) => {
	users
		.insert(req.body.text)
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.get('/', (req, res) => {
	users
		.get()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.get('/:id', validateUserId, (req, res) => {
	res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
	users
		.getUserPosts(req.params.id)
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => {
			json(err);
		});
});

router.delete('/:id', validateUserId, (req, res) => {
	const id = req.params.id;
	users
		.remove(id)
		.then((user) => {
			res.status(204).json({
				message: `User with the id of ${user.id} successfully removed.`,
			});
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
	const id = req.params.id;
	const name = req.body;
	users
		.update(id, name)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

function validateUserId(req, res, next) {
	users
		.getById(req.params.id)
		.then((user) => {
			if (user) {
				req.user = user;
				next();
			} else {
				res.status(404).json({
					message: `There is no user with the id of ${req.params.id}`,
				});
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
}

function validateUser(req, res, next) {
	console.log(req.body);
	if (!req.body.name) {
		res.status(400).json({ message: 'Missing required name field.' });
	} else {
		next();
	}
}

function validatePost(req, res, next) {
	console.log(req);
	if (!req.body) {
		res.status(400).json({ message: 'Missing required post field.' });
	} else {
		next();
	}
}

module.exports = router;
