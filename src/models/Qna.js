import mongoose from 'mongoose'

const QnASchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  creator: { type: String, required: true },
  comment: [
    {
      name: { type: String, required: false },
      content: { type: String, required: false },
      date: { type: String, required: false},
      adopt: { type: Boolean, required: true}
    },
  ],
  day: { type: String, required: true },
})

const QnA = mongoose.model('Qna', QnASchema)

export default QnA