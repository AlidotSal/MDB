import { createSignal, createEffect } from "solid-js";
import { Link } from "solid-app-router";
import {createClickOutside} from '../utils/clickOutside'
import fetchAll from "../utils/fetchAll";

export default () => {
  const [list, setList] = createSignal([]);
  const [exIDs, setExIDs] = createSignal([]);
  let inputRef;
  const dropdownRef = createClickOutside(() => setList([]));

  function handleInput(input) {
    if(input) {
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=d0278f3771ae9e001fe1e92efaa54a42&query=${input
        .split(" ")
        .join("+")}`
    )
      .then((res) => res.json())
      .then((data) => setList(data?.results));
  } else {
    setList([]);
  }
  }

  createEffect(() => {
    const dataUrls = list()
    .map(
      (item) =>
        `https://api.themoviedb.org/3/${item.media_type ?? "movie"}/${
          item.id
        }/external_ids?api_key=d0278f3771ae9e001fe1e92efaa54a42&language=en-US`
    );
  fetchAll(dataUrls).then(array => setExIDs(array));
})

  return (
    <div>
      <div class="relative flex flex-col items-center py-4">
        <label class="w-80% md:w-100">
          <input
            class="w-full block mx-auto px-4 py-2 rounded-md text-sm text-gray-700 bg-gray-100 border-1 border-gray-300 focus:outline-none focus:shadow-even-blue focus:bg-white"
            ref={inputRef}
            type="text"
            onChange={(e) => handleInput(e.target.value)}
            placeholder="search for a movie, tv show ..."
          ></input>
          <span
            onClick={() => {
              inputRef.value = "";
              inputRef.focus();
              setList(null);
            }}
            class="absolute block top-3px right-10px w-4 height-4 cursor-ponter bg-[url('/assets/images/clear.svg')]"
          >
          </span>
        </label>
      <Show when={list().length > 0}>
        <ul ref={dropdownRef} class="absolute top-16 w-85% md:w-120 h-160 overflow-auto py-4 flex flex-col gap-2 text-stone-700 border rounded border-gray-100 bg-[#ebebe2] shadow-md shadow-gray-600">
          <For each={list()}>
            {(item, i) => (
                <li class="w-95% h-16 my-0 mx-auto cursor-pointer rounded border border-solid border-gray-400 bg-white shadow-sm shadow-gray-600 transition-all hover:bg-gray-100 hover:text-shadow hover:shadow">
                  <Link
                  class="flex gap-4"
                  href={`/${item.media_type}/${exIDs() ? exIDs()[i()]?.imdb_id : ''}`}
              >
                  <img class="w-10" src={`https://image.tmdb.org/t/p/w200${
                      item.poster_path || item.profile_path
                    }`} />
                  <div class="flex flex-col justify-evenly">
                    <h3 class="text-yellow-800 text-xs">{item.title || item.name}</h3>
                    <div class="flex gap-8">
                      <Show when={item.release_date}>
                      <p class="text-sm">{item.release_date.split("-")[0]}</p>
                      </Show>
                      <p class="text-xs">{item.media_type}</p>
                    </div>
                  </div>
                  </Link>
                </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
    </div>
  );
};
