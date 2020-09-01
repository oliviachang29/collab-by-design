const rssPlugin = require("@11ty/eleventy-plugin-rss");
const blogTools = require("eleventy-plugin-blog-tools");

// Import filters
const dateFilter = require("./site/filters/date-filter.js");
const markdownFilter = require("./site/filters/markdown-filter.js");
const w3DateFilter = require("./site/filters/w3-date-filter.js");
const excerptFilter = require("./site/filters/excerpt-filter.js");
const relatedFilter = require("./site/filters/related-filter.js");

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
  config.addFilter("excerptFilter", excerptFilter);
  config.addFilter("relatedFilter", relatedFilter);

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

  const colors = ["#FF89BC", "#FFB469", "#CBF0E8", "#F86C5F", "#01E7CB", "#FFD672", "#FFDEB5"];

  function addPrevNext(collectionArray) {
    const l = collectionArray.length;
    for (let p = 0; p < l; p++) {
      collectionArray[p].data.related = [];
      if (p > 1) {
        const previous = collectionArray[p - 1];
        collectionArray[p].data.previous = previous;
        collectionArray[p].data.related.push(previous)
      }
      if (p < l - 1) {
        const next = collectionArray[p + 1];
        collectionArray[p].data.next = next;
        collectionArray[p].data.related.push(next);
      }
    }
    return collectionArray;
  }

  config.addCollection("posts", (collection) => {
    const posts = collection
      .getFilteredByGlob("./site/posts/*.md")
      .filter(livePosts)
      .reverse()
      .map((post, i) => {
        post.data.color = colors[i > colors.length - 1 ? i % colors.length : i];
        return post;
      });
    return addPrevNext(posts);
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
  config.addPlugin(blogTools);

  // Watch for changes to my source files
  config.addWatchTarget("site/src/scss");
  config.addWatchTarget("site/src/js");

  return {
    dir: {
      input: "site",
      output: "dist",
    },
    passthroughFileCopy: true,
  };
};
