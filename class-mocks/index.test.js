const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')
;
(async () => {
  {
    const filePath = './mocks/empty.invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }

  {
    const filePath = './mocks/four-items.invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }

  {
    const filePath = './mocks/three-items.valid.csv'
    const result = await File.csvToJson(filePath)
    const expected = [
      { "id": 1, "name": "Fabio", "profession": "Developer", "age": 42 },
      { "id": 2, "name": "Janaina", "profession": "Hair Stylist", "age": 41 },
      { "id": 3, "name": "John John", "profession": "Developer", "age": 16 }
    ]

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
})()