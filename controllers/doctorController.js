const Doctor = require('../models/doctor');
const Specialization = require('../models/specialization');

exports.createDoctor = async (req, res) => {
    try {
        const { specializationId, ...doctorData } = req.body;
        const specialization = await Specialization.findByPk(specializationId);

        if (!specialization) {
            return res.status(400).json({ message: 'Specialization not found' });
        }

        const doctor = await Doctor.create({ ...doctorData, specializationId });
        res.status(201).json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Error creating doctor', error });
    }
};

exports.getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll({ include: Specialization });
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctors', error });
    }
};

exports.getDoctorsRole = async (req, res) => {
try {
    const doctors = await Doctor.findAll({ 
        where: { role: req.params.role },
        include: Specialization 
    });
    if (doctors.length === 0) {
        return res.status(404).json({ message: 'No doctors found for the specified role' });
    }
    res.status(200).json(doctors);
} catch (err) {
    res.status(500).json({ message: 'Error fetching doctors by role', error: err });
}
};
