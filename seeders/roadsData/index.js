// 出處: 政府資料開放平臺 (https://data.gov.tw/dataset/35321)
// 年份: 民國112年
// 檔名: opendata112road.csv
// 備註: 不含連江縣, 路名不含[段]

const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, 'opendata112road.csv')

const data = fs.readFileSync(filePath, 'utf8')
const lines = data.split(/\r?\n/)

// -----------------------------------------------------------------------------------------
// 全國路名資料(縣市/行政區域/路名)
const addresses = lines.map((line) => line.split(','))
// console.log(addresses)
// -----------------------------------------------------------------------------------------
// 縣市(唯一)
const cities = addresses
  .map((address) => address[0])
  // 縣市名全為三個字,部分縣市名含空字串,故排除非三個字縣市名
  .filter((city, index, self) => city.length === 3 && self.indexOf(city) === index)
// console.log(cities)

// 縣市(格式化)
const processedCities = cities.map((city) => ({ name: city }))
// console.log(processedCities)
// -----------------------------------------------------------------------------------------
// 行政區域(唯一)
const districts = addresses
  .map((address) => address[1])
  .filter((district, index, self) => self.indexOf(district) === index)
// console.log(districts)

// 縣市編碼(供行政區域格式化使用)
const cityMap = cities.reduce((map, city, index) => {
  map[city] = index + 1
  return map
}, {})
// console.log(cityMap)

// 行政區域(格式化)
const processedDistricts = districts.map((district) => {
  const cityName = cities.find((city) => district.startsWith(city))
  const districtName = district.replace(cityName, '')
  return {
    name: districtName,
    city_id: cityMap[cityName]
  }
})
// console.log(processedDistricts)
// -----------------------------------------------------------------------------------------
// 路名(全部)
const fullRoads = addresses.map((address) => address[2])
// console.log(roads)

// 行政區域(全部)
const fullDistricts = addresses.map((address) => address[1])
// console.log(fullDistricts)

// 行政區域編碼(供路名格式化使用)
const districtMap = districts.reduce((map, district, index) => {
  map[district] = index + 1
  return map
}, {})
// console.log(districtMap)

// 路名(格式化)
const processedRoads = fullRoads.map((roadName, index) => ({
  name: roadName,
  district_id: districtMap[fullDistricts[index]]
}))
// console.log(processedRoads)
// -----------------------------------------------------------------------------------------

module.exports = { processedCities, processedDistricts, processedRoads }
