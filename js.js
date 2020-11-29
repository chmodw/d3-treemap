const width = 1260;
const height = 500;

const svg = d3
  .select("#chart-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

d3.json(
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"
)
  .then((data) => {
    let treemap = d3
      .treemap()
      .size([width - 110, height])
      .padding(1);
    let root = d3.hierarchy(data).sum((d) => d.value);
    treemap(root);

    // getting the movie categories
    let categories = root.leaves().map((item) => item.data.category);
    categories = categories.filter((item, i, self) => self.indexOf(item) === i);

    const colors = d3
      .scaleOrdinal()
      .domain(categories)
      .range(colorbrewer.Dark2[6]);

    // adding the chart
    let chart = svg
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("class", "group")
      .attr("transform", (d) => "translate(" + d.x0 + "," + d.y0 + ")");

    chart
      .append("rect")
      .attr("id", (d) => d.data.id)
      .attr("class", "tile")
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("data-name", (d) => d.data.name)
      .attr("data-category", (d) => d.data.category)
      .attr("data-value", (d) => d.data.value)
      .attr("fill", (d) => colors(d.data.category));

    chart
      .append("text")
      .attr("class", "tile-text")
      .selectAll("tspan")
      .data((d) => d.data.name.split(" "))
      .enter()
      .append("tspan")
      .attr("x", 4)
      .attr("y", (d, i) => 14 + i * 10)
      .text((d) => d)
      .style("font-size", 10);

    // adding the legend

    let legend = svg
      .append("g")
      .attr("id", "legend")
      .selectAll("#legend")
      .data(categories)
      .enter()
      .append("g")
      .attr("class", "legend-label")
      .attr("transform", function (d, i) {
        return "translate(100," + (height / 2 - i * 20) + ")";
      });

    // Adding the legend rectangles
    legend
      .append("rect")
      .attr("x", width - 205)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", colors);

    // Adding the legend text
    legend
      .append("text")
      .attr("x", width - 180)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text((d) => d);
  })
  .catch((error) => {
    if (error) throw error;
  });
