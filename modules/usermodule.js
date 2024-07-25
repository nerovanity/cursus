const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('./../utils/email');

const userschema = new mongoose.Schema({
  nom: {
    type: String,
  },
  prenom:{
    type: String,
  },
  num_natio:{
    type: String,
  },
  adress:{
    type: String,
  },
  telephone:{
    type: String,
  },
  lieu_nai:{
    type: String
  },
  date_nai:{
    type: String
  },
  service:{
    type: String
  },
  email: {
    type: String,
    required: [true, 'S\'il vous plaît, fournissez une adresse e-mail.'],
    trim: true,
    unique: [true, 'Cet e-mail est déjà utilisé.'],
    lowercase: true,
    validate: [validator.isEmail, 'Veuillez fournir une adresse e-mail valide.'],
  },
  role: {
    type: String,
    enum: ['user', 'employ' , 'admin'],
    default : 'user'
  },
  password: {
    type: String,
    select: false
  },
  destination:{
    type: String
  },
  filier:{
    type: String
  },
  status:{
    type: String,
    default : 'En cours'
  },
  services:[{
    name: {
      type: String
    },
    status: {
      type: String,
      default: 'En cours'
    }
  }],  
  parent:{
    nom:{
      type: String
    },
    prenom:{
      type:String
    },
    telephone:{
      type: String
    },
    num_natio:{
      type: String
    },
    cin:{
      type: String
    },
    adress:{
      type: String
    }
  }
});


userschema.pre('save', function (next) {
  this.slug = slugify(this.nom, { lower: true });
  next();
});

userschema.methods.correctPassword = async function(candidatePassword , userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword)
};


userschema.methods.createPassword = async function(){
  const new_password_bytes = crypto.randomBytes(4);
  const new_password = new_password_bytes.toString('hex');

  console.log(new_password);
  
  const message = `
    Cher/Chère ${this.parent.nom},

    Bienvenue chez Cursus !

    Nous sommes ravis de vous compter parmi nos clients et nous nous réjouissons de vous offrir les meilleurs services. Votre compte a été créé avec succès et vous pouvez désormais accéder à toutes les fonctionnalités et avantages que nous proposons.

    Voici les détails de votre compte :

    Email: ${this.email}
    Mot de passe: ${new_password}`

  await sendEmail({
    email: this.email,
    subject: 'Bienvenue chez Cursus!',
    message
  });

  this.password  = await bcrypt.hash(new_password, 12);
};

userschema.methods.updateStatus = function () {
  const serviceStatuses = this.services.map(service => service.status);
  
  if (serviceStatuses.includes('Échec')) {
    this.status = 'Échec';
  } else if (serviceStatuses.includes('En cours')) {
    this.status = 'En cours';
  } else if (serviceStatuses.every(status => status === 'Terminé')) {
    this.status = 'Terminé';
  } else {
    this.status = 'En cours';
  }
};

async function updateStatusMiddleware(next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  docToUpdate.updateStatus();
  await docToUpdate.save();
  next();
}

userschema.pre('findOneAndUpdate', updateStatusMiddleware);
userschema.pre('updateOne', updateStatusMiddleware);

const User = mongoose.model('users', userschema);

module.exports = User;
