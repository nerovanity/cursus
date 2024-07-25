const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../modules/usermodule");

exports.loginPage = (req, res) => {
  res.render("login");
};

exports.homepage = async (req, res) => {
  let token;
  if (req.session.token) {
    token = req.session.token;
  }

  if (!token) {
    return res.redirect("/overview");
  }
  //verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //check if user stilll exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.redirect("/overview");
  }

  if(currentUser.role === 'admin'){
    res.render("homepage");
  }else{
    res.render("homepage_employ");
  }

};

exports.listeadmin = async (req, res) => {
  let token;
  if (req.session.token) {
    token = req.session.token;
  }

  if (!token) {
    return res.redirect("/overview");
  }
  //verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //check if user stilll exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.redirect("/overview");
  }

  if(currentUser.role === 'admin'){
    res.render("listeadmin");
  }
};

exports.cursus = async (req, res) => {
  let token;
  if (req.session.token) {
    token = req.session.token;
  }

  if (!token) {
    return res.redirect("/overview");
  }
  //verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //check if user stilll exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.redirect("/overview");
  }
  res.render("cursus");
};

exports.addclient = async (req, res) => {
  let token;
  if (req.session.token) {
    token = req.session.token;
  }

  if (!token) {
    return res.redirect("/overview");
  }
  //verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //check if user stilll exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.redirect("/overview");
  }
  res.render("addclient");
};

exports.addadmin = async (req, res) => {
  let token;
  if (req.session.token) {
    token = req.session.token;
  }

  if (!token) {
    return res.redirect("/overview");
  }
  //verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //check if user stilll exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.redirect("/overview");
  }
  if(currentUser.role === 'admin'){
    res.render("addadmin");
  }
  
};

exports.edit = async (req, res) => {
  let token;
  if (req.session.token) {
    token = req.session.token;
  }

  if (!token) {
    return res.redirect("/overview");
  }
  //verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //check if user stilll exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.redirect("/overview");
  }

  res.render("modifier");
};
