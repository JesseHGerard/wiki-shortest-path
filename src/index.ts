import fetch from "node-fetch";
import cheerio from "cheerio";

const BASE_URL = "https://en.wikipedia.org";
const MAX_DEPTH = 5;

const args = process.argv.slice(2);
const rootURL = `/wiki/${args[0]}`;
const endURL = `/wiki/${args[1]}`;

let depth = 0;
const queue = [[rootURL]];
let solved = false;
let solution = [];
let numberOfRequests = 0;

async function start() {
  await scrapeURLs(queue.shift());
  if (!solved && depth < MAX_DEPTH) {
    start();
  } else {
    if (solved) {
      console.log(
        `SOLVED in ${solution.length - 1} links: \n${solution.reduce(
          (accumulator, path) => `${accumulator} / ${path.slice(6)}`,
          ""
        )}`
      );
    } else {
      console.log(`Failed to solve in ${MAX_DEPTH} links`);
    }
  }
}

start();

async function scrapeURLs(history: string[]) {
  if (depth > history.length) {
    depth = history.length;
  }
  const wikiURL = `${BASE_URL}${history[history.length - 1]}`;
  numberOfRequests++;
  console.log(
    numberOfRequests,
    history.length,
    `${Math.round(queue.length / 100) / 10}k`,
    history.reduce(
      (accumulator, path) => `${accumulator} / ${path.slice(6)}`,
      ""
    )
  );

  const res = await fetch(wikiURL);
  const markup = await res.text();
  const $ = cheerio.load(markup);

  queue.push(
    ...Object.values($("a")).reduce((accumulator: [], element) => {
      const href = element.attribs?.href;

      return validateHref(href, history)
        ? [...accumulator, [...history, href]]
        : accumulator;
    }, [])
  );
}

function validateHref(href: string, history: string[]): boolean {
  if (
    typeof href === "string" &&
    href.includes("/wiki/") &&
    !href.includes("File:") &&
    !href.includes("http") &&
    !history.includes(href)
  ) {
    if (href === endURL) {
      solved = true;
      solution = [...history, href];
    }
    return true;
  }
  return false;
}
