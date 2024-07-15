const Specialization = require('../models/specialization');
const Doctor = require('../models/doctor');


exports.createSpecializations = async (req, res) => {
    try {
        const specializations = req.body;
        const createdSpecializations = await Specialization.bulkCreate(specializations);
        res.status(201).json(createdSpecializations);
    } catch (error) {
        res.status(500).json({ message: 'Error creating specialization', error });
    }
};

exports.getSpecializations = async (req, res) => {
    try {
        const specializations = await Specialization.findAll();
        res.status(200).json(specializations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching specializations', error });
    }
};


exports.getSpecializationsWithDoctor = async (req, res) => {
try {
    const doctors = await Doctor.findAll({ 
        where: { specializationId: req.params.specializationId },
        include: Specialization 
    });
    if (doctors.length === 0) {
        return res.status(404).json({ message: 'No doctors found for the specified specialization' });
    }
    res.status(200).json(doctors);
} catch (err) {
    res.status(500).json({ message: 'Error fetching doctors by specialization', error: err });
}
};
