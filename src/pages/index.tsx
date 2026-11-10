import * as React from "react"
import { graphql } from "gatsby"
import type { HeadFC, PageProps } from "gatsby"
import type { IGatsbyImageData } from "gatsby-plugin-image"
import ImageList from "../components/image-list"
import type { Photo } from "../components/image-list-item"

const SITE_URL = "https://portfolio.jordanroth.xyz"
const SITE_TITLE = "Jordan Roth | Photography Portfolio"
const SITE_DESCRIPTION = "A photography portfolio by Jordan Roth."

// "2022-trip/IMG_1234.jpg" -> "IMG 1234"
const altFromKey = (key: string): string => {
    const name = key.split("/").pop()?.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim()
    return name ? name : "Portfolio photo"
}

// Shape of the page query below. Written by hand because Gatsby only generates
// query types (src/gatsby-types.d.ts, gitignored) during `gatsby develop`.
interface PhotographyPostsData {
    allS3ImageAsset: {
        edges: ReadonlyArray<{
            node: {
                Key: string
                childImageSharp: { gatsbyImageData: IGatsbyImageData } | null
            }
        }>
    }
}

const PortfolioPage = ({ data }: PageProps<PhotographyPostsData>) => {
    const photos: Photo[] = []
    for (const { node } of data.allS3ImageAsset.edges) {
        const image = node.childImageSharp?.gatsbyImageData
        if (image) {
            photos.push({ image, alt: altFromKey(node.Key) })
        }
    }

    return (
        <main>
            <ImageList photos={photos} />
        </main>
    )
}

export default PortfolioPage;

export const Head: HeadFC = () => (
    <>
        <html lang="en" />
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
    </>
)

export const pageQuery = graphql`
    query PhotographyPostsQuery {
        allS3ImageAsset(
            filter: {childImageSharp: {id: {ne: null}}}
            sort: {fields: [EXIF___DateCreatedISO], order: DESC}
        ) {
            edges {
                node {
                    Key
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
