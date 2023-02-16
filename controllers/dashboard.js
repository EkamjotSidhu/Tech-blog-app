const router = require('express').Router();
const { Posts, Comments, User } = require('../models');


router.get('/', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            let getUserPosts = await Posts.findAll({
                where: {
                    user_id: req.session.user_id
                }
            });

            let posts = getUserPosts.map((post) =>
                post.get({ plain: true })
            );
            

            res.render('dashboard', {
                posts,
                loggedIn: req.session.loggedIn,
                myUsername: req.session.username
            });
            return;
        }

        res.render('dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/edit-post/:id', async (req, res) => {
    try {
        const singlePostSrch = await Posts.findByPk(req.params.id);

        const post = singlePostSrch.get({ plain: true });
        console.log('serialized post: ', post)
        console.log('content: ', post.content)

        res.render('edit-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// create a post
router.post('/create-post', async (req, res) => {
    try {
        const dbCreatePost = await Posts.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });

        res.status(201).json(dbCreatePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/edit-post/:id', async (req, res) => {
    try {
        const updatePost = await Posts.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            });

        console.log('update-post-search: ', updatePost);

        res.status(200).json(updatePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletePost = await Posts.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!deletePost) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(deletePost);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;