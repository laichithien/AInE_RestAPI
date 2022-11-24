const {Topic, Vie, Eng} = require("../model/model")

const topicController = {
    addATopic: async (req, res) => {
        try {
            const newTopic = new Topic(req.body);
            const savedTopic = await newTopic.save();
            res.status(200).json(savedTopic);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllTopic: async (req, res) => {
        try {
            const topics = await Topic.find();
            res.status(200).json(topics);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getATopicByName: async (req, res) => {
        try {
            const topic = await Topic.find({"name": req.params.name});
            res.status(200).json(topic);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateATopicByID: async (req, res) => {
        try {
            const topic = await Topic.findById(req.params._id);
            await topic.updateOne({$set: req.body});
            res.status(200).json("Updated successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteATopicByName: async (req, res) => {
        try {
            const topic = await Topic.find({"name": req.params.name});
            const topicId = topic[0]._id.toString();
            await Topic.findByIdAndDelete(topicId);
            res.status(200).json("Successful!");
        } catch (error) {
            res.status(500).json(error);
        }
    }
};
module.exports = topicController;