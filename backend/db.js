// database configs
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    }).then(() => {
        console.log(`DB CONNECTED TO ${process.env.DATABASE_URI}`);
    }).catch((err) => {
        console.log(`DATABASE CONNECTION FAILLED \n ${err.message}`);
    })
};