const mongoose = require('mongoose');
const url = "mongodb+srv://smruti:smruti@cluster0.42v5t.mongodb.net/Airmeet?retryWrites=true&w=majority"

module.exports = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connected to Database");
    } catch (error) {
        console.log(error.message);
        console.log("Error connecting to Database");
    }
}