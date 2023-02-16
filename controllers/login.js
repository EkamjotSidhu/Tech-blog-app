const router = require('express').Router();
const { Posts, Comments, User } = require('../models')

// render login page
router.get('/', (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.redirect('/');
            return;
          }

          res.render('login');        
    } catch (err) {
        res.status(500).json(err);
    }
});

//post route -> create new user
router.post('/create', async (req, res) => {
    try {
        //  create user object
        const dbCreateUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        //create session to track if logged in
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = dbCreateUser.id;
            req.session.username = req.body.username;

            res.status(200).json(dbCreateUser);
            console.log('New user added to db');
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// post route -> login with created user
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        // check db for username
        if (!dbUserData) {
            res.status(400).json({ message: 'Incorrect email or password.' });
            return;
        }

        /// check db for password
        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password.' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = dbUserData.id;
            req.session.username = req.body.username;

            res.status(200).json({ message: 'You are now logged in!' });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// post route -> logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;