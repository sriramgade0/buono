const Buono = require("../models/Buono");

exports.getAllBuonos = async (req, res) => {
    try {
        const allBuonos = await Buono.find();
        return res.status(200).send(allBuonos);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(400).send({ message: 'Error fetching Buono' });
    }
};

exports.createBuono = async (req, res) => {
    try {
        const newBuono = await Buono.create(req.body);
        return res.status(201).send({ newBuono });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(400).send({ message: 'Error creating Buono' });
    }
};

exports.updateBuono = async (req, res) => {
    try {
        const updatedBuono = await Buono.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedBuono) {
            return res.status(404).send({ message: 'Buono not found' });
        }
        return res.status(200).send({ updatedBuono });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(400).send({ message: 'Error updating Buono' });
    }
};

exports.deleteBuono = async (req, res) => {
    try {
        const deletedBuono = await Buono.findByIdAndDelete(req.params.id);
        if (!deletedBuono) {
            return res.status(404).send({ message: 'Buono not found' });
        }
        return res.status(200).send({ deletedBuono });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(400).send({ message: 'Error deleting Buono' });
    }
};
