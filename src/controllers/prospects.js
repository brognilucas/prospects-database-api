const { find, create: createDB , update , remove: removeDB } = require('../repository/prospects');

async function get(req, res) {
    const results = await find(req.query) || []
    return res.status(200).json(results);
}


async function create(req, res) {
    const { body } = req;

    try {
        await createDB(body);

        return res.status(201).send();
    }
    catch (erorr) {
        return res.status(400).send(error);
    }
}

async function put(req, res) { 
    const { body, $prospectCode : code } = req; 
    Object.assign(body, { 
        code
    });
    await update(body);
    return res.status(204).send();
}

async function remove(req, res) { 
    const { $prospectCode : code } = req; 
    await removeDB(code);

    return res.status(204).send();
}


async function getByCode(req, res) {
    const prospect = req.$prospect;
    return res.status(200).json(prospect);
}

module.exports = {
    get, getByCode, create, put, remove
}