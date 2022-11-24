const {Topic, Vie, Eng} = require("../model/model")

const engController = {
    addAWord: async (req, res) => {
        try {
            const newWord = new Eng(req.body);
            const savedWord = await newWord.save();
            res.status(200).json(savedWord);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllWords: async (req, res) => {
        try {
            const words = await Eng.find().populate("meaning");
            res.status(200).json(words);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAWordByName: async (req, res) => {
        try {
            const word = await Eng.find({"name": req.params.name});
            res.status(200).json(word);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateAWordByID: async (req, res) => {
        try {
            const word = await Eng.findById(req.params._id);
            await word.updateOne({$set: (req.body)});
            res.status(200).json("Updated successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteAWordByName: async (req, res) => {
        try {
            const word = await Eng.find({"name": req.params.name});
            const wordId = word[0]._id.toString();
            await Vie.updateMany(
                {meaning: wordId},
                {$pull: {wordId}}
            )
            await Eng.findByIdAndDelete(wordId);
            res.status(200).json("Successful!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    addAMeaningByName: async (req, res) => {
        try {
            const wordResult = await Eng.findOne({"name": req.params.name});
            const meaningWordResult = await Vie.findOne({"name": req.body.meaning});
            if (!wordResult)
            {
                const word = new Eng({"name": req.params.name});
                const savedWord = await word.save();
                if (!meaningWordResult)
                {
                    const meaningWord = new Vie({"name": req.body.meaning});
                    const savedMeaningWord = await meaningWord.save();
                    
                    const newWord = await Eng.findById(savedWord._id);
                    await newWord.updateOne({$push: {meaning: savedMeaningWord._id}});

                    const newMeaningWord = await Vie.findById(savedMeaningWord._id);
                    await newMeaningWord.updateOne({$push: {meaning: newWord._id}});
                }
                else {
                    const newWord = await Eng.findById(savedWord._id);
                    await newWord.updateOne({$push :{meaning: meaningWordResult._id}});

                    await meaningWordResult.updateOne({$push: {meaning: newWord._id}});
                }
            }
            else {
                if (!meaningWordResult)
                {
                    const meaningWord = new Vie({"name": req.body.meaning});
                    const savedMeaningWord = await meaningWord.save();
                    
                    await wordResult.updateOne({$push :{meaning: savedMeaningWord._id}});
                    const newMeaningWord = Vie.findById(savedMeaningWord._id);
                    await newMeaningWord.updateOne({$push: {meaning: wordResult._id}});
                }
                else {
                    await wordResult.updateOne({'meaning': {$ne: meaningWordResult._id}}, {$push: {meaning: meaningWordResult._id}});
                    await meaningWordResult.updateOne({'meaning': {$ne: wordResult._id}}, {$push : {meaning: wordResult._id}});
                }
            }
            res.status(200).json({message: 'Ok'});
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = engController;