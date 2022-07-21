const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// create blog posts
router.post("/", withAuth, async (req, res) => {
	try {
		const newPost = await Post.create({
			title: req.body.title,
			contents: req.body.contents,
			user_id: req.session.user_id,
		});

		res.status(200).json(newPost);
	} catch (err) {
		res.status(400).json(err);
	}
});

// update blog post
router.put("/:id", withAuth, async (req, res) => {
	try {
		const updatePost = await Post.update(req.body, {
			where: {
				id: req.params.id,
			},
		});

		if (!updatePost) {
			res.status(404).json({ message: "The post cannot be found." });
			return;
		}

		res.status(200).json(updatePost);
	} catch (err) {
		res.status(400).json(err);
	}
});

// delete blog post
router.delete("/:id", withAuth, async (req, res) => {
	try {
		const deletePost = await Post.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!deletePost) {
			res.status(404).json({ message: "The post cannot be found." });
			return;
		}

		res.status(200).json(deletePost);
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
