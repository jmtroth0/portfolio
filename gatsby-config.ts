require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})
import type { GatsbyConfig } from "gatsby";


const config: GatsbyConfig = {
    siteMetadata: {
        title: `portfolio`,
        siteUrl: `https://portfolio.jordanroth.xyz`
    },
    graphqlTypegen: true,

    plugins: [
        "gatsby-plugin-sass",
        {
            resolve: 'gatsby-plugin-google-gtag',
            options: {
                trackingIds: ["G-EBH8QKNBXT"],
                gtagConfig: {
                    optimize_id: "OPT_CONTAINER_ID",
                    anonymize_ip: true,
                    cookie_expires: 0,
                },
            }
        },
        {
            resolve: '@marceasen/gatsby-source-s3-image',
            options: {
                accessKeyId: process.env.S3_API_KEY_ID,
                secretAccessKey: process.env.S3_API_KEY,
                bucketName: 'jmtr-portfolio-photos',
                region: 'us-west-2',
                // The plugin ignores `region` and defaults to the global endpoint, which
                // answers PermanentRedirect for buckets outside us-east-1.
                domain: 's3.us-west-2.amazonaws.com',
            },
        },
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: `gatsby-plugin-s3`,
            options: {
                bucketName: "jmtr-portfolio-page",
            },
        },
    ]
};

export default config;
