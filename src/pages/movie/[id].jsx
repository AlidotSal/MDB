import { useRouteData } from "solid-app-router";
import {  createEffect, Show, Suspense } from "solid-js";
import Cast from "../../components/CastList";
import Videos from "../../components/Videos";
import List from "../../components/List";
import Back from "../../components/BackButton";
import Loading from "../../components/Loading";

export default () => {
  const data = useRouteData();

  createEffect(() => {
    data()
      ? (document.title = `${data().odata.Title} (${data().odata.Year}) - MyMDb`)
      : null;
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<Loading />}>
    <Show when={data()}>
          <div class="max-w-screen-xl my-0 mx-auto text-sm">
            <Back />
            <div class="text-sm">
              <div class="flex gap-1 md:px-4 md:w-full">
            <img
            class="w-full h-auto md:w-auto md:h-108"
                src={
                  data()
                    ? `https://image.tmdb.org/t/p/w500${data().tdata.poster_path}`
                    : ""
                }
                alt=""
              />
<iframe class="hidden md:block" width="768" height="432" src={`https://www.youtube.com/embed/${data().videos.results[0].key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
              <div class="mt-8 text-sm px-4">
                <h2>
                  {data().odata.Title.toUpperCase()} <span>({data().odata.Year})</span>
                  {/* <span>
                    {data()?.imdbRating} /
                    <span style={`font-size: .5em`}>{data()?.imdbVotes}</span>
                  </span> */}
                </h2>
                <div>
                  {/* {data()?.Rated} | */} {~~(data().tdata.runtime / 60)}h{" "}
                  {data().tdata.runtime % 60}
                  min |{"  "}
                  {data().odata.Genre.split(", ").slice(0, 3).join(", ")} |{"  "}
                  {/* {data()?.Released} ({data()?.Country.split(", ")[0]}) */}
                </div>
              </div>
            </div>
            <main class="px-4 md:w-full">
              <h4 >Plot</h4>
              <p class="my-4 mx-0 max-w-160 text-base md:text-sm">{data().odata.Plot}</p>
              <h5>Director: {data().odata.Director}</h5>
              <h5>
                Writers: {data().odata.Writer.split(", ").slice(0, 2).join(", ")}
              </h5>
              <Cast crew={data().crew} />
              <div>
                <span
                class="text-sm font-normal p-1 text-[#fff] bg-[#66cc33]"
                >
                  {data().odata.Metascore}
                </span>{" "}
                Metascore
              </div>
              <hr />
              <div class="py-3 px-5 bg-[#EFE3A4]">
                Awards: {data().odata.Awards} see more awards.
              </div>
              <hr />
              {/* <Videos videos={videos()} /> */}
              <hr />
              <hr />
              <Show when={data().tdata.revenue}>
                <div className="box-office">
                  <h4>Box Office</h4>
                  <h6>Budget: ${data().tdata.budget.toLocaleString()}</h6>
                  <h5>Gross USA: {data().odataBoxOffice}</h5>
                  <h5>Gross WorldWide: ${data().tdata.revenue.toLocaleString()}</h5>
                </div>
              </Show>
            </main>
          </div>
          <hr />
          <Show when={data().recommendations.results.length > 0}>
            <div class="recommendations">
              <List list={data().recommendations.results} />
            </div>
          </Show>
        </Show>
       </Suspense>
  );
};

