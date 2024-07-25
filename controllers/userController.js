const catchAsync = require('../utils/catchAsync');
const User =require('./../modules/usermodule');
const AppError = require('../utils/appError');


exports.getallusers = catchAsync(async (req, res, next) => {
    const users = await User.find();
    for(const user of users){
        await user.updateStatus();
    }

    res.status(200).json({
        status: 'success',
        resulte: users.length,
        data: {
            users
        },
    });
});


exports.getuserbyId = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new AppError('aucune etap trouvée avec cet identifiant', 404));
    };

    res.status(200).json({
        status: 'success',
        data: {
            user
        },
    });
});


exports.deleteUser = catchAsync(async(req, res, next) => {
    const delet_user = await User.findByIdAndDelete(req.params.id);

    if(!step_delete) {
        return next(new AppError('aucune step trouvée avec cet identifiant', 404));
    }
    
    res.status(200).json({
        status: 'success',
    });
});

exports.updateUser = catchAsync(async(req , res, next) => {
    const update_user = await User.findByIdAndUpdate(req.params.id,req.body);

    if(!update_user) {
        return next(new AppError('aucune etap trouvée avec cet identifiant', 404));
    }

      res.status(200).json({
        status: 'success',
        data:{
            update_user
        },
    });
});

exports.adduser = catchAsync(async(req, res, next) => {
    const newuser = await User.create(req.body);
    await newuser.createPassword();
    await newuser.save();

    res.status(201).json({
        status: 'success',
        data: {
            newuser
        }
    });
});