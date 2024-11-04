export type SizeDefinition = {
    width?: number,
    height?: number,
    maxWidth?: number,
    maxHeight?: number,
};

export type ResizeImageOptions = SizeDefinition & {
    smooth?: boolean,
    type?: "jpeg" | "png" | "webp",
    /** from 1 to 100 */
    quality?: number,
};

export type Size = {
    width: number,
    height: number,
};

export const defaultOptions = {
    smooth: true,
    type: "png",
};

export function getSize(imageSize: Size, { width, height, maxWidth, maxHeight }: SizeDefinition): Size {
    if (width && height) {
        return { width, height };
    }

    const ratio = imageSize.width / imageSize.height;

    if (height) {
        const newWidth = Math.round(ratio * height);
        if (maxWidth && newWidth > maxWidth) {
            return getSize(imageSize, { width: maxWidth });
        } else {
            return { width: newWidth, height };
        }
    }
    if (width) {
        const newHeight = Math.round(width / ratio);
        if (maxHeight && newHeight > maxHeight) {
            return getSize(imageSize, { height: maxHeight });
        } else {
            return { width, height: newHeight };
        }
    }

    if (maxHeight && imageSize.height > maxHeight) {
        return getSize(imageSize, { height: maxHeight, maxWidth });
    }
    if (maxWidth && imageSize.width > maxWidth) {
        return getSize(imageSize, { width: maxWidth, maxHeight });
    }

    return imageSize;
}
