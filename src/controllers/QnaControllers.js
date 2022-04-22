import QnA from '../models/Qna'
import User from '../models/User'

export const createQnA = async (req, res) => {
  const { title, category, content } = req.body
  const { _id } = req.session.user

  //   const a = await QnA.findOne({ creator: _id })

  //   await a.answer.push({
  //     name: '1243',
  //     co: '1234',
  //   })
  //   a.save()

  try {
    const creator = await User.findOne({ _id }, { username: 1, _id: 0 })

    await QnA.create({
      title,
      category,
      content,
      creator: creator.username,
      day: new Date(),
    })
    res.status(200).json({
      code: 200,
      Message: 'QnA 생성됨.',
    })
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error',
    })
  }
}

export const allQnA = async (req, res) => {
  try {
    const a = await QnA.find({}, { answer: 0, __v: 0 })

    res.status(200).json({
      code: 200,
      Message: '',
    })
    console.log(a)
  } catch (e) {
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error',
    })
  }
}
