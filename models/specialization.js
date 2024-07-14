const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Specialization = sequelize.define('Specialization', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

// Specialization.hasMany(require('./doctor'), { foreignKey: 'specializationId', as: 'doctors' });


module.exports = Specialization;
