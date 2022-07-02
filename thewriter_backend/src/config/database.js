const { default: mongoose } = require("mongoose");


const url = 'mongodb://localhost:27017/thewriter';
mongoose.connect(url, {useNewUrlParser: true});

module.exports = mongoose