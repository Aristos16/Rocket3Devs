import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";

import {
  isProgrammaticScroll,
  markProgrammaticScrollDone,
  scrollToSection,
  setHomeScrollPaused,
  setHomeScroller,
} from "../src/components/sections/scroll-to-section.ts";

let historyTarget = "";
let scrollOptions;
let targetTop = 480;
let targetExists = true;

beforeEach(() => {
  historyTarget = "";
  scrollOptions = undefined;
  targetTop = 480;
  targetExists = true;

  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: {
      getElementById: (id) =>
        targetExists && id === "services"
          ? { getBoundingClientRect: () => ({ top: targetTop }) }
          : id === "home"
            ? { getBoundingClientRect: () => ({ top: targetTop }) }
            : null,
    },
  });
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      innerWidth: 1440,
      scrollY: 100,
      history: {
        replaceState: (_state, _title, href) => (historyTarget = href),
      },
      matchMedia: () => ({ matches: false }),
      scrollTo: (options) => (scrollOptions = options),
    },
  });
  setHomeScroller(null);
  markProgrammaticScrollDone();
});

afterEach(() => {
  delete globalThis.document;
  delete globalThis.window;
  setHomeScroller(null);
  markProgrammaticScrollDone();
});

test("uses the desktop header offset for a section anchor", () => {
  assert.equal(scrollToSection("#services"), true);
  assert.equal(historyTarget, "#services");
  assert.deepEqual(scrollOptions, { top: 494, behavior: "smooth" });
  assert.equal(isProgrammaticScroll(), true);
});

test("uses the mobile offset and jumps when reduced motion is requested", () => {
  window.innerWidth = 390;
  window.matchMedia = () => ({ matches: true });

  assert.equal(scrollToSection("#services"), true);
  assert.deepEqual(scrollOptions, { top: 510, behavior: "auto" });
});

test("returns to the top and skips scrolling a missing section", () => {
  assert.equal(scrollToSection("#home"), true);
  assert.deepEqual(scrollOptions, { top: 0, behavior: "smooth" });

  scrollOptions = undefined;
  historyTarget = "";
  targetExists = false;
  assert.equal(scrollToSection("#services"), false);
  assert.equal(scrollOptions, undefined);
  assert.equal(historyTarget, "");
});

test("delegates smooth scrolling and pause state to the homepage controller", () => {
  let observedTarget = -1;
  let observedOptions;
  let starts = 0;
  let stops = 0;
  let stopped = false;

  const fakeScroller = {
    get isStopped() {
      return stopped;
    },
    scrollTo: (target, options) => {
      observedTarget = typeof target === "number" ? target : -1;
      observedOptions = typeof options === "object" ? options : undefined;
    },
    start: () => {
      starts++;
      stopped = false;
    },
    stop: () => {
      stops++;
      stopped = true;
    },
  };
  setHomeScroller(fakeScroller);

  setHomeScrollPaused(true);
  assert.equal(scrollToSection("#services"), false);
  assert.equal(observedTarget, -1);
  assert.equal(historyTarget, "");

  setHomeScrollPaused(false);
  assert.equal(scrollToSection("#services"), true);
  assert.equal(observedTarget, 494);
  assert.equal(observedOptions?.immediate, false);
  assert.equal(isProgrammaticScroll(), true);
  observedOptions?.onComplete?.();
  assert.equal(isProgrammaticScroll(), false);

  setHomeScrollPaused(true);
  setHomeScrollPaused(false);
  assert.equal(stops, 2);
  assert.equal(starts, 2);
});
