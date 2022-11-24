const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
    name: {
        type:String,
        require: true,
        unique: true
    },
    words: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Eng"
    }]
});

const englishWordSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    meaning: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vie",
    }],
    synonym: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Eng"
    }],
    image_URL: {
        type: String
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic"   
    }
});

const vietnameseWordSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    meaning: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Eng",
    }]
});

let Topic = mongoose.model("Topic", topicSchema);
let Eng = mongoose.model("Eng", englishWordSchema);
let Vie = mongoose.model("Vie", vietnameseWordSchema);

module.exports = {Topic, Eng, Vie};