import Question from '../models/Question'
import User from '../models/User'

export const QuestionCreation = async (req, res) => {
  const { title, description, answer, tag, info } = req.body
  const { _id } = req.session.user
  const questionNumberCh = 1000

  //const questionNumber
  const question = await Question.count()

  try {
    const questionOnwer = await Question.create({
      title,
      day: new Date(),
      description,
      answer,
      owner: _id,
      questionNumber: questionNumberCh + question,
      tag,
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
    const questionInfo = await Question.find({}, { _id: 0, owner: 0, __v: 0 })
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
