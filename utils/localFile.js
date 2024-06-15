const fs = require('fs')

const localFile = async (file) => {
  console.log('localFile: ', file)
  if (!file) return null
  const fileName = `upload/${file.originalname}`
  try {
    const data = await fs.promises.readFile(file.path)
    await fs.promises.writeFile(fileName, data)
    return `/${fileName}`
  } catch (err) {
    throw err
  }
}
module.exports = localFile
