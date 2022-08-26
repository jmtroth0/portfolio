import * as React from "react";
import ImageListItem from "./image-list-item";
import '../scss/image-list.scss';

const ImageList = (props) => {
        return (
            <ul className="image-list">
                {props.photos.map((photo) => { return <ImageListItem photo={photo} key={photo.images.fallback.src}/> })}
            </ul>
        )
    }

  export default ImageList;
