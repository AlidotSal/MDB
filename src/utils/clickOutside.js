import { createEffect, createSignal, onCleanup } from "solid-js";

const DEFAULT_EVENTS = ['mousedown', 'touchstart'];

export function createClickOutside(
  handler,
  events = null,
  nodes = null,
) {

  const [ref, setRef] = createSignal();
  const listener = (event) => {
    if (Array.isArray(nodes)) {
      const shouldIgnore = event?.target?.hasAttribute('data-ignore-outside-clicks');
      const shouldTrigger = nodes.every((node) => !!node && !node.contains(event.target));
      shouldTrigger && !shouldIgnore && handler();
    } else if (ref() && !ref()?.contains(event.target)) {
      handler();
    }}

  createEffect(() => {
    (events || DEFAULT_EVENTS).forEach((fn) => document.addEventListener(fn, listener));
  });

  onCleanup(() => {
      (events || DEFAULT_EVENTS).forEach((fn) => document.removeEventListener(fn, listener));
  })
  return setRef;
}
