const db = require('../repository/prospects');

async function get(req, res) {
    const results = await db.find(req.query) || []
    return res.status(200).json(results);
}


async function create(req, res) {
    const { body } = req;

    try {
        await db.create(body);

        return res.status(201).send();
    }
    catch (error) {
        return res.status(400).send(error);
    }
}

async function put(req, res) {
    const { body, $prospectCode: code } = req;
    Object.assign(body, {
        code
    });
    await db.update(body);
    return res.status(204).send();
}

async function remove(req, res) {
    const { $prospectCode: code } = req;
    await db.remove(code);

    return res.status(204).send();
}

async function getByCode(req, res) {
    const prospect = req.$prospect;
    return res.status(200).json(prospect);
}

module.exports = {
    get, getByCode, create, put, remove
}