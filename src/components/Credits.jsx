import { createSignal } from "solid-js";
import { Link } from "solid-app-router";
import fetchAll from "../../utils/fetchAll";
import placeHolder from "../../assets/images/poster-placeholder.webp";
import "./credits.css";

export default (props) => {
  const [movies, setMovies] = createSignal([]);
  const urls = props.credits
    .slice(0, 10)
    .map(
      (item) =>
        `https://api.themoviedb.org/3/${item.media_type}/${item.id}/external_ids?api_key=d0278f3771ae9e001fe1e92efaa54a42&language=en-US`
    );
  fetchAll(urls).then((data) =>
    setMovies(data.map((ids, i) => ({ ...ids, ...props.credits[i] })))
  );

  return (
    <div class="credits">
      <h4>Known For:</h4>
      <div>
        <For each={movies()}>
          {(item) => {
            return (
              <Link href={`/${item.media_type}/${item.imdb_id}`}>
                <section>
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                        : placeHolder
                    }
                    alt={item.title}
                    loading="lazy"
                  />
                </section>
              </Link>
            );
          }}
        </For>
      </div>
    </div>
  );
};
