const { updateAWordByID } = require("../controllers/vieController");
const vieController = require("../controllers/vieController");

const router = require("express").Router();

// ADD A WORD
router.post("/", vieController.addAWord);

// GET ALL WORDS
router.get("/", vieController.getAllWords);

// GET A WORD BY NAME 
router.get("/name/:name", vieController.getAWordByName);

// UPDATE A WORD BY ID
router.put("/id/:id", vieController.updateAWordByID)

// DELETE A WORD BY NAME
router.delete("/name/:name", vieController.deleteAWordByName);

// ADD MEANING BY NAME

module.exports = router;