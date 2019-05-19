const config = require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('json spaces', 2);

app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.use('/api/message', require('./routes/api/message'));
app.use('/api/reports', require('./routes/api/reports'));
app.use('/', require('./routes/view/home'));

app.listen(process.env.PORT, () => {
    console.log(`App running on http://localhost:${ process.env.PORT }/`);
});
