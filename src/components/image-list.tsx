import * as React from "react";
import ImageListItem from "./image-list-item";
import type { Photo } from "./image-list-item";
import '../scss/image-list.scss';

interface ImageListProps {
    photos: Photo[];
}

const ImageList = ({ photos }: ImageListProps) => {
    return (
        <ul className="image-list">
            {photos.map((photo) => <ImageListItem photo={photo} key={photo.image.images.fallback?.src} />)}
        </ul>
    )
}

export default ImageList;
