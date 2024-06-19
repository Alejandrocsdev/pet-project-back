const axios = require('axios')
const CustomError = require('../../../errors/CustomError')

const API = process.env.IMGUR_API
const accessToken = process.env.IMGUR_ACCESS_TOKEN

class Imgur {
  async upload(file) {
    if (!file) return null

    try {
      const image = file.buffer.toString('base64')
      const response = await axios.post(
        `${API}/image`,
        { image },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      const data = response.data.data
      let link = data.link
      const deleteData = data.deletehash

      if (link.endsWith('.jpeg')) link = link.slice(0, -5) + '.jpg'

      return { link, deleteData }
    } catch (err) {
      throw new CustomError(500, 'Failed to upload local image. (imgur)')
    }
  }

  async delete(deletehash) {
    try {
      await axios.delete(`${API}/image/${deletehash}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    } catch (err) {
      throw new CustomError(500, 'Failed to delete image. (imgur)')
    }
  }
}

module.exports = new Imgur()
