const { find ,  create: createDB } = require('../repository/prospects');

async function get(req, res) { 

    const { query } = req; 
    const results = await find(query) || []

    return res.status(200).json(results);
}


async function create(req, res) { 
    const { body } = req; 
    
    try { 
        await createDB(body); 

        return res.status(201); 
    }
    catch(erorr) { 
        return res.status(400).send(error); 
    }


}

module.exports =  {
    get , create
}