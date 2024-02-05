const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require('./config/database');
const activity = require('./routers/activity');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/activity', activity);
app.use(errorHandler);

process.on('unhandledRejection', (reason, promise) => {
  console.log(
    `kindly fix this promise ${promise} as its not handled due to ${reason}`
  );
});

const startServer = async () => {
  try {
    await connectToDB();
    app.listen(process.env.PORT, () => {
      console.log(
        `backend is live and listening to requests on port ${process.env.PORT}`
      );
    });
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

startServer();
