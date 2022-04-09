import { Suspense } from "solid-js";
import { useRouteData } from "solid-app-router";
import MovieDropDown from "../../components/MovieDropDown";
import Trending from "../../components/Trending";
import Loading from "../../components/Loading";

export default () => {
  const data = useRouteData();

  return (
    <Suspense fallback={<Loading />}>
    <Show when={data()}>
      <figure>
        <blockquote class="m-0 p-4 bg-gray-100 rounded-2" cite="https://movie-quote-api.herokuapp.com/">
            <p>{data().quote.quote}</p>
        </blockquote>
        <figcaption class="mt-2">—{data().quote.role}, <cite>{data().quote.show}</cite></figcaption>
    </figure>
      <MovieDropDown />
      <Trending data={data()} />
    </Show>
    </Suspense>
  );
};
