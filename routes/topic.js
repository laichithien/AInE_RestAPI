const topicController = require("../controllers/topicController");

const router = require("express").Router();

// ADD A TOPIC
router.post("/", topicController.addATopic);

// GET ALL TOPICS
router.get("/", topicController.getAllTopic);

// GET A TOPIC BY NAME
router.get("/name/:name", topicController.getATopicByName);

// UPDATE A TOPIC BY ID
router.put("/id/:_id", topicController.updateATopicByID);

// DELETE A TOPIC
router.delete("/name/:name", topicController.deleteATopicByName);

module.exports = router;