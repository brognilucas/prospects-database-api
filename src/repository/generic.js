const mongoose = require('mongoose');

module.exports = (model) => {
    const db = mongoose.model(model);
    return {
        find: async (query) => {
            return db.find(query).lean().exec()
        },
        create: async (data) => {
            return db.create(data)
        },
        findOneAllowingPopulate: async (code) => { 
            return db.findOne({ code })
        },
        findOneByCode: async (code) => {
            return db.findOne({ code }).lean().exec()
        },
        update: async (data) => {
            return db.updateOne({ code: data.code }, { $set: data }).lean().exec()
        },
        remove: async (code) => {
            return db.deleteOne({ code }).lean().exec();
        },
        db
    }
}