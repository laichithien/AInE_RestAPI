const {Topic, Vie, Eng} = require("../model/model")

const vieController = {
    addAWord: async (req, res) => {
        try {
            const newWord = Vie(req.body);
            const savedWord = await newWord.save();
            res.status(200).json(savedWord);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllWords: async (req, res) => {
        try {
            const words = await Vie.find().populate("meaning");
            res.status(200).json(words);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAWordByName: async (req, res) => {
        try {
            const word = await Vie.find({"name": req.params.name});
            res.status(200).json(word);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateAWordByID: async (req, res) => {
        try {
            const word = await Vie.findById(req.params._id);
            await word.updateOne({$set: (req.body)});
            res.status(200).json("Updated successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteAWordByName: async (req, res) => {
        try {
            const word = await Vie.find({"name": req.params.name});
            const wordId = word[0]._id.toString();
            await Eng.updateMany(
                {meaning: wordId},
                {$pull: {meaning: wordId}}
            );
            await Vie.findByIdAndDelete(wordId);
            res.status(200).json("Successful!");
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = vieController;