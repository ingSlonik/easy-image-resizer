#!/usr/bin/env node
import { extname } from "path";
import { writeFileSync } from "fs";
import yargs from "yargs";

import { resizeImage, ResizeImageOptions } from "./node";

const optionsPromise = yargs
    .scriptName("resize-image")
    .usage("Usage: $0 --input image.jpeg --out small.jpeg --width 600")
    .option("input", { alias: "i", describe: "Path to input image", type: "string" })
    .option("output", { alias: "o", describe: "Path to output image", type: "string" })
    .option("width", { alias: "w", describe: "Width [px]", type: "number" })
    .option("height", { alias: "h", describe: "Height [px]", type: "number" })
    .option("max-width", { alias: "mw", describe: "Max width [px]", type: "number" })
    .option("max-height", { alias: "mh", describe: "Max height [px]", type: "number" })
    .option("quality", { alias: "q", describe: "Quality from 1 to 100", type: "number" })
    .option("smooth", { alias: "s", describe: "Smoother resize processing", type: "boolean", default: true })
    .demandOption(["input", "output"], "Input and output path have to be set")
    .help()
    .argv;

async function main() {
    const options = await optionsPromise;

    const input = options.input;
    const output = options.output;

    const ext = extname(input);

    let type: "png" | "jpeg" = "png";
    switch (ext) {
        case ".png":
            type = "png";
            break;
        case ".jpg":
        case ".jpeg":
            type = "jpeg";
            break;
        default:
            console.log("Unknown output file type. There are allowed only 'jpg', 'jpeg' and 'png'.");
            process.exit(1);
    }


    const resizeImageOptions: ResizeImageOptions = {
        width: options["width"],
        height: options["height"],
        maxWidth: options["max-width"],
        maxHeight: options["max-height"],
        quality: options["quality"],
        smooth: options["smooth"],
        type,
    };

    console.log(`Input image: "${input}"`);
    console.log(`Output format: "${type}"`);
    console.log("Resizing...");

    resizeImage(input, resizeImageOptions).then(outputImage => {
        writeFileSync(output, outputImage);
        console.log(`\nDone, resized image is in "${output}" :)`);
    });
}

main();
