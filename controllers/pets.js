const { Pet } = require('../models')

const { asyncError } = require('../middlewares')

const { sucRes } = require('../utils/customResponse')

const Validator = require('../Validator')

const Joi = require('joi')

// const schema = Joi.object({ name: Joi.string().required() })

class PetsController extends Validator {
  // constructor() {
  //   super(schema)
  // }

  getPets = asyncError(async (req, res, next) => {
    const pets = await Pet.findAll()

    sucRes(res, 200, 'Get all Pets table data successfully.', pets)
  })

  getPet = asyncError(async (req, res, next) => {
    const { petId } = req.params
    const pet = await Pet.findByPk(petId)
    this.validatePk(pet)

    sucRes(res, 200, `Get Pets table data from id ${petId} successfully.`, pet)
  })

  // postPet = asyncError(async (req, res, next) => {
  //   this.validateBody(req.body)
  //   const { name } = req.body

  //   const pet = await Pet.create({ name })

  //   sucRes(res, 201, `Created new Pets table data successfully.`, pet)
  // })

  // putPet = asyncError(async (req, res, next) => {
  //   this.validateBody(req.body)
  //   const { name } = req.body

  //   const { petId } = req.params
  //   const [pet, preserved] = await Promise.all([
  //     Pet.findByPk(petId),
  //     Pet.findOne({ where: { name: 'Other' } })
  //   ])
  //   this.validatePk(pet)
  //   this.validatePreserved(pet.name, preserved.name)

  //   await Pet.update({ name }, { where: { id: petId } })

  //   sucRes(res, 200, `Updated table data with id ${petId} successfully.`)
  // })

  // deletePet = asyncError(async (req, res, next) => {
  //   const { petId } = req.params
  //   const [pet, preserved] = await Promise.all([
  //     Pet.findByPk(petId),
  //     Pet.findOne({ where: { name: 'Other' } })
  //   ])
  //   this.validatePk(pet)
  //   this.validatePreserved(pet.name, preserved.name)

  //   await Pet.destroy({ where: { id: petId } })

  //   sucRes(res, 200, `Deleted table data with id ${petId} successfully.`)
  // })
}

module.exports = new PetsController()
