import { createSignal, createEffect } from "solid-js";
import { Link } from "solid-app-router";
import fetchAll from '../utils/fetchAll'
import "./list.css";

export default (props) => {
  const [data, setData] = createSignal(null);
  const dataUrls = props.list
    .slice(0, 10)
    .map(
      (item) =>
        `https://api.themoviedb.org/3/${item.media_type ?? "movie"}/${
          item.id
        }/external_ids?api_key=d0278f3771ae9e001fe1e92efaa54a42&language=en-US`
    );

  fetchAll(dataUrls).then(array => setData(array));

  return (
    <div class="list">
      <div>
        <For each={props.list}>
          {(item, i) => (
            <Link
              href={`/${item.media_type ?? "movie"}/${
                data() ? data()[i()]?.imdb_id : ''
              }`}
            >
              <section>
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
  );
};
