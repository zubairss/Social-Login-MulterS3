const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    images: { type: Array }
}, { timestamps: true });


// userSchema.pre('save', async function (next) {
//     const salt = await bcrypt.genSalt(8);
//     this.password = await bcrypt.hash(this.password, salt);
//     console.log("PRE MD")
//     next();
// })

// userSchema.post('save', function (doc, next) {
//     console.log(doc);
//     next();
// })

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
