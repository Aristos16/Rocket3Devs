import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";

// Run with Playwright and Chromium installed in the Docker browser container.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright-core");
const baseURL = process.env.BASE_URL || "http://127.0.0.1:5173";
const artifacts = process.env.ARTIFACT_DIR || "/tmp/rocket-polish-final";
await mkdir(artifacts, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_EXECUTABLE || "/usr/bin/chromium-browser",
  args: [
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--ignore-certificate-errors",
  ],
});

async function openPage(
  width,
  height,
  { reducedMotion = "no-preference", noWebGL = false, stallScene = false } = {},
) {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  if (!noWebGL)
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
  await page.addInitScript(
    ({ noWebGL, stallScene }) => {
      if (!noWebGL) {
        // Software shader compilation is slower than a GPU; test the flight separately from timeout fallback.
        const timeout = window.setTimeout;
        window.setTimeout = (callback, delay, ...args) =>
          timeout(callback, delay === 8000 ? 30000 : delay, ...args);
      }
      if (stallScene) {
        const dispatch = window.dispatchEvent;
        window.dispatchEvent = function (event) {
          return event.type === "rocket3dev:scene-ready" ? true : dispatch.call(this, event);
        };
      }
      window.__reveals = [];
      window.__flightCount = 0;
      window.addEventListener("rocket3dev:scene-ready", () => {
        const canvas = document.querySelector(".home-canvas");
        const entrance = canvas
          ?.getAnimations()
          .find((animation) => animation.animationName === "launch-rocket-arrive");
        if (!entrance) return;
        window.__rocketReadyAt = performance.now();
        entrance.pause();
        window.__rocketEntrance = [0, 450, 900, 1350, 1800].map((time) => {
          entrance.currentTime = time;
          const style = getComputedStyle(canvas);
          const rect = canvas.getBoundingClientRect();
          return {
            opacity: Number(style.opacity),
            top: rect.top,
            right: rect.right,
            centerX: rect.left + rect.width / 2,
            centerY: rect.top + rect.height / 2,
            viewportHeight: innerHeight,
          };
        });
        entrance.currentTime = 0;
        entrance.play();
      });
      const animate = Element.prototype.animate;
      Element.prototype.animate = function (...args) {
        const animation = animate.apply(this, args);
        if (this.classList.contains("home-rocket-flight")) {
          window.__flightCount += 1;
          window.__entranceTime = performance.now() - window.__rocketReadyAt;
          window.__takeoffCanvas = document.querySelector("canvas");
          animation.addEventListener("finish", () => {
            window.__dockEnd = {
              time: performance.now(),
              transform: getComputedStyle(this).transform,
            };
          });
        } else if (this.closest(".home-hero")) {
          window.__reveals.push({
            kind: this.dataset.reveal,
            delay: args[1]?.delay,
            time: performance.now(),
          });
        }
        return animation;
      };
      if (noWebGL) {
        const getContext = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (type, ...args) {
          return /webgl/i.test(type) ? null : getContext.call(this, type, ...args);
        };
      }
    },
    { noWebGL, stallScene },
  );
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(
    () => document.querySelector(".rocket-home")?.dataset.loading === "false",
    {},
    { timeout: 30000 },
  );
  await page.waitForTimeout(reducedMotion === "reduce" ? 200 : 2400);
  return { page, context, errors };
}

async function checkLayout(page, label, expectCanvas = true) {
  const info = await page.evaluate(() => {
    const root = document.querySelector(".rocket-home");
    const stage = document.querySelector(".home-rocket-stage").getBoundingClientRect();
    const flight = document.querySelector(".home-rocket-flight").getBoundingClientRect();
    const canvas = document.querySelector("canvas");
    const rendered = canvas?.getBoundingClientRect();
    return {
      overflow: document.documentElement.scrollWidth > innerWidth,
      flightDrift: Math.max(
        Math.abs(stage.x - flight.x),
        Math.abs(stage.y - flight.y),
        Math.abs(stage.width - flight.width),
        Math.abs(stage.height - flight.height),
      ),
      bufferDrift: rendered
        ? Math.max(
            Math.abs(rendered.width - flight.width),
            Math.abs(rendered.height - flight.height),
          )
        : null,
      ready: root.dataset.sceneReady === "true",
      canvasCount: document.querySelectorAll("canvas").length,
      sameCanvas: canvas === window.__takeoffCanvas,
      flights: window.__flightCount,
      entrance: window.__rocketEntrance,
      entranceTime: window.__entranceTime,
      end: window.__dockEnd,
      reveals: window.__reveals,
      locked:
        Boolean(document.querySelector(".home-page-content").inert) ||
        document.body.style.overflow === "hidden",
    };
  });
  assert.equal(info.overflow, false, `${label}: horizontal overflow`);
  assert.ok(info.flightDrift < 1, `${label}: rocket shifted away from its landing stage`);
  assert.equal(info.locked, false, `${label}: page stayed locked after the intro`);
  if (expectCanvas) {
    assert.equal(info.ready, true, `${label}: WebGL did not become ready`);
    assert.equal(info.canvasCount, 1, `${label}: duplicate or missing canvas`);
    assert.ok(
      info.bufferDrift < 1.1,
      `${label}: loader transform shrank the render area by ${info.bufferDrift}px`,
    );
  }
  return info;
}

try {
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
  ]) {
    const { page, context, errors } = await openPage(width, height);
    await page.waitForFunction(
      () => document.querySelector(".rocket-home").dataset.sceneReady === "true",
    );
    const info = await checkLayout(page, name);
    assert.equal(info.flights, 1, `${name}: intro launched more than once`);
    assert.equal(info.sameCanvas, true, `${name}: canvas was replaced during handoff`);
    assert.ok(
      info.entranceTime >= 1780,
      `${name}: flight interrupted the rocket entrance after ${info.entranceTime}ms`,
    );
    const [entryStart, entryQuarter, entryMiddle, , entryEnd] = info.entrance;
    assert.ok(
      entryStart.top > entryStart.viewportHeight,
      "loading rocket must start completely below the viewport",
    );
    assert.ok(entryEnd.top < entryEnd.viewportHeight);
    assert.ok(Math.abs(entryEnd.centerX - width / 2) < 1, "loader rocket must settle centrally");
    assert.ok(entryStart.right < 0, "loading rocket must start completely left of the viewport");
    assert.ok(
      entryStart.centerX < entryMiddle.centerX && entryMiddle.centerX < entryEnd.centerX,
      "loading rocket must travel from the left toward the center",
    );
    const cornerY =
      entryStart.centerY +
      ((entryEnd.centerY - entryStart.centerY) * -entryStart.centerX) /
        (entryEnd.centerX - entryStart.centerX);
    assert.ok(
      Math.abs(cornerY - height) < 1,
      `loading rocket's flight must cross the bottom-left corner: ${JSON.stringify({ cornerY, height, entryStart, entryEnd })}`,
    );
    assert.equal(entryStart.opacity, 1, "loading rocket must fly in instead of fading in place");
    assert.equal(entryEnd.opacity, 1);
    assert.ok(entryStart.centerY > entryMiddle.centerY && entryMiddle.centerY > entryEnd.centerY);
    const distance = (from, to) => Math.hypot(to.centerX - from.centerX, to.centerY - from.centerY);
    assert.ok(
      distance(entryQuarter, entryMiddle) > distance(entryStart, entryQuarter) * 2,
      "loading rocket must start slowly and accelerate toward the center",
    );
    const headlineReveals = info.reveals.filter((item) => item.kind === "headline");
    assert.equal(headlineReveals.length, 2);
    assert.ok(
      headlineReveals[1].delay - headlineReveals[0].delay >= 120,
      "headline lines need distinct entrance times",
    );
    assert.ok(
      headlineReveals.every((item) => item.time >= info.end.time),
      "hero reveals started underneath the loader",
    );
    const matrix = await page.evaluate((transform) => {
      const m = new DOMMatrixReadOnly(transform);
      return [m.a, m.b, m.c, m.d, m.e, m.f];
    }, info.end.transform);
    assert.ok(
      matrix.every((value, i) => Math.abs(value - [1, 0, 0, 1, 0, 0][i]) < 0.001),
      "docking must finish at the exact landing position and rotation",
    );
    await page.screenshot({ path: `${artifacts}/${name}-hero.png`, timeout: 20000 });
    for (const section of ["portfolio", "services", "about", "contact", "footer"]) {
      await page
        .locator(section === "footer" ? ".home-footer" : `#${section}`)
        .scrollIntoViewIfNeeded();
      await page.waitForTimeout(section === "about" ? 2300 : 1200);
    }
    assert.equal(
      await page
        .locator(".orbit-rocket")
        .evaluate((element) => getComputedStyle(element).offsetDistance),
      "100%",
    );
    const aboutMotion = await page.evaluate(() => {
      const rocket = document.querySelector(".orbit-rocket");
      const trail = document.querySelector(".orbit-flight-trail").getAttribute("d");
      const float = document.querySelector(".orbit-rocket-float");
      const idle = float.getAnimations()[0];
      const time = idle.currentTime;
      idle.pause();
      const samples = [0, 1500, 3000, 4500, 5999, 6000].map((time) => {
        idle.currentTime = time;
        const matrix = new DOMMatrixReadOnly(getComputedStyle(float).transform);
        return { y: matrix.f, rotation: matrix.b };
      });
      idle.currentTime = time;
      idle.play();
      return {
        matchingTrail:
          getComputedStyle(rocket).offsetPath.replace(/[\s,]/g, "") ===
          `path("${trail}")`.replace(/[\s,]/g, ""),
        easing: getComputedStyle(rocket).animationTimingFunction,
        samples,
      };
    });
    assert.equal(aboutMotion.matchingTrail, true, "About rocket must follow its drawn trail");
    assert.notEqual(aboutMotion.easing, "linear", "About flight must ease into its final pose");
    assert.ok(
      aboutMotion.samples.every(({ y, rotation }) => y >= -2 && y <= 0 && rotation === 0),
      "About idle should drift gently without rocking",
    );
    assert.ok(
      Math.abs(aboutMotion.samples[4].y - aboutMotion.samples[5].y) < 0.001,
      "About idle must loop without a position jump",
    );
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(250);
    await page.screenshot({
      path: `${artifacts}/${name}-full.png`,
      fullPage: true,
      timeout: 20000,
    });
    if (name === "mobile") {
      await page.locator(".rocket-home-nav__toggle").click();
      assert.equal(
        await page.locator(".rocket-home-nav__toggle").getAttribute("aria-expanded"),
        "true",
      );
      await page
        .locator("#rocket-home-mobile-menu")
        .getByRole("button", { name: "EN", exact: true })
        .click();
      assert.equal(await page.locator("html").getAttribute("lang"), "en");
      await checkLayout(page, "mobile English");
      await page.locator(".home-secondary-link").click();
      await page.waitForTimeout(1600);
      const portfolioTop = await page
        .locator("#portfolio")
        .evaluate((element) => element.getBoundingClientRect().top);
      assert.ok(
        portfolioTop >= 50 && portfolioTop < 100,
        "mobile anchor should clear the sticky navigation",
      );
      await page.setViewportSize({ width: 844, height: 390 });
      await page.waitForTimeout(600);
      await checkLayout(page, "rotated phone");
      assert.equal(await page.locator(".rocket-home-nav__cta").isVisible(), false);
    }
    for (const href of ["/gym-demo", "/coffee-demo"]) {
      assert.equal((await page.request.get(`${baseURL}${href}`)).status(), 200);
    }
    assert.deepEqual(errors, [], `${name}: browser errors`);
    console.log(
      `PASS ${name}: continuous canvas, exact docking, render size, stagger, layout, navigation, demo routes`,
    );
    await context.close();
  }
  for (const [name, width, height] of [
    ["small-phone", 320, 568],
    ["tablet", 768, 1024],
    ["landscape", 844, 390],
  ]) {
    const { page, context, errors } = await openPage(width, height, { reducedMotion: "reduce" });
    await checkLayout(page, name, false);
    assert.equal(await page.locator(".home-launch").count(), 0);
    assert.equal(await page.locator("[data-reveal]:not(.is-visible)").count(), 0);
    await page.screenshot({ path: `${artifacts}/${name}.png`, timeout: 20000 });
    assert.deepEqual(errors, [], `${name}: browser errors`);
    console.log(`PASS ${name}: responsive layout and reduced motion`);
    await context.close();
  }
  const { page, context } = await openPage(375, 812, { noWebGL: true });
  await checkLayout(page, "WebGL unavailable", false);
  assert.equal(
    await page
      .locator(".home-rocket-poster")
      .evaluate((element) => getComputedStyle(element).opacity),
    "1",
  );
  console.log(
    "PASS WebGL unavailable: intro completes, static rocket and all content remain available",
  );
  await context.close();
  const stalled = await openPage(375, 812, { noWebGL: true, stallScene: true });
  const fallback = await checkLayout(stalled.page, "Scene stalled", false);
  assert.equal(fallback.flights, 0, "a stalled scene must not launch an invisible rocket");
  console.log("PASS scene stalled: timeout releases the page without an empty rocket flight");
  await stalled.context.close();
} finally {
  await browser.close();
}
