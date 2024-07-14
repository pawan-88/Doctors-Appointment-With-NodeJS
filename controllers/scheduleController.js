const Schedule = require('../models/schedule');
const Doctor = require('../models/doctor');

exports.createSchedule = async (req, res) => {
    try {
        const { doctorId, date, startTime, endTime } = req.body;
        const doctor = await Doctor.findByPk(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        const schedule = await Schedule.create({ doctorId, date, startTime, endTime });
        res.status(201).json(schedule);
    } catch (error) {
        res.status(500).json({ message: 'Error creating schedule', error: error.message });
    }
};


exports.getScheduleByDoctorId = async (req, res) => {
    try {
        const { doctorId } = req.params;
        if (!doctorId) {
            return res.status(400).json({ message: 'doctorId is required' });
        }
        const schedule = await Schedule.findAll({
            where: {
                doctorId: doctorId
            },
            include: {
                model: Doctor,
                as: 'doctor'
            }
        });
        if (schedule.length === 0) {
            return res.status(404).json({ message: 'No schedules found for the specified doctor' });
        }
        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schedules', error: error.message });
    }
};


exports.getSchedulesByDate = async (req, res) => {
    try {
        const { date } = req.params;
        if (!date) {
            return res.status(400).json({ message: 'Date is required' });
        }
        const schedule = await Schedule.findAll({
            where: { date },
            include: { model: Doctor, as: 'doctor' }
        });
        if (!schedule.length) {
            return res.status(404).json({ message: 'No schedules found for the specified date' });
        }
        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schedules', error: error.message });
    }
};