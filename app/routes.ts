import {
  type RouteConfig, 
  index,
  route,
  layout,
 } from "@react-router/dev/routes";

export default [
  
    layout("components/StaticUi.tsx", [
      index("routes/home.tsx"),
      route(":slug", "routes/post.tsx"),
      route("about","routes/about.tsx"),
      route("news","routes/news.tsx"),
      route("events","routes/events.tsx"),
      route("contact","routes/contact.tsx"),
    ]),
  
] satisfies RouteConfig;