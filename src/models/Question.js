import mongoose from "mongoose"

const QuestionSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 20 },
  day: { type: String, required: true },
  description: { type: String, required: true, maxlength: 100 },
  answer: { type: Number, required: true },
  // meta: {
  //   views: { type: Number, default: 0, required: true },
  //   challenges: { type: Number, default: 0, required: true },
  //   right: { type: Number, default: 0, required: true },
  //   failure: { type: Number, default: 0, required: true },
  // },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
})

const Question = mongoose.model("Question", QuestionSchema)

export default Question