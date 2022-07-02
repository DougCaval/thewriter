const { default: mongoose } = require("mongoose");


const url = 'mongodb://localhost:27017/thewriter';
//const url = 'mongodb+srv://cavalIt:<password>@cluster0.cbb4b.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(url, {useNewUrlParser: true});

module.exports = mongoose