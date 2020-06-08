const { find } = require('../repository/prospects');

async function get(req, res) { 

    const { query } = req; 
    const results = await find(query) || []

    return res.status(200).json(results);
}


module.exports =  {
    get
}