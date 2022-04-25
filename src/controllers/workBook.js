import WorkBook from '../models/WorkBook'
import User from '../models/User'

export const workBookCreation = async (req, res) => {
  const { _id } = req.session.user
  const { title, questionNumber, color } = req.body
  const qusetions = []

  for (let i = 0; i < questionNumber.length; i++) {
    qusetions.push(questionNumber[i].id)
  }

  const ownerName = await User.findById({ _id }, { username: 1, _id: 0 })

  try {
    await WorkBook.create({
      title,
      color: color,
      owner: ownerName.username,
      vowels: qusetions,
    })

    return res.status(200).json({
      code: 200,
      Message: 'success',
    })
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error : workbook',
    })
  }
}

export const workBookList = async (req, res) => {
  const { _id } = req.session.user

  try {
    const workBookAllList = await WorkBook.find({}, { __v: 0 })

    return res.status(200).json({
      code: 200,
      Message: 'success',
      workBookAllList,
    })
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error : Memo',
    })
  }
}

export const workBookOneList = async (req, res) => {
  const { id } = req.query

  try {
    const workBookOneList = await WorkBook.findById({ _id: id })

    return res.status(200).json({
      code: 200,
      Message: 'success',
      workBookOneList,
    })
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error : Memo',
    })
  }
}

export const workChange = async (req, res) => {
  const { title, vowels } = req.body
  const { id } = req.query

  try {
    await WorkBook.findOneAndUpdate(
      { _id: id },
      {
        title,
        vowels,
      }
    )
    return res.status(200).json({
      code: 200,
      Message: 'success',
    })
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error : Memo',
    })
  }
}

export const workbookDelete = async (req, res) => {
  const { id } = req.query

  try {
    await WorkBook.findByIdAndDelete({ _id: id })
    return res.status(200).json({
      code: 200,
      Message: 'success',
    })
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error : Memo',
    })
  }
}
