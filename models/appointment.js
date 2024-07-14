const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Doctor = require('./doctor');

const Appointment = sequelize.define('Appointment', {
   id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Doctor,
            key: 'id'
        }
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    patientName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    patientAge: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    patientGender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Doctor.hasMany(Appointment, { as: 'appointments', foreignKey: 'doctorId' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

module.exports = Appointment;
