# Unofficial Typeform Node API [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Known Vulnerabilities][snyk-image]][snyk-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Code Climate][codeclimate-image]][codeclimate-url] [![Code Coverage][codecoverage-image]][codecoverage-url]

This is a client for Node.js to consume the [typeform.io](http://typeform.io) API. Community-supported, not endorsed by Typeform; documentation available at [docs.typeform.io](http://docs.typeform.io/). If this is all new to you, _grab your API key_ from the TypeformI/O website linked above, and be sure to visit [typeform.com](https://typeform.com).

## Getting Started

### Installing
```bash
> npm install typeform --save
```

### Dependency
#### ES6 Modules
```javascript
import typeform from 'typeform'
const api = typeform('<your_api_token>')
```

#### ES5 / CommonJS
```javascript
const typeform = require('typeform')('<your_api_token>')
```

## Usage

### Bootstrapping
The API client must be bootstrapped with an API token and optionally provided a version, defaults to `latest`.
```javascript
require('typeform')('<your_api_token>'[, 'latest'])
```

### Promises
All methods return a promise in the following pattern:
```javascript
typeform['<method_name>'].then(
  data => console.dir(data),
  err => console.dir(err)
)
```

### API Reference

#### `typeform.base()`
<http://docs.typeform.io/docs/base>

#### `typeform.createForm(<form_data>)`
<http://docs.typeform.io/docs/forms>

#### `typeform.getForm(<form_id>)`
<http://docs.typeform.io/docs/forms-1>

#### `typeform.createImage(<image_data>)`
<http://docs.typeform.io/docs/images>

#### `typeform.getImage(<image_id>)`
<http://docs.typeform.io/docs/imagesimage_id>

#### `typeform.createDesign(<design_data>)`
<http://docs.typeform.io/docs/designs>

#### `typeform.getDesign(<design_id>)`
<http://docs.typeform.io/docs/designsdesign_id>

#### `typeform.createURL(<url_data>)`
<http://docs.typeform.io/docs/urls>

#### `typeform.getURL(<url_id>)`
<http://docs.typeform.io/docs/urlsurl_id>

#### `typeform.updateURL(<url_id>, <url_data>)`
<http://docs.typeform.io/docs/urlsurl_id-1>

#### `typeform.deleteURL(<url_id>)`
<http://docs.typeform.io/docs/urlsurl_id-2>

## License

The MIT License (MIT)

Copyright (c) 2016 Autto &lt;developers@autto.io&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[npm-image]: https://badge.fury.io/js/typeform.svg
[npm-url]: https://npmjs.org/package/typeform
[travis-image]: https://travis-ci.org/auttoio/typeform-node.svg?branch=master
[travis-url]: https://travis-ci.org/auttoio/typeform-node
[snyk-image]: https://snyk.io/test/github/auttoio/typeform-node/badge.svg
[snyk-url]: https://snyk.io/test/github/auttoio/typeform-node
[daviddm-image]: https://david-dm.org/auttoio/typeform-node.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/auttoio/typeform-node
[codeclimate-image]: https://codeclimate.com/github/auttoio/typeform-node/badges/gpa.svg
[codeclimate-url]: https://codeclimate.com/github/auttoio/typeform-node
[codecoverage-image]: https://codeclimate.com/github/auttoio/typeform-node/badges/coverage.svg
[codecoverage-url]: https://codeclimate.com/github/auttoio/typeform-node/coverage
