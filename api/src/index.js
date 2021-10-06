const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

require('./database')

app.set('port', process.env.PORT || 8000);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/', require('./routes/main.routes'))

app.listen(app.get('port'), () => console.log('🔥 server on at http://localhost:8000'));