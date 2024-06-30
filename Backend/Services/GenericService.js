const mongoose = require('mongoose')

async function getAll (res, Model, name) {
    const result = await Model.find()
    if(result) {
        res.status(200).json({ success: true, data: result, message: `All ${name} fetched successfully`})           
    } else {
        res.status(404).send(name+ "not found!")
    }
}

async function getById(req,res,Model,name) {
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid ID")
    }
    const result = await Model.findById(id)
    if(result) {
        res.status(200).json(result)
    } else {
        res.status(404).send(name+" not found!")
    }
}

async function deleteById(req,res,Model,name) {
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid ID")
    }
    const result = await Model.findByIdAndDelete(id)
    if(result) {
        res.status(200).json(result)
    } else {
        res.status(404).send(name+" not found!")
        }
}

async function getCount(res,Model,name) {
    const result = await Model.countDocuments()
    if(result) {
        res.status(200).json(result)
    } else {
        res.status(404).send(name+" not found!")
        }
}

module.exports = {getAll, getById, deleteById, getCount}