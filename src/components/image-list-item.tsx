import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const ImageListItem = (props) => {
    return (
        <li className="image-list-item">
            <GatsbyImage className="image" image={getImage(props.photo)} alt="image" />
        </li>
    )
  }

export default ImageListItem;
