module.exports = {
  name: "Knowledgy Lab",
  shortDesc: "Leveraging family & community engagement learning",
  url: "https://knowledgylab.com",
  authorEmail: "hello@knowledgylab.com",
  authorName: "Susana Beltran",
  postsPerPage: 6,
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
  newsletter_title: "Subscribe to my newsletter",
  newsletter_subtitle:
    "Enter your email address to subscribe to this blog and receive notifications of new posts by email.",
  // Critical CSS results in much slower build times and uses a lot of system resources
  // turn on in production :)
  // See `site/transforms/critical-css-transform.js` for more details
  criticalCSS: false,
};
