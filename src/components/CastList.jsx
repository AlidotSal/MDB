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
    <div className="w-full overflow-hidden text-[#1f1f1f]">
      <h5>Cast:</h5>
      <ul class="w-screen grid grid-flow-col auto-cols-max items-center gap-8 overflow-x-scroll md:grid-flow-row md:w-240 md:grid md:grid-cols-6 md:gap-6 md:overflow-x-hidden">
        {
          <For each={props.crew?.cast.slice(0, 12)}>
            {(actor) => (
              <li class="flex items-center gap-2 md:flex md:flex-col md:items-start md:text-xs">
                <div>
                  <Link href={`/person/${actor.id}`}>
                    <img
                    class="object-cover w-13 h-13 rounded-1/2 md:w-90% md:h-auto md:rounded-lg"
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
                      {(name) => <p class="md:leading-none">{name}</p>}
                    </For>
                  </Link>
                  <span class="text-gray-400">{actor.character.split("/").pop()}</span>
                </div>
              </li>
            )}
          </For>
        }
        <li>
          <Link style={`margin-right: 2em`} href={`/crew`}>
            see All
          </Link>
        </li>
      </ul>
    </div>
  );
};
