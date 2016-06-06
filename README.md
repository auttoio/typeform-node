# Unofficial Typeform Node API

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
