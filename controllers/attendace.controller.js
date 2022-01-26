const attendanceService = require('../services/attendace.services.js');
const asyncHandler =  require('../middlewares/asyncHandler.middleware.js');
const { validationResult } = require('express-validator');

const registerAttendace = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errors)
    }

    const attendaceJson = {...req.body};
    const petId = req.body.pet;

    const newAttendance = await attendanceService.register(attendaceJson, petId);
    if(!newAttendance.errors){
        res.status(200).json({
            message: 'The attendance was successfully registered.',
            status: 'OK',
            data: newAttendance
        });
    }else{
        throw new Error(newAttendance)
    }
})

const getHistoryByPet = async (req, res, next) => {
    const petId = req.params.petId;
    try{
        const history = await attendanceService.findByPet(petId);
        res.status(200).json({
            message: 'The history was successfully list.',
            status: 'OK',
            data: history
        });
    } catch (error) {
        res.status(503).json({
            message: 'The history could not be list. Please try again.',
            status: 'Failed',
            data: error
        });
    }
}

module.exports = { registerAttendace, getHistoryByPet }
