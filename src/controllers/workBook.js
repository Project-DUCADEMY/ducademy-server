import workBook from '../models/WorkBook'

export const workBookCreation = async (req, res) => {
  const { _id } = req.session.user
  const { title, questionNumber } = req.body
  const qusetions = []

  for (let i = 0; i < questionNumber.length; i++) {
    qusetions.push(questionNumber[i].id)
  }

  console.log(qusetions.join(' '))

  try {
    await workBook.create({
      title,
      owner: _id,
      vowels: qusetions,
    })
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error : workbook',
    })
  }
}

export const workBookList = (req, res) => {}

export const workChange = (req, res) => {}

export const workbookDelete = (req, res) => {}
