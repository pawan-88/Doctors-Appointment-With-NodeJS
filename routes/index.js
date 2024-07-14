const express = require('express');
const doctorController = require('../controllers/doctorController');
const appointmentController = require('../controllers/appointmentController');
const specializationController = require('../controllers/specializationController');
const scheduleController = require('../controllers/scheduleController');

const router = express.Router();

// Doctor routes
router.post('/doctors', doctorController.createDoctor);
router.get('/doctors', doctorController.getDoctors);
router.get('/doctors/role/:role', doctorController.getDoctorsRole);


// Specialization routes
router.post('/specializations', specializationController.createSpecializations);
router.get('/specializations', specializationController.getSpecializations);
router.get('/specializations/:specializationId', specializationController.getSpecializationsWithDoctor);



// Schedule routes
router.post('/schedules', scheduleController.createSchedule);
router.get('/schedules/:doctorId', scheduleController.getScheduleByDoctorId);
router.get('/schedules/date/:date', scheduleController.getSchedulesByDate);


// Appointment routes
router.post('/appointments', appointmentController.createAppointment);
router.get('/appointments/:doctorId', appointmentController.getAppointmentsById);
router.get('/appointments/doctor/:name', appointmentController.getAppointmentsByDoctorName);



module.exports = router;
