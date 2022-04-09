import { createSignal, createEffect } from "solid-js";
import { Link } from "solid-app-router";
import "./tab-bar.css";

export default () => {
  const [scrollDir, setScrollDir] = createSignal("up");
  const [selected, setSelected] = createSignal("home");

  createEffect(() => {
    const threshold = 50;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
  });

  /*   onCleanup(() => {
    window.removeEventListener("scroll", onScroll);
  }); */

  return (
    <div classList={{ "tab-bar": true, hide: scrollDir() === "down" }}>
      <div
        classList={{ selected: selected() === "home" }}
        onclick={() => setSelected("home")}
      >
        <Link href="/">
          <span>Home</span>
        </Link>
      </div>
      <div
        classList={{ selected: selected() === "news" }}
        onclick={() => setSelected("news")}
      >
        <Link href="/news">
          <span>News</span>
        </Link>
      </div>
      <div
        classList={{ selected: selected() === "info" }}
        onclick={() => setSelected("info")}
      >
        <Link href="/info">
          <span>Info</span>
        </Link>
      </div>
    </div>
  );
};
