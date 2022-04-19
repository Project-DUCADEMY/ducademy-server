import mongoose from 'mongoose'

const MemoSchema = new mongoose.Schema({
  questionNumber: {
    type: String,
    ref: 'Question',
    required: true,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: false },
  color: { type: String, required: false },
})

const Memo = mongoose.model('Memo', MemoSchema)

export default Memo
