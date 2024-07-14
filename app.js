const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const router = require('./routes');
require('dotenv').config();
const Specialization = require('./models/specialization');
const Doctor = require('./models/doctor');
const Appointment = require('./models/appointment');

const app = express();
app.use(bodyParser.json());

app.use('/api', router);

sequelize.sync()
    .then(() => {
        console.log('Database connected and models synced');
        app.listen(3000, () => {
            console.log('Server running on port 3000');
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
