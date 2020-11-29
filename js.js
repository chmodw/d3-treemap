const width = 1260;
const height = 600;

const chart = d3
  .select("#chart-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height + 50);

d3.json(
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"
)
  .then((data) => {
    let treemap = d3.treemap().size([width, height]).padding(1);
    let root = d3.hierarchy(data).sum((d) => d.value);
    treemap(root);

    const colors = d3.scaleOrdinal().range(colorbrewer.Dark2[6]);

    chart
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("transform", (d) => "translate(" + d.x0 + "," + d.y0 + ")")
      .append("rect")

      .attr("width", function (d) {
        return d.x1 - d.x0;
      })
      .attr("height", function (d) {
        return d.y1 - d.y0;
      })
      .style("fill", (d) => colors(d.data.category));
  })
  .catch((error) => {
    if (error) throw error;
  });
