const { sequelize, Pet, Breed, User, Image } = require('../models')

const { asyncError } = require('../middlewares')

const { sucRes } = require('../utils/customResponse')

const { uploadImage, deleteImage } = require('../storage')
const storageType = process.env.STORAGE_TYPE || 'local'

const Validator = require('../Validator')

const Joi = require('joi')

const schema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().positive().required(),
  size: Joi.valid('small', 'medium', 'large').required(),
  breedId: Joi.number().integer().positive().required()
})

const postBody = { userId: Joi.number().integer().positive().required() }

const fileSchema = Joi.object({
  mimetype: Joi.string().valid('image/jpeg', 'image/png').required(),
  size: Joi.number().max(3 * 1024 * 1024).required()
}).unknown(true)

class PetsController extends Validator {
  constructor() {
    super(schema)
  }

  getPets = asyncError(async (req, res, next) => {
    const pets = await Pet.findAll({
      include: [
        { model: Breed, as: 'breed' },
        { model: User, as: 'owner', attributes: { exclude: ['password'] } },
        { model: Image, as: 'image', attributes: ['link'] }
      ]
    })

    sucRes(res, 200, 'Get all Pets table data successfully.', pets)
  })

  getPet = asyncError(async (req, res, next) => {
    const { petId } = req.params
    const pet = await Pet.findByPk(petId, {
      include: [
        { model: Breed, as: 'breed' },
        { model: User, as: 'owner', attributes: { exclude: ['password'] } },
        { model: Image, as: 'image', attributes: ['link'] }
      ]
    })
    this.validateData([pet])

    sucRes(res, 200, `Get Pets table data from id ${petId} successfully.`, pet)
  })

  postPet = asyncError(async (req, res, next) => {
    this.validateBody(req.body, postBody)
    const { name, age, size, breedId, userId } = req.body
    const { file } = req
    this.validateImage(fileSchema, file)

    const [breed, user, image, transaction] = await Promise.all([
      Breed.findByPk(breedId),
      User.findByPk(userId),
      uploadImage(file, storageType),
      sequelize.transaction()
    ])
    this.validateData([breed, user])

    const link = image?.link
    const deleteData = image?.deleteData

    try {
      const pet = await Pet.create({ name, age, size, breedId, userId }, { transaction })
      if (image) {
        await Image.create({ link, deleteData, entityId: pet.id, entityType: 'pet' }, { transaction })
        await pet.reload({ include: [{ model: Image, as: 'image', attributes: ['link'] }] })
      }
      await transaction.commit();
      sucRes(res, 201, `Created new Pets table data successfully.`, pet)
    } catch (err) {
      await transaction.rollback()
      if (deleteData) {
        await deleteImage(deleteData, storageType)
      }
      next(err)
    }
  })

  putPet = asyncError(async (req, res, next) => {
    this.validateBody(req.body)
    const { name, age, size, breedId } = req.body
    const { file } = req
    const { petId } = req.params

    const [pet, breed, image] = await Promise.all([
      Pet.findByPk(petId),
      Breed.findByPk(breedId),
      uploadImage(file, storageType)
    ])
    this.validateData([pet, breed])

    await Pet.update({ name, age, size, image, breedId }, { where: { id: petId } })

    sucRes(res, 200, `Updated table data with id ${petId} successfully.`)
  })

  deletePet = asyncError(async (req, res, next) => {
    const { petId } = req.params
    const pet = await Pet.findByPk(petId)
    this.validateData([pet])

    await Pet.destroy({ where: { id: petId } })

    sucRes(res, 200, `Deleted table data with id ${petId} successfully.`)
  })
}

module.exports = new PetsController()
