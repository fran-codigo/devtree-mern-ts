import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error('Error por CORS'));
    }
  },
  credentials: true,
};

export default corsOptions;
