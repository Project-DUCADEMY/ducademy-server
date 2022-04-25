import Memo from '../models/Memo'

export const MemoCreation = async (req, res) => {
  const { content, color, questionNumber } = req.body
  const { _id } = req.session.user

  console.log(req.body)

  try {
    await Memo.create({
      questionNumber,
      owner: _id,
      content,
      color,
    })

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

export const listMemo = async (req, res) => {
  const { _id } = req.session.user
  const { query } = req.query
  try {
    const readMemo = await Memo.find(
      {
        owner: _id,
        $or: [
          {content: {$regex: query}},
          {questionNumber: {$regex: query, '$options':'i'}}
        ]
      }
      ,{ owner: 0, __v: 0 }
    )

    return res.status(200).json({
      code: 200,
      readMemo,
    })
  } catch (e) {
    console.error(e)
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error',
    })
  }
}

export const changeMemo = async (req, res) => {
  const { content, color, id } = req.body
  console.log(req.body)

  try {
    const a = await Memo.findByIdAndUpdate(id, {
      content,
      color,
    })
    console.log(a)
  } catch (e) {
    console.error(e)
  }
}

export const deleteMemo = async (req, res) => {
  const { _id } = req.session.user
  const { id, query } = req.query
  try {
    await Memo.findByIdAndDelete({ _id: id })
    const memos = await Memo.find({
      owner: _id,
      $or: [
        {content: {$regex: query}},
        {questionNumber: {$regex: query, '$options':'i'}}
      ]
    }, { owner: 0, __v: 0 })
    return res.status(200).json({
      code: 200,
      memos: memos,
      Message: 'success'
    })
  } catch (e) {
    return res.status(400).json({
      code: 400,
      errorMessage: 'DB error',
    })
  }
}
