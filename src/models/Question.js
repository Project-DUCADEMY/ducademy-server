import mongoose from 'mongoose'

const QuestionSchema = new mongoose.Schema({
  questionNumber: { type: Number, required: false },
  day: { type: String, required: true },
  owner: { type: String, required: true, ref: 'User' },
  title: { type: String, required: true, maxlength: 20 },
  content: { type: String, required: true },
  description: { type: String, required: true, maxlength: 5000 },
  answer: { type: String, required: true },
  info: [{ type: String, required: false }],
  source: { type: String, required: false },
  existence: { type: Number, required: true },
})

const Question = mongoose.model('Question', QuestionSchema)

export default Question
