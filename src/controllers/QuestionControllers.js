import Question from "../models/Question"

export const QuestionCreation = async (req, res) => {
  const { title, day, description, answer } = req.body

  try {
    await Question.create({
      title,
      day,
      description,
      answer,
      owner: req.session.user._id,
    })
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      errorMessage: "DB error : Question",
    })
  }

  console.log("test")
}
