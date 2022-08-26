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
                    id
                    EXIF {
                        DateCreatedISO
                        ExposureTime
                        FNumber
                        ShutterSpeedValue
                    }
                    childImageSharp {
                        gatsbyImageData
                    }
                    # childrenFile {
                    #   childImageSharp {
                    #     original {
                    #       height
                    #       width
                    #     }
                    #     thumbnailSizes: fluid(maxWidth: 256) {
                    #       aspectRatio
                    #       src
                    #       srcSet
                    #       sizes
                    #     }
                    #     largeSizes: fluid(maxWidth: 1024) {
                    #       aspectRatio
                    #       src
                    #       srcSet
                    #       sizes
                    #     }
                    #   }
                    # }
                }
            }
        }
    }
`
