import mongoose from 'mongoose'

const workBookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  vowels: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Question' },
  ],
})

const workBook = mongoose.model('workBook', workBookSchema)

export default workBook
