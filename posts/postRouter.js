const router = require('express').Router();

router.get('/', (req, res) => {
	res.send(`<h1>postRouter</h1>`);
});

router.get('/:id', (req, res) => {
	// do your magic!
});

router.delete('/:id', (req, res) => {
	// do your magic!
});

router.put('/:id', (req, res) => {
	// do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
	// do your magic!
}

module.exports = router;
