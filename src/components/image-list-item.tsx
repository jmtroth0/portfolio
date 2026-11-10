import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image";
import type { IGatsbyImageData } from "gatsby-plugin-image";

export interface Photo {
    image: IGatsbyImageData;
    alt: string;
}

interface ImageListItemProps {
    photo: Photo;
}

const ImageListItem = ({ photo }: ImageListItemProps) => {
    return (
        <li className="image-list-item">
            <a href={photo.image.images.fallback?.src} target="_blank" rel="noopener noreferrer">
                <GatsbyImage className="image" image={photo.image} alt={photo.alt} />
            </a>
        </li>
    )
}

export default ImageListItem;
