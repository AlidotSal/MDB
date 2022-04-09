import { useRouteData } from "solid-app-router";
import {  createEffect, Show } from "solid-js";

export default () => {
  const data = useRouteData();

  createEffect(() => {
    document.title = 'News - MyMDb';
  window.scrollTo(0, 0);
  });

  return(
    <Show when={data()}>
    <div class="news">
      <ul>
        <For each={data().articles}>
          {(n) => (
            <li>
              <a href={n.url}>
              <img src={n.urlToImage} alt="" />
                <h5>{n.title}</h5>
              </a>
            </li>
          )}
        </For>
      </ul>
    </div>
    </Show>
  );
};
