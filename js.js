const margin = { top: 50, right: 50, bottom: 50, left: 50 };
const width = 960 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const chart = d3
  .select("#chart-container")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom + 50);

let kickStarterPledgesUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
let movieSalesUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
let videoGameSalesUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

Promise.all([
  d3.json(kickStarterPledgesUrl),
  d3.json(movieSalesUrl),
  d3.json(videoGameSalesUrl),
])
  .then((data) => {})
  .catch((error) => {
    if (error) throw error;
  });
