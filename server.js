const app = require('./app');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production' ? 'production' : 'development';

if (isProduction) {
   console.log(isProduction);
} else {
  console.log(isProduction);
}

const PORT = process.env.PORT || 3400;
app.listen(PORT, () => {
   console.log(`Requeza on ${PORT} Server Up and Running`);
});
