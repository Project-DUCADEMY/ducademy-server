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
  const { query } = req.query
  try {
    const a = await QnA.find({
      $or: [
        {title: {$regex: query}, '$options':'i'},
        {category: {$regex: query}, '$options':'i'},
        {content: {$regex: query}, '$options':'i'},
        {creator: {$regex: query}, '$options':'i'},
      ]
    }, { answer: 0, __v: 0, content: 0})
    .sort({ day : -1 })

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

export const recentQuestion = async (req, res) => {
  const { _id } = req.session.user
  try {
    User.findOne({ _id }, { username: 1, _id: 0 })
    .then(({username}) => {
      QnA.find({ creator: username }, { answer: 0, __v: 0, content: 0}).sort({ day : -1 }).limit(6)
      .then(a => {
        res.status(200).json({
          code: 200,
          QnAList: a,
          Message: '',
        })
      }).catch(e => {throw e})
    }).catch(e => {throw e})
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

export const changeQnA = async (req, res) => {}

export const deleteQnA = async (req, res) => {
  const { id } = req.query
  const { _id } = req.session.user

  try {
    const createUser = await User.findOne({ _id })
    const findUser = await QnA.findOne({
      _id: id,
      creator: createUser.username,
    })

    if (findUser) {
      await QnA.findOneAndDelete({ _id: id, creator: createUser.username })
      res.status(200).json({
        code: 200,
        Message: '성공적으로 삭제 되었습니다.',
      })
    } else {
      res.status(400).json({
        code: 400,
        errorMessage: '이 문제의 삭제 권한을 가지고 있지 않습니다.',
      })
    }
  }
  catch (e) {

  }
}



export const registerComment = async (req, res) => {
  const { id } = req.query
  const userid = req.session.user._id
  const { content } = req.body
  const allInfos = async () => {
    const result = await Promise.all([
      User.findOne({ _id: userid }, { username: 1, _id: 0 }),
      QnA.findOne({ _id: id }, { __v: 0 })
    ])
    return {
      username: result[0].username,
      QnA: result[1]
    }
  }
  try {
    const { username, QnA } = await allInfos()
    QnA.comment.push({
      name: username,
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

  } catch (e) {
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error',
    })
  }
}