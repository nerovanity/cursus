const agence = require('../modules/agencemodule');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.getallagences = catchAsync(async (req, res, next) => {
    const agences = await agence.find();

    res.status(200).json({
        status : 'success',
        resultes: agences.length,
        data: {
            agences
        },
    });
});

exports.creatagence = catchAsync(async (req, res, next) => {
    const newagence = await agence.create(req.body);
  
      res.status(201).json({
        status: 'success',
        data: {
          newagence
        },
      });
  
  });

exports.getagencebyid = catchAsync(async (req, res, next) => {
  const agence_id = await agence.findById(req.params.id);

  if(!agence_id) {
    return next(new AppError('aucune agence trouvée avec cet identifiant', 404));
  }

  res.status(200).json({
    status: 'success',
    data:{
      agence_id
    },
  });
});

exports.updateagence = catchAsync(async (req, res, next) => {
  const agence_update = await agence.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if(!agence_update) {
    return next(new AppError('aucune agence trouvée avec cet identifiant', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      agence_update
    },
  });
});

exports.deleteagence = catchAsync(async (req, res, next) => {
  const agence_d = await agence.findByIdAndDelete(req.params.id);
  
  if(!agence_d) {
    return next(new AppError('aucune agence trouvée avec cet identifiant', 404));
  }

  res.status(200).json({
    status: 'success'
  });
});

