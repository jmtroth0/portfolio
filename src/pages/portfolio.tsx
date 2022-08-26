import * as React from "react"
import { graphql } from "gatsby"
import ImageList from "../components/image-list"


const PortfolioPage = (request) => {
    return (
        <main>
        <title>Portfolio</title>
        <ImageList photos={request.data.allS3ImageAsset.edges.map((edge) => {return edge.node.childImageSharp?.gatsbyImageData})}></ImageList>
        </main>
    )
}

export default PortfolioPage;

export const pageQuery = graphql`
    query PhotographyPostsQuery {
        allS3ImageAsset(filter: {childImageSharp: {id: {ne: null}}}) {
            edges {
                node {
                    EXIF {
                        DateCreatedISO
                        ExposureTime
                        FNumber
                        ShutterSpeedValue
                    }
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
        }
    }
`
