const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // SQLite only
    ///storage: 'path/to/database.sqlite'
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
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
});
const KLASS = sequelize.define('klass', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'compositeIndex'
    },
    division: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: 'compositeIndex'
    }
});
const LEARNER = sequelize.define('learner', {
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
    /*klass: {
        type: Sequelize.INTEGER,
        references: {
            // This is a reference to another model
            model: KLASS,
            // This is the column name of the referenced model
            key: 'id',
            // This declares when to check the foreign key constraint. PostgreSQL only.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }*/
});
const INVOICE = sequelize.define('invoice', {
    id: {  type:Sequelize.UUID, allowNull: false, primaryKey: true },
    dat: {  type: Sequelize.UUID, allowNull: false },
    paymentProgress: {      // nothing, inprogress , done
         type:Sequelize.STRING,
        allowNull: false,
    },
    /*learner: {
        type: Sequelize.INTEGER,
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
    }*/

});
const PAYMENT = sequelize.define('payment', {
    id: {  type: Sequelize.UUID, allowNull: false, primaryKey: true },
    dat: {  type: Sequelize.STRING},
    paymentMethod:{  type:Sequelize.STRING },
    /*learner: {
        type: Sequelize.INTEGER,
        references: {
            // This is a reference to another model
            model: LEARNER,
            // This is the column name of the referenced model
            key: 'id',
            // This declares when to check the foreign key constraint. PostgreSQL only.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    invoice: {
        type: Sequelize.INTEGER,
        references: {
            // This is a reference to another model
            model: INVOICE,
            // This is the column name of the referenced model
            key: 'id',
            // This declares when to check the foreign key constraint. PostgreSQL only.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }*/

});
var arrModels = [USER, KLASS,LEARNER,INVOICE,PAYMENT];
arrModels.forEach(function(model) {
    model.sync({ force: true }).then(() => {
        // Table created
        //return model.create();
    });
})

// force: true will drop the table if it already exists

/*USER.findAll().then(users => {
    console.log(users)
})*/