const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3400;
app.listen(PORT, () => {
   console.log(`Requeza on ${PORT} Server Up and Running`);
});
