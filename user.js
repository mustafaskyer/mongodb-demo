const mongoose = require('mongoose')

/**
 * Creating a new address schema
 */
const addressSchemaUpdate = new mongoose.Schema({
    street: String,
    city: String,
})

/**
 * Creating a new user schema
 */
const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 100,
        validate: { validator: v => v % 2 === 0, message: props => `${props.value} is not an even number` }
    },
    email: { type: String, required: false, lowercase: true, minlength: 10 },
    createdAt: { type: Date, immutable: true, default: () => Date.now() },
    updatedAt: { type: Date, default: () => Date.now() },
    bestFriend: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    hobbies: [String],
    address: addressSchemaUpdate
})

/** 
 * add sayHi method to UserSchema 
 * can access it by user instance userInstance.sayHi()
 * */
userSchema.methods.sayHi = function() {
    console.log(`Hi, My name is ${this.name}`)
}

/**
 * Add static method to UserSchema
 * can acess it bu User object User.findByName()
 */

userSchema.statics.findByName = function (name) {
    // return this.where({ name: new RegExp(name, 'i') })
    return this.find({ name: new RegExp(name, 'i') })
}

/**
 * Add new query to User Schame
 * can access it after query result
 * User.find().byName("name")
 */
userSchema.query.byName = function (name) {
    return this.where({ name: new RegExp(name, 'i') })
}

/**
 * Add Virtual property to user object,
 * this prop dosen't exist in document
 */
userSchema.virtual('namedEmail').get(function () {
    return `${this.name}: ${this.email}`
})

// Pre save method, will execute every time before you save
userSchema.pre('save', function(next){
    this.updatedAt = Date.now()
    // use another method
    // doc.sayHi()
    // throw error
    throw new Error("Save Failed")
    next()
})

// post save will execute every time after you save
userSchema.post('save', function (doc, next) {
    doc.sayHi()
    next() 
})

// userSchema.pre('aggregate', function() {})
// userSchema.pre('updateOne', function(){})


module.exports = mongoose.model("User", userSchema)