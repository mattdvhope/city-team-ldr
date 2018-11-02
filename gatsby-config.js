module.exports = {
  siteMetadata: {
    title: 'City English Project',
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `9yuxh4lib1s8`,
        accessToken: `6c53fde463ad5d48aab03eee27122a9110e69440b68ae704dd808d1286d8395f`
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/favicon.ico",
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    },
    `gatsby-transformer-remark`, // will detect any text node that has markdown and then parse it (into HTML??)
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/img`,
        name: `images`,
      },
    },
    `gatsby-plugin-less`,
    `gatsby-plugin-netlify`, // make sure to keep it last in the array
  ],
}
