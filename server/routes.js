const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();


/******************************************************* */

//Route 1 - check fetcher.js for route description
async function productuserinfo(req, res) {
    if (req.query.page && !isNaN(req.query.page)) {
     // This is the case where page is defined.

        const ageupperbound = parseInt(req.query.ageupperbound) ? req.query.ageupperbound : 115;
        const agelowerbound = parseInt(req.query.agelowerbound) ? req.query.agelowerbound : 0;
        const bustApprox = req.query.bustApprox;
        connection.query(`SELECT R.item_id, fit, review_summary, rating
        FROM Review_Rent R
        WHERE R.user_id IN (
            SELECT user_id
            FROM Customer_Rent
        WHERE (body_type = '${req.query.userbodytype}') AND (${agelowerbound} <= age <= ${ageupperbound}) AND (bust_size = '${bustApprox}'))
        GROUP BY R.item_id, fit, review_summary, rating
        HAVING COUNT(*)=1
        `,  function (error, results, fields)
        {

         if (error) {
             console.log(error)
             res.json({ error: error })
         } else if (results) {
            res.json({ results: results })
         }
        });

    } else {
        console.log("page not defined")
        res.json({message: "in the error field -- page was not defined"});
     }
}



//Route 2: - check fetcher.js for route description

async function purposes(req, res) {
    if (req.query.page && !isNaN(req.query.page)) {

        const i = parseInt(req.query.item_id) ? req.query.item_id: 2;
        const s = parseInt(req.query.size) ? req.query.size : 0;

     
     connection.query(`SELECT DISTINCT rented_for
        FROM Review_Rent r 
        JOIN Product_Rent p ON (r.item_id = p.item_id AND r.size = p.size)
        WHERE p.item_id = '${i}' AND p.size = '${s}'`,  function (error, results, fields)
    
    {

         if (error) {
             console.log(error)
             res.json({ error: error })
         } else if (results) {
             res.json({ results: results })
         }
     });

 } else {
    console.log("page not defined")
    res.json({message: "in the error field -- page was not defined"});
     }
}


//Route 3: - check fetcher.js for route description
async function getProductFromRating(req, res) {
    if (req.query.page && !isNaN(req.query.page)) {

        const i = parseInt(req.query.item_id) ? req.query.item_id: 0;
        const q = parseInt(req.query.rating) ? req.query.rating : 5.0; ;
     
     connection.query(`SELECT review_text AS Review, fit AS Fit
        FROM Product_Rent p JOIN Review_Rent r ON p.item_id = r.item_id AND p.size =r.size 
        WHERE p.item_id = '${i}' AND rating = ${q}`, function (error, results, fields)
{

         if (error) {
             console.log(error)
             res.json({ error: error })
         } else if (results) {
             res.json({ results: results })
         }
     })

 } else {
    console.log("page not defined")
    res.json({message: "in the error field -- page was not defined"});
     }
}


//Route 4: - check fetcher.js for route description

async function bodytype(req, res) {
    if (req.query.page && !isNaN(req.query.page)) {
   
     connection.query(`SELECT body_type, COUNT(DISTINCT p.size) AS num
        FROM  Customer_Rent c JOIN Review_Rent t ON c.user_id = t.user_id JOIN Product_Rent p ON t.item_id = p.item_id AND t.size = p.size
        WHERE body_type IS NOT NULL
        GROUP BY body_type
        ORDER BY COUNT(DISTINCT p.size)`, function (error, results, fields)
{
         if (error) {
             console.log(error)
             res.json({ error: error })
         } else if (results) {
             res.json({ results: results })
         }
     });

 } else {
    console.log("page not defined")
    res.json({message: "in the error field -- page was not defined"});
     }
}


//Route 5: - check fetcher.js for route description

async function top_category_size(req, res) {
    if (req.query.page && !isNaN(req.query.page)) {
        
        console.log("in route");
        const c = parseInt(req.query.category) ? req.query.category: "new";
        const s = parseInt(req.query.size) ? req.query.size : 0; 

     connection.query(`SELECT DISTINCT p.item_id, rating
        FROM Product_Mod p 
        JOIN Review_Mod r ON p.item_id = r.item_id AND p.size = r.size
        WHERE p.category = '${c}' AND p.size = '${s}'
        ORDER BY rating DESC
        LIMIT 100`, function (error, results, fields)
{
         if (error) {
             console.log(error)
             res.json({ error: error })
         } else if (results) {
            res.json({ results: results })
         }
     });

 } else {
    console.log("page not defined")
    res.json({message: "in the error field -- page was not defined"});
     }
}


//Route 6: - check fetcher.js for route description

async function avg_rating(req, res) {
    if (req.query.page && !isNaN(req.query.page)) {

    const item_id = parseInt(req.query.item_id ? req.query.item_id: 0);
    const size = parseInt(req.query.size) ? req.query.size : 0;
   
     connection.query(`SELECT AVG(rating) as avg_rating
        FROM Product_Mod p
        JOIN Review_Mod r ON p.item_id = r.item_id AND p.size = r.size
        WHERE p.item_id = '${item_id}' AND p.size = '${size}'
        GROUP BY p.item_id`, function (error, results, fields)

{
         if (error) {
             console.log(error)
             res.json({ error: error })
         } else if (results) {
             res.json({ results: results })
         }
     });

 } else {
    console.log("page not defined")
    res.json({message: "in the error field -- page was not defined"});
     }
    }


    //Route 7:

    async function reviewwords(req, res) {
        if (req.query.page && !isNaN(req.query.page)) {

            const word1 = req.query.keyword1;
            const word2 = req.query.keyword2;
            const price1 = parseInt(req.query.price);
            const price2 = req.query.price2

            console.log("before connection in reviewword")
       
         connection.query(`SELECT p.title as ProductTitle, AVG(r.overall) as AvgRating, p.price as price, r.reviewText as review
         FROM Amazon_Product p NATURAL JOIN Amazon_Review r
         WHERE (p.price < '${price2}') AND (p.price > '${price1}') AND
         EXISTS (SELECT asin
         FROM Amazon_Review subRev1
         WHERE subRev1.asin = p.asin AND (subRev1.reviewText LIKE '%${word1}%')) OR
         EXISTS (SELECT asin
         FROM Amazon_Review subRev2
         WHERE subRev2.asin = p.asin AND (subRev2.reviewText LIKE '%${word2}%'))
         GROUP BY p.asin
         ORDER BY AVG(r.overall) DESC`, function (error, results, fields)
 {
             if (error) {
                 console.log(error)
                 res.json({ error: error })
             } else if (results) {
                console.log("query succeeded ")
                 res.json({ results: results })
             }
         });
    
     } else {
        console.log("page not defined")
        res.json({message: "in the error field -- page was not defined"});
         }
 }


 //Route 8:

 async function categoryhelpful(req, res) {

    console.log("in route function")
    console.log("page: ", req.query.page)

    if (req.query.page && !isNaN(req.query.page)) {
       // const pagesize = 10
        const h = parseFloat(req.query.helpful) ? req.query.helpful : 0.0;
        const cin = req.query.category ? req.query.category : "Women";
        //const lowerbound = 1000 + pagesize * (req.query.page - 1)

        console.log("before connection quiery")
        console.log("page: ", req.query.page)
        console.log("before connection query")

     connection.query(`SELECT p.asin, title, AVG(overall) as avg_rating, imUrl as image
        FROM (Amazon_Product p NATURAL JOIN Amazon_Review r) NATURAL JOIN Amazon_Categories c
        WHERE (r.helpful_calculated >= '${h}') AND (category1 = '${cin}' OR category2 = '${cin}') AND
        EXISTS (SELECT overall
            FROM Amazon_Review r2
            WHERE p.asin = r2.asin AND overall = 5.0) AND
        (NOT EXISTS (SELECT overall
            FROM Amazon_Review r2
            WHERE p.asin = r2.asin AND overall = 0))
        GROUP BY p.asin
        ORDER BY avg_rating DESC`, function (error, results, fields)
{
         if (error) {
             console.log(error)
             res.json({ error: error })
         } else if (results) {
             console.log("query went through -- success!")
             res.json({ results: results })
         }
     });

 } else {
        console.log("page not defined")
         res.json({message: "in the error field -- page was not defined"});
     }
}


//Route 9: 

async function relatedproducts(req, res) {
    console.log(req.query.page)
    if (req.query.page && !isNaN(req.query.page)) {

        const category2 = req.query.category2;

        console.log("before connection in relatedproducts")
     connection.query(`WITH ReviewTemp as (
        SELECT asin, helpful_calculated, unixReviewTime
        FROM Amazon_Review
        WHERE helpful_calculated > 0.1
    ),
     Products as(
        SELECT Prod.asin, alsoView, alsoBought, boughtTogether
        FROM ((Amazon_Product Prod JOIN Amazon_Related Rel on Prod.asin = Rel.asin)
            JOIN ReviewTemp RevTemp ON Prod.asin = RevTemp.asin)
            JOIN Amazon_Categories Cat ON Prod.asin = Cat.asin
        WHERE category2 = '${category2}'
    ), alsoBoughtTimes as (
        SELECT P.asin, P.alsoBought, unixReviewTime AS timeAlsoBought
        FROM Products P JOIN ReviewTemp RT ON  P.alsoBought = RT.asin
    ), boughtTogetherTimes as (
        SELECT P.asin, P.boughtTogether, unixReviewTime AS timeBoughtTogether
        FROM Products P JOIN ReviewTemp RT ON  P.boughtTogether = RT.asin
    )
    SELECT Prod.asin, Prod.alsoView, Prod.alsoBought, Prod.boughtTogether, ABS(timeAlsoBought - timeBoughtTogether)/(60*60*24) AS Difference
    FROM (Products Prod JOIN alsoBoughtTimes ABT ON Prod.asin = ABT.asin)
         JOIN boughtTogetherTimes BTT ON Prod.asin = BTT.asin
    LIMIT 1000;`, function (error, results, fields)
        {
         if (error) {
             console.log(error)
             res.json({ error: error })
         } else if (results) {
            console.log("relatedproducts suceeded")
             res.json({ results: results })
             
         }
     });

 } else {
    console.log("page not defined")
    res.json({message: "in the error field -- page was not defined"});
     }
}


//Route 10:

async function aboverating(req, res) {
    if (req.query.page && !isNaN(req.query.page)) {

        const rinLow = req.query.overallLow ? req.query.overallLow: 0;
        
        console.log("before the aboverating query")
     connection.query(`WITH highBrandRating AS
     (SELECT DISTINCT p.brand as brandName
     FROM (SELECT brand, asin FROM Amazon_Product) p NATURAL JOIN (SELECT asin, overall FROM Amazon_Review) r
     GROUP BY p.brand
     HAVING AVG(r.overall) > '${rinLow}')
     SELECT DISTINCT prod.title as title, prod.imURL as image, prod.brand as brand, AVG (rev.overall) as avg_rating
     FROM (SELECT title, imURL, brand, asin FROM Amazon_Product) prod NATURAL JOIN (SELECT asin, overall FROM Amazon_Review) rev
     WHERE prod.brand IN (SELECT brandName FROM highBrandRating)
     GROUP BY prod.asin`, function (error, results, fields)
        {
         if (error) {
             console.log(error)
             res.json({ error: error })
         } else if (results) {
            console.log("above rating query succeeded")
             res.json({ results: results })
         }
     });

 } else {
    console.log("page not defined")
    res.json({message: "in the error field -- page was not defined"});
     }
}

// Graph Query 1
async function avgpricegraph(req, res) {
    if (req.query.page && !isNaN(req.query.page)) {
        
        console.log("before the graph query")
     connection.query(`SELECT AC.category2, AVG(AP.price) AS AvgPricePerCategory
     FROM Amazon_Product AP JOIN Amazon_Categories AC on AP.asin = AC.asin
     GROUP BY category2
     ORDER BY AvgPricePerCategory DESC
     LIMIT 10
     `, function (error, results, fields)
        {
         if (error) {
             console.log(error)
             res.json({ error: error })
         } else if (results) {
            console.log("graph query succeeded")
             res.json({ results: results })
         }
     });

 } else {
    console.log("page not defined")
    res.json({message: "in the error field -- page was not defined"});
     }
}

//Graph Query 2
async function numProductGraph(req, res) {
    if (req.query.page && !isNaN(req.query.page)) {
        
        console.log("before the graph query")
     connection.query(`SELECT AC.category2, COUNT(AP.asin) AS NumProducts
     FROM Amazon_Product AP JOIN Amazon_Categories AC on AP.asin = AC.asin
     GROUP BY category2
     ORDER BY NumProducts DESC
     LIMIT 10`, function (error, results, fields)
        {
         if (error) {
             console.log(error)
             res.json({ error: error })
         } else if (results) {
            console.log("graph query succeeded")
             res.json({ results: results })
         }
     });

 } else {
    console.log("page not defined")
    res.json({message: "in the error field -- page was not defined"});
     }
}





 



module.exports = {
    productuserinfo,
    purposes,
    aboverating,
    relatedproducts,
    categoryhelpful,
    reviewwords,
    avg_rating,
    bodytype,
    getProductFromRating,
    top_category_size,
    avgpricegraph,
    numProductGraph,
}