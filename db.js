const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const USER = sequelize.define('user', {
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    fname: { type: Sequelize.STRING ,allowNull: false },
    sname: { type: Sequelize.STRING ,allowNull: false },
    pass:   { type: Sequelize.STRING ,allowNull: false },
    gender: { allowNull: false, type: Sequelize.STRING },
    email: { type: Sequelize.TEXT, allowNull: false, validate: { isEmail: true } },
    phone: { type: Sequelize.STRING, allowNull: false },
    role: { allowNull: false, type: Sequelize.STRING },
});
const KLASS = sequelize.define('klass', {
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    level: { type: Sequelize.INTEGER, allowNull: false, unique: 'compositeIndex' },
    division: { type: Sequelize.TEXT, allowNull: false, unique: 'compositeIndex' }
});
const LEARNER = sequelize.define('learner', {
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    fname: { allowNull: false, type: Sequelize.STRING },
    sname: { allowNull: false, type: Sequelize.STRING },
    gender: { allowNull: false, type: Sequelize.STRING },
    email: { type: Sequelize.TEXT, allowNull: false, validate: { isEmail: true } },
    phone: { type: Sequelize.STRING, allowNull: false }
});
const FEESSETUP = sequelize.define('feesSetUp', {
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    amount: { type: Sequelize.BIGINT(11), allowNull: false },
    purpose: { type: Sequelize.STRING, allowNull: false },
    mandetory: { type: Sequelize.BOOLEAN, allowNull: false },
    type: { type: Sequelize.STRING, allowNull: false }, //fixed
    crateria: { type: Sequelize.STRING, allowNull: false }, //if subject bassed
    whoShouldPay: { type: Sequelize.ARRAY(Sequelize.TEXT), allowNull: false },
    accountType: { type: Sequelize.STRING, allowNull: false },
    
});
const INVOICE = sequelize.define('invoice', {
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    paymentProgress: { type: Sequelize.STRING, allowNull: false }, // nothing, inprogress , done
});
const PAYMENT = sequelize.define('payment', {
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    paymentMethod: { type: Sequelize.STRING, allowNull: false }
});

KLASS.hasMany(LEARNER);

LEARNER.hasMany(INVOICE);
FEESSETUP.hasMany(INVOICE);

LEARNER.hasMany(PAYMENT);
INVOICE.hasMany(PAYMENT);

sequelize.sync({ force: false }).then(() => {
    // Table created
    //return model.create();
});
const MODELS = { USER: USER, KLASS: KLASS, LEARNER: LEARNER, INVOICE: INVOICE, PAYMENT: PAYMENT, FEESSETUP: FEESSETUP }

function checkModel(model) {
    
    return MODELS[model];
}
const _DB = {
    sequelize: sequelize,
    createModel: function(model, qry, callback) {
        if (checkModel(model)) {
            MODELS[model].create(qry).then(result => {
                callback(result);
            });
        }
    },
    findModelAll: function(model, callback) {
        if (checkModel(model)) {
            MODELS[model].findAll().then(results => {
                callback(results);
            });
        }
    },
    findModel: function(model, qry, callback) {
        if (checkModel(model)) {
            MODELS[model].find(qry).then(results => {
                callback(results);
            });
        }
    },
    findModelById: function(model, callback) {
        if (checkModel(model)) {
            MODELS[model].findById(customerId).then(result => {
                callback(result);
            })
        }
    },
    updateModel: function(model, qry, data, callback) {
        if (checkModel(model)) {
            MODELS[model].update(qry, { where: data }).then(() => {
                callback();
            });
        }
    },
    deleteModel: function(model, qry, callback) {
        if (checkModel(model)) {
            MODELS[model].destroy({
                where: qry
            }).then(() => {
                callback();
            });
        }
    }
}
/*_DB.createModel("USER",{firstName:"lastborn",lastName:"Julius"},function(result){
    console.log(result);
});
_DB.findModelAll("USER",function(results){
    console.log(results);
});*/
module.exports = _DB;