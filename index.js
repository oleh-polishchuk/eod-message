const config = require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();

app.set('view engine', 'html');
app.set('json spaces', 2);

app.use(express.static(path.join(__dirname, 'public', 'build')));
app.use('/api/message', require('./routes/api/message'));
app.use('/api/reports', require('./routes/api/reports'));
app.use('/', require('./routes/view'));

app.listen(process.env.PORT, () => console.log(`App running on http://localhost:${ process.env.PORT }/`));
