const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Doctor = require('./doctor');

const Schedule = sequelize.define('Schedules', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    dayOfWeek: {
        type: DataTypes.STRING,
        allowNull: false // e.g., 'Monday', 'Tuesday', etc.
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'available'
    }
});

Schedule.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });
Doctor.hasMany(Schedule, { foreignKey: 'doctorId', as: 'schedules' });

module.exports = Schedule;
