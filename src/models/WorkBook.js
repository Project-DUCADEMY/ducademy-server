import mongoose from 'mongoose'

const workBookSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  vowels: [
    { type: mongoose.Schema.Types.ObjectId, required: ture, ref: 'Question' },
  ],
})

const workBook = mongoose.model('workBook', workBookSchema)

export default workBook
