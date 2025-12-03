import { createBrowserRouter } from "react-router-dom";

import { Home, Maker, Winner } from "@/pages";
import Article from "@/pages/article";
import ArticleDetail from "@/pages/article-detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/winners",
    element: <Winner />,
  },
  {
    path: "/authors",
    element: <Maker />,
  },
  {
    path: "/article",
    element: <Article />,
  },
  {
    path: "/article/:id",
    element: <ArticleDetail />,
  },
]);

export default router;
