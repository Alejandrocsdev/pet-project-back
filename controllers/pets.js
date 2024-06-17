// Sequelize跟Models
const { sequelize, Pet, Breed, User, Image } = require('../models')
// 異步錯誤處理中間件
const { asyncError } = require('../middlewares')
// 成功回應
const { sucRes } = require('../utils/customResponse')
// 上傳/刪除照片
const { uploadImage, deleteImage } = require('../storage')
// 照片存儲類型(local/imgur/cloudinary)
const storageType = process.env.STORAGE_TYPE || 'local'
// 驗證
const Validator = require('../Validator')
// 驗證模組
const Joi = require('joi')
// Body驗證條件(base)
const schema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().positive().required(),
  size: Joi.valid('small', 'medium', 'large').required(),
  breedId: Joi.number().integer().positive().required()
})
// Body驗證條件(extra)
const postBody = { userId: Joi.number().integer().positive().required() }
// File驗證條件(base)
const fileSchema = Joi.object({
  mimetype: Joi.string().valid('image/jpeg', 'image/png').required(),
  size: Joi.number().max(3 * 1024 * 1024).required()
}).unknown(true)

class PetsController extends Validator {
  constructor() {
    super(schema)
  }

  getPets = asyncError(async (req, res, next) => {
    // 讀取全部資料
    const pets = await Pet.findAll({
      include: [
        { model: Breed, as: 'breed', attributes: ['name'] },
        { model: Image, as: 'image', attributes: ['link'] },
        { model: User, as: 'owner', attributes: ['username'] }
      ]
    })

    sucRes(res, 200, 'Get all Pets table data successfully.', pets)
  })

  getPet = asyncError(async (req, res, next) => {
    // 請求參數(checkId中間件已驗證過)
    const { petId } = req.params
    // 讀取單一資料
    const pet = await Pet.findByPk(petId, {
      include: [
        { model: Breed, as: 'breed', attributes: ['name'] },
        { model: Image, as: 'image', attributes: ['link'] },
        { model: User, as: 'owner', attributes: ['username'] }
      ]
    })
    // 驗證資料是否存在
    this.validateData([pet])

    sucRes(res, 200, `Get Pets table data from id ${petId} successfully.`, pet)
  })

  postPet = asyncError(async (req, res, next) => {
    // 驗證請求主體
    this.validateBody(req.body, postBody)
    const { name, age, size, breedId, userId } = req.body
    // 驗證上傳照片(optional)
    this.validateImage(req.file, fileSchema)
    const { file } = req

    // 讀取單一資料
    const [breed, user] = await Promise.all([
      Breed.findByPk(breedId), 
      User.findByPk(userId)])
    // 驗證資料是否存在
    this.validateData([breed, user])

    // 上傳照片(optional)
    const petImage = await uploadImage(file, storageType)
    const link = petImage?.link
    const deleteData = petImage?.deleteData

    // 建立事務
    const transaction = await sequelize.transaction()

    try {
      // 建立Pet資訊
      const createPet = await Pet.create({ name, age, size, breedId, userId }, { transaction })

      // 如有上傳照片: 建立Image資訊
      if (petImage) {
        await Image.create({ link, deleteData, entityId: createPet.id, entityType: 'pet' },{ transaction })
      }

      // 提交事務
      await transaction.commit()

      // 如有上傳照片: 更新Pet資訊(包含image)
      if (petImage) {
        await createPet.reload({ include: [{ model: Image, as: 'image', attributes: ['link'] }] })
      }

      sucRes(res, 201, `Created new Pets table data successfully.`, createPet)
    } catch (err) {
      // 回滾事務
      await transaction.rollback()
      // 回滾imgur照片新增
      if (deleteData) {
        await deleteImage(deleteData, storageType)
      }
      next(err)
    }
  })

  putPet = asyncError(async (req, res, next) => {
    // 驗證請求主體
    this.validateBody(req.body)
    const { name, age, size, breedId } = req.body
    // 驗證上傳照片(optional)
    this.validateImage(req.file, fileSchema)
    const { file } = req
    // 請求參數(checkId中間件已驗證過)
    const { petId } = req.params

    // 讀取單一資料
    const [pet, breed, image] = await Promise.all([
      Pet.findByPk(petId),
      Breed.findByPk(breedId),
      Image.findOne({ where: { entityId: petId } })
    ])
    // 驗證資料是否存在(image資料可能為null)
    this.validateData([pet, breed])

    // 上傳照片(optional)
    const petImage = await uploadImage(file, storageType)
    const link = petImage?.link
    const deleteData = petImage?.deleteData

    // 建立事務
    const transaction = await sequelize.transaction()

    try {
      // 更新Pet資訊
      await Pet.update({ name, age, size, breedId }, { where: { id: petId }, tansaction })

      // 新增Image資訊
      if (!image?.link && petImage?.link) {
        await Image.create({ link, deleteData, entityId: petId, entityType: 'pet' },{ transaction })
      } 
      // 更新Image資訊
      else if (image?.link && petImage?.link) {
        await Image.update({ link, deleteData }, { where: { entityId: petId }, transaction })
      }

      // 提交事務
      await transaction.commit()

      // 如更新Image資訊: 刪除imgur原始照片
      if (image?.link && petImage?.link) {
        await deleteImage(image.deleteData, storageType)
      }
        
      sucRes(res, 200, `Updated table data with id ${petId} successfully.`)
    } catch (err) {
      // 回滾事務
      await transaction.rollback()
      // 回滾imgur照片新增
      if (deleteData) {
        await deleteImage(deleteData, storageType)
      }
      next(err)
    }
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
