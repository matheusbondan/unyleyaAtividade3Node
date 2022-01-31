const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;
const mongooseUrl = require('mongoose-type-url')

const urlSchema = new Schema({
    url: { type: mongoose.SchemaTypes.Url, required: true, lowercase: true },
    short: { type: String, default: shortid.generate, unique: true },
    shortUrl: { type: mongoose.SchemaTypes.Url, unique: true },
    created: { type: Date, default: Date.now, }
})

urlSchema.pre('save', async function(next) {
    let url = this;
    url.short = await url.short.replace(/([^A-Za-z0-9])/, '').slice(1,6);
    url.shortUrl = await `https://morning-sierra-21406.herokuapp.com/${url.short}`  
    return next()
})


module.exports = mongoose.model('Urls', urlSchema)