

d3.csv("./Data/Cleaned_Asset_Prices.csv").then(data => {


  let height = 350,
    width = 800,
    margin = ({ top: 25, right: 140, bottom: 60, left: 40 })
  innerWidth = width - margin.left - margin.right;

  const svg = d3.select("#line_plot")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);


  let timeParse = d3.timeParse("%Y-%m");

  let assets = new Set();

  for (let d of data) {
    d.Date = timeParse(d.Date);
    d.Value = +d.Value;
    assets.add(d.Asset); // push unique values to Set
  }

  let x = d3.scaleTime()
    .domain(d3.extent(data, d => d.Date))
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Value)).nice() // using extent because values are less than 0
    .range([height - margin.bottom, margin.top]);

  // Y Axis first
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis")
    .call(d3.axisLeft(y)
      .tickSize(-innerWidth)
      .tickFormat(d => d)
    );

  svg.append("text")
    .attr("class", "x-label")
    .attr("text-anchor", "end")
    .attr("x", width - margin.right + 40)
    .attr("y", height)
    .attr("dx", "0.5em")
    .attr("dy", "-0.5em")
    .text("Month");

  // X Axis second because we want it to be placed on top
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.top})`)
    .call(d3.axisBottom(x)
      .tickSizeOuter(0)
      .tickSizeInner(0)
    )
    .selectAll('.tick text')
    .attr("transform", "rotate(45)");

  svg.append("text")
    .attr("class", "y-label")
    .attr("text-anchor", "end")
    .attr("x", -margin.top / 2)
    .attr("dx", "-0.5em")
    .attr("y", 9)
    .attr("transform", "rotate(-90)")
    .text("Natural Log of USD Price");

  let line = d3.line()
    .x(d => x(d.Date))
    .y(d => y(d.Value));

  // looping through set
  for (let asset of assets) {
    //.filter filters data in D3
    let assetData = data.filter(d => d.Asset === asset);

    let g = svg.append("g")
      .attr("class", "asset")
      .on('mouseover', function () {
        // set/remove highlight class
        // highlight class defined in html
        d3.selectAll(".highlight").classed("highlight", false);
        d3.select(this).classed("highlight", true);
      });

    // USA selected in blue on load of page
    if (asset === "Bored Ape Average Sale Price") {
      g.classed("highlight", true);
    }

    g.append("path")
      .datum(assetData) // datum is a single result from data
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("d", line)

    // find position of last piece to position end of line labels
    let lastEntry = assetData[assetData.length - 1];

    g.append("text")
      .text(asset)
      .attr("x", x(lastEntry.Date))
      .attr("y", y(lastEntry.Value))
      .attr("dx", "5px") // shifting attribute in svg
      .attr("dominant-baseline", "middle")
      .attr("fill", "#999");
  }

});