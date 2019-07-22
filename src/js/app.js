const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/Index.html');
});
app.use(express.static(__dirname)); 

app.listen(port, () => console.log(`Example app listening on port ${port}!`));