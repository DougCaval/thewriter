const { default: mongoose } = require("mongoose");


//const url = 'mongodb://localhost:27017/estorias';
const url = 'mongodb+srv://cavalIt:Caval2022@cluster0.cbb4b.mongodb.net/?retryWrites=true&w=majority';
//const url = 'mongodb+srv://cavalIt:Caval2022@cluster0.cbb4b.mongodb.net/test'
mongoose.connect(url, {useNewUrlParser: true});

module.exports = mongoose;