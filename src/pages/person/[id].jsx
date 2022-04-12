import { useRouteData } from "solid-app-router";
import {  createEffect, Show, Suspense } from "solid-js";
import Videos from "../../components/Videos";
import List from "../../components/List";
import instagram from "../../assets/images/instagram.svg";
import twitter from "../../assets/images/twitter.svg";
import facebook from "../../assets/images/facebook.svg";
import imdb from "../../assets/images/imdb.svg";
import Loading from "../../components/Loading";

export default () => {
  const data = useRouteData();

  createEffect(() => {
    data()
    ? (document.title = `${data().info.name} - MyMDb`)
    : null;
  window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<Loading />}>
    <Show when={data()}>
      <section class="max-w-screen-xl my-0 mx-auto">
          <div class="grid gap-4">
            <div class="grid gap-4 p-4">
              <div class="flex flex-col gap-4 md:flex-row">
              <img
              class="w-28"
                src={
                  data().info.profile_path
                    ? `https://image.tmdb.org/t/p/w200${
                        data().info.profile_path
                      }`
                    : defaultProfile
                }
                alt=""
              />
              <div class="flex flex-col gap-6">
              <div class="flex gap-6">
                <Show when={data().externals.imdb_id}>
                <div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.imdb.com/name/${data().externals.imdb_id}/`}
                  >
                    <img class="w-6 md:w-8" src={imdb} alt="" />
                  </a>
                </div>
                </Show>

                <Show when={data().externals.facebook_id}>
                <div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.facebook.com/${data().externals.facebook_id}/`}
                  >
                    <img class="w-6 md:w-8" src={facebook} alt="" />
                  </a>
                </div>
              </Show>
              <Show when={data().externals.instagram_id}>
                <div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.instagram.com/${data().externals.instagram_id}/`}
                  >
                    <img class="w-6 md:w-8" src={instagram} alt="" />
                  </a>
                </div>
              </Show>
              <Show when={data().externals.twitter_id}>
                <div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.twitter.com/${data().externals.twitter_id}/`}
                  >
                    <img class="w-6 md:w-8" src={twitter} alt="" />
                  </a>
                </div>
              </Show>
            </div>
              <h2>{data().info.name}</h2>
              <p>{data().info.biography}</p>
              </div>
              </div>
              <div>
              <p>Birth: {data().info.birthday}</p>
              <Show when={data().info.deathday}>
                <p>Death: {data().info.deathday}</p>
              </Show>
              <p>{data().info.gender === 1 ? "Female" : "Male"}</p>
              <p>known for: {data().info.known_for_department}</p>
              <p>born in: {data().info.place_of_birth}</p>
              </div>
            </div>
            <Show when={data().images.profiles.length > 1}>
            <div class="p-4">
              <h3 class="text-normal">Photos</h3>
            <div class="flex gap-6 overflow-x-auto">
                <For each={data().images.profiles}>
                  {(img) => (<img class="w-24" src={`https://image.tmdb.org/t/p/w200${img.file_path}`} />)}
                </For>
            </div>
            </div>
            </Show>
            <div class="max-w-screen-xl w-64 my-0 mx-auto">
                <h4 class="px-4">Known For:</h4>
                <List list={data().credit.cast.slice(0, 10)} />
              </div>
          </div>
          </section>
          </Show>
          </Suspense>
  );
};
