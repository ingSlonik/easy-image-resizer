# Easy image resizer

Easy way how to resize image in one line in `browser`, `node` and `CLI`.

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
    /** only with type "jpeg" and from 0 to 100 */
    quality?: number,
};
```

## Browser

Based on `<canvas>` element, without dependencies and light (`~1.8KB` zipped size).

```js
import { resizeImage } from "easy-image-resizer";

const url = await resizeImage(originalUrl, { width: 100, maxHeight: 250 });
// or
<input type="file" onChange={e => {
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

### Without installation

Only one dependence is `node`.

```
$ npx easy-image-resizer bigImage.png --out smallImage.png --max-width 32
```

### With installation

```
$ npm install -g easy-image-resizer
```

then you can write just

```
$ resize-image bigImage.png --out icon.png --width 32 --height 32
```
