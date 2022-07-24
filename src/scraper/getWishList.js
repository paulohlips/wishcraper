const { Builder } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome');

(async function openChromeTest () {
  try {
    const options = new chrome.Options()
    const driver = await new Builder()
      .setChromeOptions(options)
      .forBrowser('chrome')
      .build()
    await driver.get('https://www.google.com')
    await driver.quit()
  } catch (error) {
    console.log(error)
  }
})()
