import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const startDb = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.info('Connected to mongoDB');
    })
    .catch(e => {
      console.error('Error while DB connecting : ', e);
    });
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
};

export default startDb;
