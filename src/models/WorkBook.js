import mongoose from 'mongoose'

const workBookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  owner: { type: String, required: true, ref: 'User' },
  color: { type: String, required: true},
  vowels: [{ type: String, required: true }],
})

const WorkBook = mongoose.model('workBook', workBookSchema)

export default WorkBook
