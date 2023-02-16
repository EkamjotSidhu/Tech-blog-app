const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Comments');

// create associations between tables
User.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Posts.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comments.belongsTo(User, {
    foreignKey: 'user_id'
});

Posts.hasMany(Comments, {
    foreignKey: 'posts_id',
    onDelete: 'CASCADE',
})

Comments.belongsTo(Posts, {
    foreignKey: 'posts_id'
});




module.exports = { User, Posts, Comments };