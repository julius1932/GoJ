const Sequelize = require('sequelize');

const User = sequelize.define('user', {
    fname: {
        Sequelize.STRING
        allowNull: false,
    },
    sname: {
        Sequelize.STRING
        allowNull: false,
    },
    gender: {
        Sequelize.STRING
        allowNull: false,
    },
    email: {
        Sequelize.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

});
const Klass = sequelize.define('klass', {
    level: {
        Sequelize.INTEGER,
        allowNull: false,
        unique: 'compositeIndex'
    },
    division: {
        Sequelize.TEXT,
        allowNull: false,
        unique: 'compositeIndex'
    }
});