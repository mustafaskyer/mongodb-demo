const mongoose = require('mongoose')
const User = require('./user')

mongoose.connect('mongodb://localhost:27017/mongocrashcourse')

// run()
update()
async function run() {
    // const user = new User({ name: 'Kyle', age: 26 })
    // await user.save();
    // or

    try {
        const user = await User.create({
            name: 'Kyle',
            age: 26,
            email: "email@email.com",
            hobbies: ['Weight Lifting', 'Blowing'],
            address: {
                street: 'Main Street',
                city: 'Main City '
            }
        })
        // to update
        user.name = 'Mustafa'
        user.age = 20
        user.save()
        console.log('user -> ', user)
    } catch (err) {
        console.log(err.message)
    }
}

async function update() {
    try {
        // const user = await User.findOne({ name: "Mustafa" })
        // const user = await User.find({ name: "Mustafa" })
        // const user = await User.exists({ name: "Mustafa" })
        // const user = await User.where("name").equals("Kyle")
        // const user = await User.where("age").gt("30")
        // const user = await User.where("age")
        //     .gt(28)
        //     // .lt(35)
        //     .where("name")
        //     .equals("Kyle")
        //     .limit(2)
        //     .populate('bestFriend')
            // .select(['age', 'name'])

        // user[0].bestFriend = "61d06c27503bc103c6e8741d"
        // await user[0].save()
        // const users = await User.findByName("ky").populate('bestFriend')
        // const user = await User.find().byName("kyle").populate('bestFriend').limit(1)
        const user = await User.findOne({ name: "Kyle" })
        console.log('@user', user.namedEmail)
    } catch (err) {
        console.log('error ', err.message)
    }
}