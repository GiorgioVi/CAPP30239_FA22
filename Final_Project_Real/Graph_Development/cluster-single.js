
d3.csv("./Data/clean_famous.csv").then(data => {


  let width = 1000,
    height = 500;

  let svg = d3.select("#cluster")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


  let rScale = d3.scaleLog()
    .range([5, 25])
    .domain(d3.extent(data, d => d.price));

  let colors = d3.scaleOrdinal()
    .range(['#B42F90', '#16B1AC', '#FF0909', '#6985DD', '#0BE304', '#9A303D', '#979883', '#FF09D3', '#FF7C09', '#EFE71F', '#7FA25A', '#7A57C7', '#804C13', '#C2C757', '#1F52EF'])
    .domain(d3.map(data, d => d.period));

  let simulation = d3.forceSimulation(data)
    .force("charge", d3.forceManyBody().strength(1000)) //strength
    // .force('x', d3.forceX().x(width/2))
    // .force('y', d3.forceY().y(height/2))
    .force("center", d3.forceCenter().x(width / 2).y(height / 2))
    .force("collision", d3.forceCollide().radius(d => rScale(d.price) + 1.5));

  let g = svg.append("g")
    .attr("class", "group");

  simulation.on("tick", () => {
    g.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .attr("r", d => rScale(d.price))
      // .attr("fill", "red")
      .attr("fill", d => colors(d.period))
      .attr("opacity", 0.75)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("opacity", 1);

        tooltip
          .style("visibility", "visible")
          .html(`<h3>${d.buyer}</h3><br />Price Paid: $${d.price}<br /><span style="text-transform: capitalize">Entertainment Category: ${d.period}</span>`);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px")
          .style("background", '#BCC5F7');
      })
      .on("mouseout", function () {
        d3.select(this).attr("opacity", 1);
        tooltip.style("visibility", "hidden");
      })
  })

  for (let i = 0; i < 100; i++) {
    simulation.tick()
  }
});

const tooltip = d3.select("body").append("div")
  .attr("class", "svg-tooltip")
  .style("position", "absolute")
  .style("visibility", "hidden");