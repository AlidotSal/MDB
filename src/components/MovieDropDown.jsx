import { createSignal } from "solid-js";
import { Link } from "solid-app-router";
import {createClickOutside} from '../utils/clickOutside'

export default () => {
  const [list, setList] = createSignal(null);
  let inputRef;
  const dropdownRef = createClickOutside(() => setList(null));

  function handleInput(input) {
    fetch(
      `https://www.omdbapi.com/?apikey=bfd0caba&s=${input.split(" ").join("+")}`
    )
      .then((res) => res.json())
      .then((data) => setList(data?.Search));
  }

  return (
    <div>
      <div class="relative flex flex-col items-center py-4">
        <label class="w-80% md:w-100">
          <input
            class="w-full block mx-auto px-4 py-2 rounded-md text-sm text-gray-700 bg-gray-100 border-1 border-gray-300 focus:outline-none focus:shadow-even-blue focus:bg-white"
            ref={inputRef}
            type="text"
            onChange={(e) => handleInput(e.target.value)}
            placeholder="type a movie title"
          ></input>
          <span
            onClick={() => {
              inputRef.value = "";
              inputRef.focus();
              setList(null);
            }}
            class="absolute block top-3px right-10px w-4 height-4 cursor-ponter bg-[url('/assets/images/clear.svg')]"
          ></span>
        </label>
      <Show when={list()}>
        <ul ref={dropdownRef} class="absolute top-16 w-85% md:w-120 h-160 overflow-auto py-4 flex flex-col gap-2 text-stone-700 border rounded border-gray-100 bg-[#ebebe2] shadow-md shadow-gray-600">
          <For each={list()}>
            {(item) => (
                <li class="w-95% h-16 my-0 mx-auto cursor-pointer rounded border border-solid border-gray-400 bg-white shadow-sm shadow-gray-600 transition-all hover:bg-gray-100 hover:text-shadow hover:shadow">
                  <Link
                  class="flex gap-4"
                  href={`/${item.Type === "movie" ? "movie" : "tv"}/${
                  item.imdbID
                }`}
              >
                  <img class="w-10" src={item.Poster} />
                  <div class="flex flex-col justify-evenly">
                    <h3 class="text-yellow-800 text-xs">{item.Title}</h3>
                    <div class="flex gap-8">
                      <p class="text-sm">{item.Year}</p>
                      <p class="text-xs">{item.Type}</p>
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
