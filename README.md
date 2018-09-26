# exif-orientation-fixer

## What is this?

- A JavaScript code to fix image orientation based on Exif data.

## Dependency

- [Exif.js](https://github.com/exif-js/exif-js)

## Example

### Basic Example

- https://syumai.github.io/exif-orientation-fixer/examples/basic.html

#### Image source of basic example

- [exif-orientation-examples](https://github.com/recurser/exif-orientation-examples)

### File picker

- https://syumai.github.io/exif-orientation-fixer/examples/file-picker.html

## Usage

```html
<script src="https://unpkg.com/exif-js@2.3.0/exif.js"></script>
<script type="module">
  import { fixImageOrientation } from 'exif-orientation-fixer.js';

  const imagePath = 'https://raw.githubusercontent.com/recurser/exif-orientation-examples/master/Landscape_1.jpg';

  (async () => {
    const blob = await fixImageOrientation(imagePath);
    const url = URL.createObjectURL(blob);
    const img = document.createElement("img");
    img.src = url;
    document.body.appendChild(img);
  })();
</script>
```

## LICENSE

MIT

## Author

syumai
