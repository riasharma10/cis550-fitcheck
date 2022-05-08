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
    return res.json()
}

const getMatch = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/match?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayer = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/player?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatchSearch = async (home, away, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/matches?Home=${home}&Away=${away}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayerSearch = async (name, nationality, club, rating_high, rating_low, pot_high, pot_low, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/players?Name=${name}&Nationality=${nationality}&Club=${club}&RatingLow=${rating_low}&RatingHigh=${rating_high}&PotentialHigh=${pot_high}&PotentialLow=${pot_low}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}













export {
    getCategoriesHelpful,
    getProductsFromKeywords,
    getMatch,
    getPlayer,
    getMatchSearch,
    getPlayerSearch
}