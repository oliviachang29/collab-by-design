const rssPlugin = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Import filters
const dateFilter = require("./site/filters/date-filter.js");
const markdownFilter = require("./site/filters/markdown-filter.js");
const w3DateFilter = require("./site/filters/w3-date-filter.js");

// Import transforms
const htmlMinTransform = require("./site/transforms/html-min-transform.js");
const parseTransform = require("./site/transforms/parse-transform.js");
const criticalCSSTransform = require("./site/transforms/critical-css-transform.js");

// Import data files
const site = require("./site/_data/site.js");

module.exports = function (config) {
  // Filters
  config.addFilter("dateFilter", dateFilter);
  config.addFilter("markdownFilter", markdownFilter);
  config.addFilter("w3DateFilter", w3DateFilter);

  // Transforms
  config.addTransform("parse", parseTransform);
  if (site.criticalCSS) {
    config.addTransform("critical-css", criticalCSSTransform);
  } else {
    // Critical will also minify
    config.addTransform("htmlmin", htmlMinTransform);
  }

  // Custom collections
  const now = new Date();
  const livePosts = (post) => post.date <= now && !post.data.draft;

  const colors = [
    "#FF89BC",
    "#FFB469",
    "#CBF0E8",
    "#F86C5F",
    "#01E7CB",
    "#FFD672",
    "#FFDEB5",
  ];

  config.addCollection("posts", (collection) => {
    return collection
      .getFilteredByGlob("./site/posts/*.md")
      .filter(livePosts)
      .reverse()
      .map((post, i) => {
        post.data.color = colors[i > colors.length - 1 ? i % colors.length : i];
        return post;
      });
  });

  config.addCollection("externalPosts", (collection) => {
    return collection
      .getFilteredByGlob("./site/external-posts/*.md")
      .reverse()
      .map((post, i) => {
        post.data.color = colors[i > colors.length - 1 ? i % colors.length : i];
        return post;
      });
  });

  config.addCollection("publications", (collection) => {
    return collection
      .getFilteredByGlob("./site/publications/*.md")
      .reverse()
      .map((item, i) => {
        item.data.color = colors[i > colors.length - 1 ? i % colors.length : i];
        return item;
      });
  });

  config.addCollection("presentations", (collection) => {
    return collection
      .getFilteredByGlob("./site/presentations/*.md")
      .reverse()
      .map((item, i) => {
        item.data.color = colors[i > colors.length - 1 ? i % colors.length : i];
        return item;
      });
  });

  // Passthrough
  config.addPassthroughCopy({ "site/static": "/" });

  // Plugins
  config.addPlugin(rssPlugin);
  config.addPlugin(syntaxHighlight);

  // Watch for changes to my source files
  if (config.addWatchTarget) {
    config.addWatchTarget("site/src/scss");
    config.addWatchTarget("site/src/js");
  } else {
    console.log(
      "A future version of 11ty will allow live-reloading of JS and Sass. You can update 11ty with the next release to get these features."
    );
  }

  return {
    dir: {
      input: "site",
      output: "dist",
    },
    passthroughFileCopy: true,
  };
};
