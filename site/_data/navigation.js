const nav = {
  items: [
    {
      text: "Blog",
      url: "/posts",
      icon: "/icons/blog.svg",
      external: false,
    },
    {
      text: "Work",
      url: "/work",
      icon: "/icons/work.svg",
      external: false,
    },
    {
      text: "About",
      url: "/about",
      icon: "/icons/about.svg",
      external: false,
    },
    {
      text: "Contact",
      url: "/contact",
      icon: "/icons/contact.svg",
      external: false,
    },
  ],
};

const nav_halfway = nav.items.length / 2;
const nav_left = nav.items.slice(0, nav_halfway);
const nav_right = nav.items.slice(nav_halfway, nav.items.length);

module.exports = {...nav, nav_left, nav_right};