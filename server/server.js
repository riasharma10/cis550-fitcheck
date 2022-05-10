const express = require('express');
const mysql      = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// Route 1 - register as GET 
app.get('/productuserinfo', routes.productuserinfo)

// Route 2 - register as GET 
app.get('/purposes', routes.purposes)

// Route 3 - register as GET 
app.get('/getProductFromRating', routes.getProductFromRating)

// Route 4 - register as GET 
app.get('/bodytype', routes.bodytype)

// Route 5 - register as GET 
app.get('/top_category_size', routes.top_category_size)

// Route 6 - register as GET 
app.get('/avg_rating', routes.avg_rating)

// Route 7 - register as GET 
app.get('/reviewwords', routes.reviewwords)

// Route 8 - register as GET 
app.get('/categoryhelpful', routes.categoryhelpful)

//Route 9
app.get('/relatedproducts', routes.relatedproducts)

// Route 10
app.get('/aboverating', routes.aboverating)

app.get('/avgpricegraph', routes.avgpricegraph)

app.get('/numProductGraph', routes.numProductGraph)





app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
