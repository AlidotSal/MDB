import { createSignal, createEffect } from "solid-js";
import { Link } from "solid-app-router";
import fetchAll from '../utils/fetchAll'

export default (props) => {
  const [data, setData] = createSignal(null);
  createEffect(() => {

    const dataUrls = props.list
      .map(
        (item) =>
          `https://api.themoviedb.org/3/${item.media_type ?? "movie"}/${
            item.id
          }/external_ids?api_key=d0278f3771ae9e001fe1e92efaa54a42&language=en-US`
      );
    fetchAll(dataUrls).then(array => setData(array));
  })

  return (
    <Show when={data()}>
    <div class="list">
      <div class="w-full my-4 p-4 flex gap-6 overflow-x-auto">
        <For each={props.list}>
          {(item, i) => (
            <Link
              href={`/${item.media_type ?? "movie"}/${
                data() ? data()[i()]?.imdb_id : ''
              }`}
            >
              <section class="w-32 shadow-md shadow-dark-100/50">
                <img
                  src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                  width="200"
                  height="300"
                  alt={item.title || item.name}
                  loading="lazy"
                />
              </section>
            </Link>
          )}
        </For>
      </div>
    </div>
    </Show>
  );
};
