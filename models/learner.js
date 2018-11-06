const Sequelize = require('./db');

const KLASS = require('./klass');
const LEARNER = Sequelize.define('learner', {
    id: {
         type:Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
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
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type:Sequelize.STRING,
        allowNull: false
    },
    klass: {
        type: Sequelize.INTEGER,
        references: {
            // This is a reference to another model
            model: KLASS,
            // This is the column name of the referenced model
            key: 'id',
            // This declares when to check the foreign key constraint. PostgreSQL only.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
});
 module.exports =LEARNER;