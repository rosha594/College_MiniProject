const mongoose = require('mongoose');
const dotenv = require('dotenv')
// let database;
const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology : true,
            useNewUrlParser : true,            
        }
            
        );

        console.log(`mongodb connceted${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
}

// module.exports = {connectDB, database};
module.exports = connectDB;