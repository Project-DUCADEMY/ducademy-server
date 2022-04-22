import QnA from '../models/Qna'

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
    const a = await QnA.create({
      title,
      category,
      content,
      creator: _id,
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

    console.log(a)
  } catch (e) {
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error',
    })
  }
}
