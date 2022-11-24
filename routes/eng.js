const engController = require("../controllers/engController");

const router = require("express").Router();

// ADD A WORD
router.post("/", engController.addAWord);

// GET ALL WORDS
router.get("/", engController.getAllWords);

// GET A WORD BY NAME
router.get("/name/:name", engController.getAWordByName);

// UPDATE A WORD BY ID
router.put("/id/:_id", engController.updateAWordByID);

// DELETE A WORD BY NAME
router.delete("/name/:name", engController.deleteAWordByName);

// ADD A MEANING BY NAME
router.put("/name/:name", engController.addAMeaningByName);

module.exports = router;