const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', async function(next) {
  //reefer to the current document saved
  const user = this
  //hash password using bcrypt
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

userSchema.methods.isValidPassword = async function(password) {
  const user = this
  //hash the passweord enter by user and compare with the password in the database
  const compare = await bcrypt.compare(password, user.password)
  return compare
}
const User = mongoose.model('User', userSchema)
module.exports = User
