import mongoose from "mongoose"

const QuestionSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 20 },
  description: { type: String, required: true, maxlength: 100 },
  imgUrl: { type: String, required: true },
  answer: { type: Number, required: true },
  meta: {
    views: { type: number, default: 0, required: true },
    challenges: { type: number, default: 0, required: true },
    right: { tpye: number, default: 0, required: true },
    failure: { tpye: nuber, default: 0, required: true },
  },
})
