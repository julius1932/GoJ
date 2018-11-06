const Sequelize = require('sequelize');

const FeesSetUp = sequelize.define('feesSetUp', {
    id: { Sequelize.UUID, allowNull: false, primaryKey: true },
    dat: { Sequelize.UUID, allowNull: false, primaryKey: true },
    amount: { Sequelize.UUID, allowNull: false, primaryKey: true },
    purpose: { Sequelize.UUID, allowNull: false, primaryKey: true },
    term : {Sequelize.UUID,allowNull: false,primaryKey: true},
    mandetory: {Sequelize.UUID,allowNull: false,primaryKey: true},
    type: {Sequelize.UUID,allowNull: false,primaryKey: true},//fixed
    crateria: {Sequelize.UUID,allowNull: false,primaryKey: true}, //if subject bassed
    whoShouldPay: {Sequelize.UUID,allowNull: false,primaryKey: true}
    accountType: { Sequelize.UUID, allowNull: false, primaryKey: true },
});