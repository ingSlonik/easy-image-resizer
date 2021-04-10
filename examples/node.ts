import { writeFileSync } from "fs";
import { resolve } from "path";

// in your project import { resizeImage } from "easy-image-resizer";
import { resizeImage } from "../src/node";

async function nodeExample() {
    const filePath = resolve(__dirname, "1920x1080.jpg");

    const image = await resizeImage(filePath, { maxWidth: 32, maxHeight: 32, type: "png" });

    writeFileSync(resolve(__dirname, "small.png"), image);
}

nodeExample();
