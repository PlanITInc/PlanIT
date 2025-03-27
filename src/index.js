const { app } = require('@azure/functions');
// import app from '@azure/functions';

app.setup({
    enableHttpStream: true,
});
