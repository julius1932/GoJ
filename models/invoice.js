const Sequelize = require('./db');
const LEARNER = require('./learner');
const INVOICE = Sequelize.define('invoice', {
    id: {  type:Sequelize.UUID, allowNull: false, primaryKey: true },
    dat: {  type: Sequelize.UUID, allowNull: false },
    paymentProgress: {      // nothing, inprogress , done
         type:Sequelize.STRING,
        allowNull: false,
    },
    learner: {
        type: Sequelize.INTEGER,
        unique: 'compositeIndex',
        references: {
            // This is a reference to another model
            model: LEARNER,
            // This is the column name of the referenced model
            key: 'id',
            // This declares when to check the foreign key constraint. PostgreSQL only.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    feesSetUp: {
        type: Sequelize.INTEGER,
        unique: 'compositeIndex',
        references: {
            // This is a reference to another model
            model: FeesSetUp,
            // This is the column name of the referenced model
            key: 'id',
            // This declares when to check the foreign key constraint. PostgreSQL only.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }

});
module.exports = INVOICE;