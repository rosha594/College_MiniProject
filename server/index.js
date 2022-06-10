const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors')
const User = require('./models/readerModel');

const app = express();
app.use(express.json());
app.use(cors())

dotenv.config();
connectDB();


//users routes
app.use('/api/users',userRoutes);


//error Handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server is started on port ${PORT}`));