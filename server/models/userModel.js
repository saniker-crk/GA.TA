const crypto  = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');

const userSchema = new mongoose.Schema({ //pass scema as an object
    name: {
        type: String,
        required: [true, 'Please fill your name !'],
        maxlength: [40, 'A product name must have less or equal than 40 characters'],
        minlength: [4, 'A product name must have more or equal than 4 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email !'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please provide valid email '] 
    },
    photo: {
            type: String
    },
    role: {
        type: String,
        enum: [ 'guest','user', 'moderator', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required:[true, 'Please provide your password !'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false
        
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This only works on Create and Save!!
            validator: function(el) {
                return el === this.password; 
            },
            message: 'Passwords are not the same'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false,
    }

   });

   userSchema.pre('save', async function(next) {
    
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    //hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    
    //Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
   });

   userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();

    
   });

   userSchema.pre(/^find/, function(next) {
    // this points to the current query
    this.find({active: { $ne: false }  });
    next();
   });

   userSchema.methods.correctPassword = async function(
    candidatePassword,
     userPassword
    ) {
    return await bcrypt.compare(candidatePassword, userPassword);
   };

   

   userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
       const changedTimestamp = parseInt(
         this.passwordChangedAt.getTime() / 1000,
         10
       );
  
       
     // console.log(changedTimestamp, JWTTimestamp);
     return JWTTimestamp < changedTimestamp; 
    }
  
    // False means NOT changed
    return false;
  };

  userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

    //console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    
    return resetToken;
};
   const User = mongoose.model('User', userSchema);

   module.exports = User;