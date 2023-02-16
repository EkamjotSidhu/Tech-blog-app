const router = require('express').Router();
const homeRoute = require('./homepage');
const dashboardRoute = require('./dashboard');
const userRoutes = require('./login');

router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoute);
router.use('/', homeRoute);

module.exports = router;