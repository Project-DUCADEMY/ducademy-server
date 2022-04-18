import Question from '../models/Question'
import User from '../models/User'

export const QuestionCreation = async (req, res) => {
  const { title, description, answer, info, source, content } = req.body
  const { _id } = req.session.user
  const questionNumberCh = 1000

  // const questionNumber
  const question = await Question.count()

  // info shift
  const infoShift = info.split('#')
  infoShift.shift()

  // ownerName
  const ownerName = await User.findById({ _id }, { _id: 0, username: 1 })

  try {
    const questionOnwer = await Question.create({
      questionNumber: questionNumberCh + question,
      day: new Date(),
      owner: ownerName.username,
      title,
      content,
      description,
      answer,
      info: infoShift,
      source,
      existence: '1',
    })

    const user = await User.findById(_id)
    user.Questions.push(questionOnwer._id)
    user.save()

    return res.status(200).json({
      code: 200,
      Message: 'success',
    })
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error : Question',
    })
  }
}

export const pullQuestion = async (req, res) => {
  let ownerName

  try {
    const questionInfo = await Question.find(
      { existence: 1 },
      {
        _id: 0,
        content: 0,
        __v: 0,
        description: 0,
        answer: 0,
        source: 0,
        existence: 0,
        info: 0,
      }
    )

    return res.status(200).json({
      code: 200,
      questionInfo,
      Message: 'success',
    })
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      errorMessage: 'Failed to retrieve information',
    })
  }
}

export const oneQuestion = async (req, res) => {
  const { id } = req.query

  try {
    const question = await Question.findOne(
      { questionNumber: id },
      { _id: 0, __v: 0 }
    )

    if (question.existence == '0') {
      return res.status(404).json({
        code: 404,
        Message: '삭제되거나 존재하지 않습니다.',
      })
    }

    return res.status(200).json({
      code: 200,
      question,
    })
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error',
    })
  }
}

export const deleteQuestion = async (req, res) => {
  const { id } = req.query

  try {
    const deleteQuestion = await Question.findOne({ questionNumber: id })

    deleteQuestion.existence = '0'
    deleteQuestion.save()

    return res.status(200).json({
      code: 200,
      Message: 'delete',
    })
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error',
    })
  }
}

export const updateQuestion = async (req, res) => {
  const { id } = req.query
  const { title, content, description, answer, info, source } = req.body

  try {
    await Question.findOneAndUpdate(
      { questionNumber: id },
      {
        title,
        content,
        description,
        answer,
        info,
        source,
      },
      { new: true }
    )

    return res.status(200).json({
      code: 200,
      Message: 'success',
    })
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error',
    })
  }
}
