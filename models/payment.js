const Sequelize = require('./db');
const PAYMENT = sequelize.define('payment', {
    id: { Sequelize.UUID, allowNull: false, primaryKey: true },
    dat: { Sequelize.STRING},
    paymentMethod:{ Sequelize.STRING },
    learner: {
        type: Sequelize.INTEGER,
        references: {
            // This is a reference to another model
            model: Learner,
            // This is the column name of the referenced model
            key: 'id',
            // This declares when to check the foreign key constraint. PostgreSQL only.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
    invoice: {
        type: Sequelize.INTEGER,
        references: {
            // This is a reference to another model
            model: Invoice,
            // This is the column name of the referenced model
            key: 'id',
            // This declares when to check the foreign key constraint. PostgreSQL only.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }

});
module.exports =PAYMENT;