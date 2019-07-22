const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get(['/', '/verses', '/settings', '/practice'], function (req, res) {
    res.sendFile(__dirname + '/Index.html');
});
app.get(['/verses', '/settings', '/practice'], function (req, res) {
    res.redirect('/');
});

app.use(express.static(__dirname)); 

app.listen(port, () => console.log(`Example app listening on port ${port}!`));