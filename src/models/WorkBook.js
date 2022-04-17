import mongoose from 'mongoose'

const workBookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  vowels: [{ type: String, required: true }],
})

const workBook = mongoose.model('workBook', workBookSchema)

export default workBook
