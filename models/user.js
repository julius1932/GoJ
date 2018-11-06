const Sequelize = require('./db');

const USER = sequelize.define('user', {
    id: {
         type:Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    }
    fname: {
        allowNull: false,
         type:Sequelize.STRING
    },
    sname: {
        allowNull: false,
         type:Sequelize.STRING

    },
    gender: {
        allowNull: false,
         type:Sequelize.STRING

    },
    position: {
        allowNull: false,
         type:Sequelize.STRING

    },
    password: {
         type:Sequelize.STRING
        allowNull: false,
    },
    email: {
         type:Sequelize.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    phone: {
         type:Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});
module.exports =USER;