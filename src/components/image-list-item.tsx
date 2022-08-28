import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from 'gatsby';

const ImageListItem = (props) => {
    return (
        <li className="image-list-item">
            <Link href={ props.photo.images.fallback.src } target="_blank">
                <GatsbyImage className="image" image={getImage(props.photo)} alt="image" />
            </Link>
        </li>
    )
  }

export default ImageListItem;
