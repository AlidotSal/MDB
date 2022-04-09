import { lazy } from "solid-js";
import { Router, useRoutes } from "solid-app-router";
import Wrapper from "./components/Wrapper";
import HomeData from "./pages/home/home.data";
import MovieData from "./pages/movie/[id].data";
import ShowData from "./pages/tv/[id].data";
import PersonData from "./pages/person/[id].data";
import NewsData from "./pages/news/news.data";
import "./app.css";

const routes =  [
  {
    path: "/movie/:id",
    component: lazy(() => import("./pages/movie/[id]")),
    data: MovieData,
  },
  {
    path: "/tv/:id",
    component: lazy(() => import("./pages/tv/[id]")),
    data: ShowData,
  },
    {
    path: "/person/:id",
    component: lazy(() => import("./pages/person/[id]")),
    data: PersonData,
  },
  {
    path: "/news",
    component: lazy(() => import("./pages/news/News")),
    data: NewsData,
  },
  {
    path: "/",
    component: lazy(() => import("./pages/home/Home")),
    data: HomeData,
  },
  {
    path: "/*all",
    component: lazy(() => import("./pages/404/404")),
  }
];

export default () => {
  const Routes = useRoutes(routes);

  return (
      <Router>
      <Wrapper>
        <Routes />
        </Wrapper>
      </Router>
  );
};
