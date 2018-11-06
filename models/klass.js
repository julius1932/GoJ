const Sequelize = require('./db');

const KLASS =  Sequelize.define('klass', {
	id: {
         type:Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    level: {
        type:Sequelize.INTEGER,
        allowNull: false,
        unique: 'compositeIndex'
    },
    division: {
         type:Sequelize.TEXT,
        allowNull: false,
        unique: 'compositeIndex'
    }
});
module.exports = KLASS;
