import config from './config.json'

const getCategoriesHelpful = async (page, helpful, category) => {

    var res = await fetch(`http://${config.server_host}:${config.server_port}/categoryhelpful/?page=${page}&helpful=${helpful}&category=${category}`, {
        method: 'GET',
     })
     return res.json()
    
    
}

const getProductsFromKeywords = async (page, word1, word2, price, priceHigh) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/reviewwords?page=${page}&keyword1=${word1}&keyword2=${word2}&price=${price}&price2=${priceHigh}`, {
       method: 'GET',
    })
   
    return res.json();
}

const getRelatedProducts = async (page, category2) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/relatedproducts?page=${page}&category2=${category2}`, {
        method: 'GET',
    })

    return res.json();
}

const getAboveRating = async (page, priceLow) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/aboverating?page=${page}&overallLow=${priceLow}}`, {
        method: 'GET',
    })
    return res.json()

}

// For a certain product return which purposes it has been rented for (can be used for advertising / marketing purposes)
const getInfoQuery1Search = async (item_id, size, page) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/purposes?item_id=${item_id}&size=${size}&page=${page}`, {
        method: 'GET',
    })
    return res.json()
}

// Returns personalized product suggestions based on input bust size, body type, and age range
const getProductSuggestions = async (bodytype, bust, age_high, age_low, page) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/productuserinfo/?userbodytype=${bodytype}&bustApprox=${bust}&ageupperbound=${age_high}&agelowerbound=${age_low}&page=${page}`, {
        method: 'GET',
    })
    return res.json()
}

// Based on inputted item_id in RentTheRunway and a desired rating, find all reviews and fit with that rating for that product
const getInfoQuery2Search = async (item_id, rating, page) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/getProductFromRating?item_id=${item_id}&rating=${rating}&page=${page}`, {
        method: 'GET',
    })
    console.log(res)
    return res.json()
}

// Returns the numbers of distinct sizes customers of each body type have purchased
const getBodyTypeCounts = async (page) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/bodytype/?page=${page}`, {
        method: 'GET',
    })
    return res.json()
}

// Returns the top 100 products for a specific category based on reviews from customers with similar sizes
const getTopProductsByCategorySize = async (category, size, page) => {
    console.log("in fetcher");
    var res = await fetch(`http://${config.server_host}:${config.server_port}/top_category_size/?category=${category}&size=${size}&page=${page}`, {
        method: 'GET',
    })
    return res.json()
}

// Given a product in ModCloth (item_id i and size s) return its average rating
const getInfoQuery3Search = async (item_id, size, page) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/avg_rating?item_id=${item_id}&size=${size}&page=${page}`, {
        method: 'GET',
    })
    return res.json()
}

const getAvgPrice = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/avgpricegraph?page=1`, {
        method: 'GET',
    })
    return res.json()
}

const getNumProducts = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/numProductGraph?page=1`, {
        method: 'GET',
    })
    return res.json()
}



export {
    getCategoriesHelpful,
    getProductsFromKeywords,
    getRelatedProducts,
    getAboveRating,
    getInfoQuery1Search,
    getInfoQuery2Search,
    getInfoQuery3Search,
    getProductSuggestions,
    getBodyTypeCounts,
    getTopProductsByCategorySize,
    getNumProducts,
    getAvgPrice
}