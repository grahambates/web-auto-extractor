import { getCheerioObject } from './utils'
import $ from 'cheerio'

export default function (html, config = {}) {
  const $html = getCheerioObject(html)
  let jsonldData = {}

  $html('script[type="application/ld+json"]').each((index, item) => {
    try {
      const json = item.children[0].data.trim().replace(/[\r\n]/g, ' ').replace(/;$/, '')
      let parsedJSON = JSON.parse(json)
      if (!Array.isArray(parsedJSON)) {
        parsedJSON = [parsedJSON]
      }
      parsedJSON.forEach(obj => {
        const type = obj['@type']
        jsonldData[type] = jsonldData[type] || []
        jsonldData[type].push(obj)
      })
    } catch (e) {
      console.log(`Error in jsonld parse - ${e}`)
    }
  })

  return jsonldData
}
