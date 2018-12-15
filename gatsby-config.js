module.exports = {
  pathPrefix: `/`,
  siteMetadata: {
    title: `Shaderism`,
    author: `Arttu Koskela`
  },
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `Shaderism`,
        description:
          "Shaderism is a design studio specialized in WebGL. We create interactive websites, VR experiences and more!",
        short_name: "Shaderism Blog",
        background_color: "white",
        theme_color: "#465d57",
        orientation: "portrait",
        display: "minimal-ui"
      }
    },
    "gatsby-plugin-catch-links",
    "gatsby-plugin-emotion",
    "gatsby-plugin-remove-trailing-slashes",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          "gatsby-remark-copy-linked-files",
          {
            resolve: "gatsby-remark-images",
            options: {
              linkImagesToOriginal: false
            }
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-smartypants",
          "gatsby-remark-autolink-headers",
          `gatsby-remark-responsive-iframe`
        ]
      }
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-layout",
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        omitGoogleFont: true,
        pathToConfigModule: "src/utils/typography"
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-90417615-2"
      }
    }
  ]
};
