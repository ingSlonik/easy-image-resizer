# Easy image resizer

Easy way to resize image in one line in `browser`, `node` and `CLI`.

## Usage

CSS like definition of sizes.

```js
export type ResizeImageOptions = {
    width?: number,
    height?: number,
    maxWidth?: number,
    maxHeight?: number,

    smooth?: boolean,
    type?: "jpeg" | "png",
    /** from 1 to 100 */
    quality?: number,
};
```

## Browser

Based on `<canvas>` element, without dependencies and light (`~1.8KB` zipped size).

```js
import { resizeImage } from "easy-image-resizer";

const url = await resizeImage(originalUrl, { width: 100, maxHeight: 250 });
// or
<input type="file" onChange={async e => {
    image.url = await resizeImage(e.target.files[0], { maxWidth: 400, maxHeight: 300 });
}}>
```

## Node

Based on [`sharp`](https://github.com/lovell/sharp) package and accept file path or buffer.

```js
import { resizeImage } from "easy-image-resizer";

const image = await resizeImage("bigImage.png", { maxWidth: 32, maxHeight: 32 });
fs.writeFileSync("icon.png", image);
```

## CLI

```
$ resize-image --help

Usage: resize-image --input image.jpeg --out small.jpeg --width 600

Options:
      --version           Show version number                          [boolean]
  -i, --input             Path to input image                [string] [required]
  -o, --output            Path to output image               [string] [required]
  -w, --width             Width [px]                                    [number]
  -h, --height            Height [px]                                   [number]
      --max-width, --mw   Max width [px]                                [number]
      --max-height, --mh  Max height [px]                               [number]
  -q, --quality           Quality from 1 to 100                         [number]
  -s, --smooth            Smoother resize processing   [boolean] [default: true]
      --help              Show help                                    [boolean]
```

### Without installation

Only one dependence is `node`.

```
$ npx easy-image-resizer -i bigImage.png -o smallImage.png --max-width 32
```

### With installation

```
$ npm install -g easy-image-resizer
```

then you can write just

```
$ resize-image -i bigImage.png -o icon.png -h 64
```
