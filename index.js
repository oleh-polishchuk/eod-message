const config = require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.use('/api/message', require('./routes/api/message'));
app.use('/', require('./routes/view/home'));

app.listen(process.env.PORT, () => {
    console.log(`App running on http://localhost:${ process.env.PORT }/`);
});
