const mongoose = require('mongoose');
const URI = 'mongodb://localhost:27017/petfood';

mongoose.connect(URI)
.then(() => console.log('DB is Up!'))
.catch((err) => console.log(err));