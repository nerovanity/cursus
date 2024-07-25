const step = require('../modules/stepsmodule');
const AppError = require('../utils/appError');
const catchAsync =  require('../utils/catchAsync');


exports.getallsteps = catchAsync(async (req, res, next) => {
    const steps = await step.find();

    res.status(200).json({
        status: 'success',
        resulte: steps.length,
        data: {
            steps
        },
    });
});

exports.creatstep = catchAsync(async(req, res, next) => {
    const newstep = step.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            newstep
        }
    });
});


exports.getstepbyid = catchAsync(async(req, res, next) =>{
    const step_id = step.findById(req.params.id);

    if(!step_id) {
        return next(new AppError('aucune etap trouvée avec cet identifiant', 404));
    };

    res.status(200).json({
        status: 'success',
        data: {
            step_id
        },
    });
});

exports.updatestep = catchAsync(async(req, res, next) => {
    const step_update = await step.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if(!step_update) {
        return next(new AppError('aucune etap trouvée avec cet identifiant', 404));
    }

      res.status(200).json({
        status: 'success',
        data:{
            step_update
        },
    });
});

exports.deletestep = catchAsync(async(req, res, next) => {
    const step_delete = step.findByIdAndDelete(req.params.id);

    if(!step_delete) {
        return next(new AppError('aucune step trouvée avec cet identifiant', 404));
    }

    res.status(200).json({
        status: 'success'
    })
})