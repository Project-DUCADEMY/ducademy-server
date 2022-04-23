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
      comment: [],
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
    const a = await QnA.find({}, { answer: 0, __v: 0, content: 0})

    res.status(200).json({
      code: 200,
      QnAList: a,
      Message: '',
    })
  } catch (e) {
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error',
    })
  }
}

export const oneQnA = async (req, res) => {
  const { id } = req.query
  try {
    const result = await QnA.findOne({_id: id}, { __v: 0})
    res.status(200).json({
      code: 200,
      QnA: result,
      Message: '',
    })
  } catch (e) {
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error',
    })
  }
}

export const registerComment = async (req, res) => {
  const { id } = req.query
  const userid = req.session.user._id
  const { content } = req.body
  const allInfos = () => {
    return Promise.all([
      User.findOne({ _id: userid }, { username: 1, _id: 0 }),
      QnA.findOne({_id: id}, { __v: 0})
    ]).then(result => {
      return {
        username: result[0],
        QnA: result[1]
      }
    })
  }
  try {
    allInfos()
    .then(({username, QnA}) => {
      QnA.comment.push({
        name: username.username,
        content: content,
        date: new Date(),
        adopt: false
      })
      QnA.save()
      return res.status(200).json({
        code: 200,
        Message: 'success',
        QnA: QnA
      })
    })
    .catch((err) => {
      throw err
    })

  } catch (e) {
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error',
    })
  }
} 
