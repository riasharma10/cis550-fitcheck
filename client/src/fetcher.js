import config from './config.json'

const getAllMatches = async (page, pagesize, league) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/matches/${league}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllPlayers = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/players?page=${page}&pagesize=${pagesize}`, {
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

const getInfoQuery1Search = async (item_id, size, page) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/purposes?item_id=${item_id}&size=${size}&page=${page}`, {
        method: 'GET',
    })
    return res.json()
}

const getProductSuggestions = async (bodytype, bust, age_high, age_low, page) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/productuserinfo/?userbodytype=${bodytype}&bustApprox=${bust}&ageupperbound=${age_high}&agelowerbound=${age_low}&page=${page}`, {
        method: 'GET',
    })
    return res.json()
}

const getInfoQuery2Search = async (item_id, rating, page) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/getProductFromRating?item_id=${item_id}&rating=${rating}&page=${page}`, {
        method: 'GET',
    })
    console.log(res)
    return res.json()
}

const getBodyTypeCounts = async (page) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/bodytype/?page=${page}`, {
        method: 'GET',
    })
    return res.json()
}

const getTopProductsByCategorySize = async (category, size, page) => {
    console.log("in fetcher");
    var res = await fetch(`http://${config.server_host}:${config.server_port}/top_category_size/?category=${category}&size=${size}&page=${page}`, {
        method: 'GET',
    })
    return res.json()
}

const getInfoQuery3Search = async (item_id, size, page) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/avg_rating?item_id=${item_id}&size=${size}&page=${page}`, {
        method: 'GET',
    })
    return res.json()
}



export {
    getAllMatches,
    getAllPlayers,
    getMatch,
    getPlayer,
    getMatchSearch,
    getPlayerSearch,
    getInfoQuery1Search,
    getInfoQuery2Search,
    getInfoQuery3Search,
    getProductSuggestions,
    getBodyTypeCounts,
    getTopProductsByCategorySize
}