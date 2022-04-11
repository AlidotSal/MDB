import { Suspense } from "solid-js";
import { useRouteData } from "solid-app-router";
import MovieDropDown from "../../components/MovieDropDown";
import Trending from "../../components/Trending";
import Loading from "../../components/Loading";
import BGPhone from '../../assets/images/bg-phone.png';
import BGWide from '../../assets/images/bg-wide.png';

export default () => {
  const data = useRouteData();

  return (
    <Suspense fallback={<Loading />}>
    <Show when={data()}>
      <div class="w-full block relative">
      <picture>
        <source media="(max-width: 799px)" srcset={BGPhone} />
        <source media="(min-width: 800px)" srcset={BGWide} />
        <img src={BGPhone} alt="Chris standing up holding his daughter Elva" />
      </picture>
      <div class="absolute bottom-0 w-full mx-auto md:w-50% md:left-0 md:right-0">
        <figure class="my-0 py-4 color-white bg-dark-100/50">
          <blockquote class="m-0 p-4 text-sm rounded-2 md:text-lg" cite="https://movie-quote-api.herokuapp.com/">
            <p>{data().quote.quote}</p>
          </blockquote>
          <figcaption class="text-base">—{data().quote.role}, <cite>{data().quote.show}</cite></figcaption>
        </figure>
        <MovieDropDown />
      </div>
      </div>
      <Trending data={data()} />
    </Show>
    </Suspense>
  );
};
