import { defaultOptions, getSize, ResizeImageOptions } from "./image"

export type { ResizeImageOptions } from "./image";

export async function resizeImage(fileOrUrl: File | string, options: ResizeImageOptions): Promise<string> {
    const opt = { ...defaultOptions, ...options };

    let url = fileOrUrl instanceof File ? await getBase64FromFile(fileOrUrl) : fileOrUrl;
    let image = await getImage(url);

    const parent = document.body;
    const canvas = document.createElement("canvas");
    parent.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Your browser doesn't support 2D canvas context.");

    const size = getSize(image, options);

    canvas.width = size.width;
    canvas.height = size.height;

    if (opt.smooth === true) {
        while (size.width < Math.ceil(image.width / 2) || size.height < Math.ceil(image.height / 2)) {
            const halfWidth = Math.ceil(image.width / 2);
            if (size.width < halfWidth) {
                url = await resizeImage(url, { width: halfWidth });
            } else {
                url = await resizeImage(url, { height: Math.ceil(image.height / 2) });
            }
            image = await getImage(url);
        }
    }

    ctx.drawImage(image, 0, 0, size.width, size.height);

    parent.removeChild(canvas);

    return canvas.toDataURL(`image/${opt.type}`, opt.quality);
}

export async function getBase64FromFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = error => reject(error);
    });
}

async function getImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = () => resolve(image);
        image.onerror = (e) => reject(e);
        image.src = url;
    });
}
