/* eslint-env mocha */
import fs from 'fs'
import { assert } from 'chai'
import WAE from '../src'

const fileReader = (fileName) => fs.readFileSync(fileName, { encoding: 'utf-8' })
const expectedResult = JSON.parse(fileReader('test/resources/expectedResult.json'))
const testPage = fileReader('test/resources/testPage.html')
const { microdata, rdfa, metaTags, jsonld } = WAE.parse(testPage)

describe('Web Auto Extractor for NORMALIZED output', function () {
  it('should find all elements with microdata', function () {
    assert.deepEqual(microdata.data, expectedResult.microdata.data)
  })

  it('should find all elements with rdfa', function () {
    assert.deepEqual(rdfa.data, expectedResult.rdfa.data)
  })

  it('should find embedded json-ld', function () {
    assert.deepEqual(jsonld.data, expectedResult.jsonld.data)
  })

  it('should find embedded meta tags', function () {
    assert.deepEqual(metaTags.data, expectedResult.metaTags.data)
  })
})

describe('Web Auto Extractor for NON-NORMALIZED output', function () {
  it('should find all elements with microdata', function () {
    assert.deepEqual(microdata.unnormalizedData, expectedResult.microdata.unnormalizedData)
  })

  it('should find all elements with rdfa', function () {
    assert.deepEqual(rdfa.unnormalizedData, expectedResult.rdfa.unnormalizedData)
  })

  it('should find all elements with meta tags', function () {
    assert.deepEqual(metaTags.unnormalizedData, expectedResult.metaTags.unnormalizedData)
  })
})
