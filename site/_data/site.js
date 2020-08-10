module.exports = {
  name: "Knowledgy Lab",
  shortDesc:"Leveraging family & community engagement learning",
  url: "",
  authorEmail: "hello@knowledgylab.com",
  authorName: "Susan Beltran",
  postsPerPage: 4,
  numPostsHomePage: 4,
  numExternalPostsHomePage: 2,
  socialImage: "/img/social.jpg",
  theme: {
    primary: {
      background: "white",
      text: "black",
      highlight: "#666",
    },
    secondary: {
      background: "black",
      text: "white",
      highlight: "#666",
    },
  },

  keystone: {
    comments: false,
    bookmarks: false,
    claps: false,
    login: false,
  },
  // Critical CSS results in much slower build times and uses a lot of system resources
  // turn on in production :)
  // See `site/transforms/critical-css-transform.js` for more details
  criticalCSS: false,
};
