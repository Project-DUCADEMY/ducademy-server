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
      Message: '모든 문제를 불러 왔습니다.',
    })
    console.log(a)
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
    const findQnA = await QnA.findOne({ _id: id })

    res.status(200).json({
      code: 200,
      Message: '문제 조회 성공.',
      findQnA,
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
  } catch (e) {
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error',
    })
  }
}
