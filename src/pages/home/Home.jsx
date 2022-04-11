import { Suspense } from "solid-js";
import { useRouteData } from "solid-app-router";
import MovieDropDown from "../../components/MovieDropDown";
import Trending from "../../components/Trending";
import Loading from "../../components/Loading";
import BG from '../../assets/images/bg.png';

export default () => {
  const data = useRouteData();

  return (
    <Suspense fallback={<Loading />}>
    <Show when={data()}>
      <div class={`w-full mx-auto bg-url md:w-80%`}>
        <figure class="my-0 py-4">
          <blockquote class="m-0 p-4 bg-gray-100 rounded-2" cite="https://movie-quote-api.herokuapp.com/">
            <p>{data().quote.quote}</p>
          </blockquote>
          <figcaption class="mt-2">—{data().quote.role}, <cite>{data().quote.show}</cite></figcaption>
        </figure>
        <MovieDropDown />
      </div>
      <Trending data={data()} />
    </Show>
    </Suspense>
  );
};
