import Question from '../models/Question'
import User from '../models/User'

export const QuestionCreation = async (req, res) => {
  const { title, description, answer, info, source, content } = req.body
  const { _id } = req.session.user
  const questionNumberCh = 1000

  //const questionNumber
  const question = await Question.count()

  //info shift
  const infoShift = info.split('#')
  infoShift.shift()

  try {
    const questionOnwer = await Question.create({
      questionNumber: questionNumberCh + question,
      day: new Date(),
      owner: _id,
      title,
      content,
      description,
      answer,
      info: infoShift,
      source,
    })

    const user = await User.findById(_id)
    user.Questions.push(questionOnwer._id)
    user.save()
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error : Question',
    })
  }

  console.log('test')
}

export const pullQuestion = async (req, res) => {
  try {
    const questionInfo = await Question.find(
      {},
      { _id: 0, owner: 0, __v: 0, day: 0, description: 0, answer: 0, source: 0 }
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
    return res.status(200).json({
      code: 200,
      question,
    })
  } catch (e) {
    console.error(e)
  }
}
