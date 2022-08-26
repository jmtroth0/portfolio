import type { GatsbyConfig } from "gatsby";


const config: GatsbyConfig = {
    siteMetadata: {
        title: `portfolio`,
        siteUrl: `https://www.yourdomain.tld`
    },
    graphqlTypegen: true,

    plugins: [
        "gatsby-plugin-sass",
        {
            resolve: 'gatsby-plugin-google-analytics',
            options: {"trackingId": "UA-68572259-1"}
        },
        {
            resolve: '@marceasen/gatsby-source-s3-image',
            options: {
                accessKeyId: "",
                secretAccessKey: "",
                bucketName: 'jmtr-portfolio-photos',
                region: 'us-west-2',
            },
        },
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
    ]
};

export default config;
