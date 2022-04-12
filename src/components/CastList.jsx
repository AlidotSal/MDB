import { Link } from "solid-app-router";
import { For } from "solid-js";
import defaultProfile from "../assets/images/profile.svg";

export default (props) => {
  function splitName(fullName) {
    const array = fullName.split(" ");
    const first = array.shift();
    const last = array.join(" ");
    return [first, last];
  }


  return (
    <div className="w-full my-2 py-4 overflow-hidden text-[#1f1f1f] border-t-1 border-b-0 border-r-0 border-l-0 border-dark-50/30">
      <ul class="w-screen px-1 grid grid-flow-col auto-cols-max gap-6 overflow-x-scroll md:grid-flow-row md:w-240 md:grid md:grid-cols-6 md:overflow-x-hidden">
        {
          <For each={props.crew?.cast.slice(0, 12)}>
            {(actor) => (
              <li class="flex items-center gap-2 py-1 md:flex md:flex-col md:items-start md:py-0 md:text-xs">
                <div>
                  <Link href={`/person/${actor.id}`}>
                    <img
                    class="object-cover w-13 h-13 rounded-1/2 shadow-even-white md:w-80% md:h-auto md:rounded-lg md:shadow-none"
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                          : defaultProfile
                      }
                      alt=""
                      loading="lazy"
                    />
                  </Link>
                </div>
                <div className="text-xs text-sky-800 md:text-sm">
                  <Link class="font-semibold" href={`/person/${actor.id}`}>
                    <For each={splitName(actor.name)}>
                      {(name) => <p class="leading-none font-bold text-sm">{name}</p>}
                    </For>
                  </Link>
                  <span class="text-gray-400 leading-normal">{actor.character.split("/").pop()}</span>
                </div>
              </li>
            )}
          </For>
        }
        <li>
        </li>
      </ul>
    </div>
  );
};
