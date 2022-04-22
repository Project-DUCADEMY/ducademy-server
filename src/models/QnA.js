import mongoose from 'mongoose'

const QnASchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  creator: { type: String, required: true },
  answer: [
    {
      name: { type: String, required: false },
      cotent: { type: String, required: false },
    },
  ],
  day: { type: String, required: true },
})

const QnA = mongoose.model('Qna', QnASchema)

export default QnA
