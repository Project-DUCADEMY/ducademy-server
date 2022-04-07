import mongoose from 'mongoose'

const QuestionSchema = new mongoose.Schema({
  questionNumber: { type: Number, required: false },
  day: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true, maxlength: 20 },
  description: { type: String, required: true, maxlength: 100 },
  answer: { type: String, required: true },
  info: [{ type: String, required: false }],
  source: { type: String, required: false },
})

const Question = mongoose.model('Question', QuestionSchema)

export default Question
