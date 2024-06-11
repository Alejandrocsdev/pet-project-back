class BreedsController {
  getBreeds = (req, res) => {
    res.send('Get Breeds Route')
  }
}

module.exports = new BreedsController()
