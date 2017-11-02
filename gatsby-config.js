module.exports = {
  pathPrefix: `/`,
  siteMetadata: {
    title: `Shaderism`,
    author: `Arttu Koskela`,
  },
  plugins: [
    'gatsby-plugin-react-next',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: false
            }
          },
          'gatsby-remark-prismjs',
          `gatsby-remark-responsive-iframe`,
        ]
      }
    },
    'gatsby-plugin-react-helmet',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-90417615-2'
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: `Shaderism`,
        description: 'The blog of the developer, Arttu Koskela',
        short_name: 'Shaderism Blog',
        background_color: 'white',
        theme_color: '#002635',
        orientation: 'portrait',
        display: 'minimal-ui'
      }
    }
  ],
}
