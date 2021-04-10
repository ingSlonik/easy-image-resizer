import sharp from "sharp";

import { defaultOptions, getSize, ResizeImageOptions } from "./image"

export type { ResizeImageOptions } from "./image";

export async function resizeImage(fileOrUrl: Buffer | string, options: ResizeImageOptions): Promise<Buffer> {
    const opt = { ...defaultOptions, ...options };

    let image = sharp(fileOrUrl);
    const metadata = await image.metadata();

    // for jpeg and png is not possible not receive width and height
    const width = metadata.width || 32;
    const height = metadata.height || 32;

    const size = getSize({ width, height }, options);

    // sharp make all smooth resizes
    image = image.resize(size);

    switch (opt.type) {
        case "png":
            image = image.png({ quality: opt.quality });
            break;
        case "jpeg":
            image = image.jpeg({ quality: opt.quality });
            break;
    }

    return await image.toBuffer();
}
