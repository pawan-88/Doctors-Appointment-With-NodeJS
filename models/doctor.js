const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Specialization = require('./specialization');

const Doctor = sequelize.define('Doctor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    place: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

Doctor.belongsTo(Specialization, { foreignKey: 'specializationId' });
Specialization.hasMany(Doctor, { foreignKey: 'specializationId' });

module.exports = Doctor;
