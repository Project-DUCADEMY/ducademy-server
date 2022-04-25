import Question from '../models/Question'
import User from '../models/User'
import Like from '../models/additional/Like'
import Try from '../models/additional/try'

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
    const questionOwner = await Question.create({
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
    user.Questions.push(questionOwner._id)
    user.save()

    await Like.create({
      Question: questionNumberCh + question,
    })

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

  const { query } = req.query
  try {
    const questionInfo = await Question.find(
      { existence: 1,
        $or: [
          {title: {$regex: query}, '$options':'i'},
          {owner: {$regex: query}, '$options':'i'},
          {content: {$regex: query}, '$options':'i'},
          {info: {$regex: query}, '$options':'i'}
        ]
      },
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
  const { _id } = req.session.user
  const queryQuestionDetail = async () => {
    let result = await Promise.all([
      await Question.findOne(
        { questionNumber: id },
        { _id: 0, __v: 0 }
      ),
      await Try.findOne(
        {
          tryUser: _id,
          questionOwner: id,
        },
        { try: 1, success: 1 }
      )
    ])
    return result
  }
  try {
    const question = await Question.findOne(
      { questionNumber: id },
      { _id: 0, __v: 0 }
    )

    let test = await queryQuestionDetail();

    if (question.existence == '0') {
      return res.status(404).json({
        code: 404,
        Message: '삭제되거나 존재하지 않습니다.',
      })
    }

    return res.status(200).json({
      code: 200,
      question: test[0],
      submit: test[1]
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

export const likeQuestion = async (req, res) => {
  const { id } = req.query
  const { _id } = req.session.user

  try {
    const findUser = await Like.findOne({ User: _id, Question: id })
    const findLike = await Like.findOne({ Question: id })

    if (!findUser) {
      findLike.User.push(_id)
      findLike.save()

      const OK = await Like.findOneAndUpdate(
        { Question: id },
        { like: findLike.like + 1 }
      )
      const end = OK.like + 1

      return res.status(200).json({
        code: 200,
        Message: 'success',
        end,
      })
    } else {
      return res.status(400).json({
        code: 400,
        errorMessage: '이미 추천했습니다.',
      })
    }
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error',
    })
  }
}

export const answrQuestion = async (req, res) => {
  const { _id } = req.session.user
  const { answer, questionNumber } = req.body
  console.log(answer, questionNumber)
  try {
    const answerTest = await Question.findOne({ questionNumber, answer })

    const tryUser = await Try.findOne(
      {
        tryUser: _id,
        questionOwner: questionNumber,
      },
      { try: 1, success: 1 }
    )

    // if (tryUser.success) {
    //   return res.status(200).json({
    //     code: 200,
    //     try: tryUser.try,
    //     success: tryUser.success,
    //     Message: '이미 문제를 맞췄습니다.',
    //   })
    // }

    if (!tryUser) {
      if (answerTest) {
        await Try.create({
          questionOwner: questionNumber,
          try: 1,
          tryUser: _id,
          success: true,
        })

        return res.status(200).json({
          code: 200,
          try: 1,
          success: true,
          Message: '맞았습니다.',
        })
      } else {
        await Try.create({
          questionOwner: questionNumber,
          try: 1,
          tryUser: _id,
          success: false,
        })
        return res.status(200).json({
          code: 200,
          try: 1,
          success: false,
          Message: '틀렸습니다.',
        })
      }
    } else {
      if (answerTest) {
        const trueEnd = await Try.findOneAndUpdate(
          { tryUser: _id, questionOnwer: questionNumber },
          { try: tryUser.try + 1, success: true }
        )

        return res.status(200).json({
          code: 200,
          try: trueEnd.try + 1,
          success: true,
          Message: '맞았습니다.',
        })
      } else {
        const falseEnd = await Try.findOneAndUpdate(
          {
            tryUser: _id,
            questionOwner: questionNumber,
          },
          { try: tryUser.try + 1, success: false }
        )

        return res.status(200).json({
          code: 200,
          try: falseEnd.try + 1,
          success: false,
          Message: '틀렸습니다.',
        })
      }
    }
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error',
    })
  }
}
