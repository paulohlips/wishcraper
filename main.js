const { Builder, By } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

const initializeChromeScraper = async () => {
  const options = new chrome.Options().headless()
  return new Builder()
    .setChromeOptions(options)
    .forBrowser('chrome')
    .build()
}

const listFormatter = (items) => {
  const formattedItems = items.filter(Boolean)
  const res = formattedItems.map(item => {
    const [title, authorLine, reviews, priceLine] = item.split('\n')

    const author = authorLine.substring(
      authorLine.indexOf('de ') + 3,
      authorLine.lastIndexOf('(') - 1
    )

    const price = priceLine.substring(
      priceLine.indexOf('R$'),
      priceLine.lastIndexOf(',') + 3
    )

    return {
      title,
      author,
      reviews,
      price
    }
  })
  console.log({
    res
  })
}
const getWishListItems = async (driver) => {
  try {
    const elementClassName = 'a-unordered-list a-nostyle a-vertical a-spacing-none g-items-section ui-sortable'
    const elementTagName = 'li'

    await driver.get('https://www.amazon.com.br/hz/wishlist/ls/1WECMIB95EGL2?ref_=wl_share')
    const wishlistElements = await driver.findElement(By.className(elementClassName), 100000).findElements(By.css(elementTagName))
    const itemElements = await Promise.all(wishlistElements.map(async item => {
      return item.findElements(By.className('a-fixed-right-grid-col g-item-details a-col-left'))
    }))
    const itemsDetails = await Promise.all(itemElements.map(async i => {
      return i.length ? i[0].getText() : null
    }))

    listFormatter(itemsDetails)
  } catch (error) {
    console.log(error)
  }
}

(async function openChromeTest () {
  const driver = await initializeChromeScraper()
  getWishListItems(driver)
})()
