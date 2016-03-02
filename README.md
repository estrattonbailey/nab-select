# Nab Select

### Getting Started 
Nab provides a simple interface to select elements and traverse the DOM. It's essentially a wrapper for `document.querySelectorAll()`, that returns an object with prototype methods attached, similar to how jQuery works. 2.2kb, unminified or gzip-ed.

It borrows the `document.documentElement.matches` utility from [Sektor](https://github.com/bevacqua/sektor).

The basic API looks like this:

```javascript
var $ = require('nab-select');

$('.js-button').closest('.js-wrapper').find('.js-slideshow .js-slide').siblings('.js-slide.slide--large');
```

### Building the Script 
```bash
npm i

# Compile
npm start
```

### Update NPM Registry
```bash
# semver patch
npm version patch -m "<message>"

# minor version
npm version minor -m "<message>"

# to publish, run
npm publish
```
