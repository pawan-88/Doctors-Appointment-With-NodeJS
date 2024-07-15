const { Op } = require('sequelize');
const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment');
const Schedule = require('../models/schedule');

exports.createAppointment = async (req, res) => {
    try {
        const { doctorId, date, startTime, endTime, patientName, patientAge, patientGender, reason } = req.body;

        // Check if the doctor exists
        const doctor = await Doctor.findByPk(doctorId);
        if (!doctor) {
            return res.status(400).json({ message: 'Doctor not found' });
        }

        // Check for time conflicts with existing appointments
        const conflictingAppointments = await Appointment.findAll({
            where: {
                doctorId,
                date,
                [Op.or]: [
                    { startTime: { [Op.between]: [startTime, endTime] } },
                    { endTime: { [Op.between]: [startTime, endTime] } },
                    { [Op.and]: [{ startTime: { [Op.lte]: startTime } }, { endTime: { [Op.gte]: endTime } }] }
                ]
            }
        });

        if (conflictingAppointments.length > 0) {
            const availableTimes = await getAvailableTimes(doctorId, date);
            return res.status(400).json({
                message: 'The doctor is busy during this time slot',
                availableTimes
            });
        }

        // Create appointment
        const appointment = await Appointment.create({
            doctorId,
            date,
            startTime,
            endTime,
            patientName,
            patientAge,
            patientGender,
            reason
        });

        res.status(201).json(appointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ message: 'Error creating appointment', error: error.message });
    }
};

const getAvailableTimes = async (doctorId, date) => {
    try {
        // const dayOfWeek = new Date(date).toLocaleString('en-US', { weekday: 'long' });
        const dayOfWeek = 'Monday';

        // Fetch schedules for the doctor on the specific day of the week (dayOfWeek)
        const schedules = await Schedule.findAll({
            where: { doctorId, dayOfWeek },
            order: [['startTime', 'ASC']]
        });

        // Fetch existing appointments date
        const appointments = await Appointment.findAll({
            where: { doctorId, date },
            order: [['startTime', 'ASC']]
        });

        // Calculate available times based on schedules and existing appointments
        const availableTimes = [];

        schedules.forEach(schedule => {
            let lastEndTime = schedule.startTime;

            appointments.forEach(appointment => {
                // Check if there gap between appointments within the schedule
                if (appointment.startTime > lastEndTime) {
                    if (lastEndTime < appointment.startTime && schedule.endTime > appointment.startTime) {
                        availableTimes.push({ startTime: lastEndTime, endTime: appointment.startTime });
                    }
                    lastEndTime = appointment.endTime;
                }
            });

            // Check if there any remaining time after last appointment in the schedule
            if (lastEndTime < schedule.endTime) {
                availableTimes.push({ startTime: lastEndTime, endTime: schedule.endTime });
            }
        });

        return availableTimes;
    } catch (error) {
        console.error('Error fetching available times:', error);
        return []; //  empty array 
    }
};


exports.getAppointmentsById = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const appointments = await Appointment.findAll({
            where: { doctorId }
        });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error });
    }
};


exports.getAppointmentsByDoctorName = async (req, res) => {
    const { doctorName } = req.params;
    
    try {
        // Find the doctor by name
        const doctor = await Doctor.findOne({
            where: {
                name: doctorName
            }
        });

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        // Fetch appointments for the found doctor
        const appointments = await Appointment.findAll({
            where: {
                doctorId: doctor.id
            }
        });
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Error fetching appointments', error: error.message });
    }
};