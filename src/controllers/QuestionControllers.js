import Question from "../models/Question"
import User from "../models/User"

export const QuestionCreation = async (req, res) => {
  const { title, description, answer } = req.body
  const { _id } = req.session.user

  try {
    const questionOnwer = await Question.create({
      title,
      day: new Date(),
      description,
      answer,
      owner: _id,
    })

    const user = await User.findById(_id)
    user.Questions.push(questionOnwer._id)
    user.save()
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      errorMessage: "DB error : Question",
    })
  }

  console.log("test")
}
