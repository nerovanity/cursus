const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const User =require('./../modules/usermodule');
const AppError = require('../utils/appError');
const view = require('../controllers/viewsController');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

// exports.signup = catchAsync(async (req, res, next) => {
//     const newUser = await User.create(req.body);

//     const token = signToken(newUser._id);

//     res.status(201).json({
//         status: 'success',
//         token,
//         data: {
//             user: newUser
//         }
//     });
// });

exports.login = catchAsync(async (req, res, next)  => {
    const {email, password} = req.body;

    if (!email || !password){
        return next(new AppError('S\'il vous plaît fournir l\'adresse e-mail et le mot de passe !', 400));
    }

    const user = await  User.findOne({email}).select('+password');
    
    if(!user || !await user.correctPassword(password, user.password)){
        return next(new AppError('Adresse e-mail ou mot de passe incorrect'), 401);
    }

    if(user.role == 'user'){
        return next(new AppError('Adresse e-mail ou mot de passe incorrect.'), 401);
    }

    const token = signToken(user._id);
    req.session.token = token;
    req.session.isLogged = true;
    res.status(200).json({
        status: 'success'
    });
});
exports.login_mobile = catchAsync(async (req, res, next)  => {
    const {email, password} = req.body;

    if (!email || !password){
        return next(new AppError('S\'il vous plaît fournir l\'adresse e-mail et le mot de passe !', 400));
    }

    const user = await  User.findOne({email}).select('+password');
    
    if(!user || !await user.correctPassword(password, user.password)){
        return next(new AppError('Adresse e-mail ou mot de passe incorrect'), 401);
    }

    const token = signToken(user._id);
    req.session.token = token;
    req.session.isLogged = true;
    res.status(200).json({
        status: 'success',
        user: user
    });
});


exports.logout = (req, res) => {
    req.session.token = null;
    req.session.isLogged = false;
    res.status(200).json({
        statsu: 'success'
    });
};

exports.check_isLogged = (req,res,next)=>{
    if(req.session.isLogged){
        res.status(200).json({
            status: 'success'
        });
    }else{
        return next(new AppError('Vous n\'êtes pas connecté pour accéder'), 401);
    }
}

exports.protect = catchAsync(async (req, res, next) => {
    //chacking token 
    let token;
    if(req.session.token) {
        token = req.session.token;
    }

    if (!token){
        return next(new AppError('Vous n\'êtes pas connecté pour accéder'),401);
    }
    //verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //check if user stilll exist
    const currentUser = await User.findById(decoded.id);
    if (!currentUser){
        return next(new AppError('Cet utilisateur n\'existe plus'));
    }

    //check if user changed password after the token was issued
    // if (currentUser.changedpasswordAfter(decoded.iat)){
    //     return next(new AppError('User recently changed password please log in again',401));
    // } 
    req.user = currentUser;
    next();
})


exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new AppError('Vous n\'avez pas la permission d\'effectuer cette action',403));
        }
        next();
    }
};

exports.profileprotect = catchAsync(async (req, res, next) => {
    //chacking token 
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('bearer')
    ){
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token){
        return next(new AppError('Vous n\'êtes pas connecté pour accéder'),401);
    }
    //verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //check if user stilll exist
    const currentUser = await User.findById(decoded.id);
    if (!currentUser){
        return next(new AppError('Cet utilisateur n\'existe plus'));
    }

    //check if user changed password after the token was issued
    // if (currentUser.changedpasswordAfter(decoded.iat)){
    //     return next(new AppError('User recently changed password please log in again',401));
    // }

    if(decoded.id != req.params.id){
        return next(new AppError("Vous n'avez pas accès à ce profil.",401));
    }

    req.user = currentUser;
    next();
})
