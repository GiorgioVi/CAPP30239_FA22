/* D3 Area Chart */

d3.csv('./Data/monthly_sales_volume.csv').then(data => {


  const height = 350,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 80, left: 40 });

  const svg = d3.select("#area_volume_chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);


  let timeParse = d3.timeParse("%Y-%m-%d");

  for (let d of data) {
    d.size = +d.size;
    d.month_year = timeParse(d.month_year);
  }

  let x = d3.scaleTime()
    .domain(d3.extent(data, d => d.month_year))
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.size)])
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom + 20})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .selectAll('.tick text')
    .attr("transform", "rotate(45)");

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y)
      .tickFormat(d => d + "M")
      .tickSizeOuter(0)
      .tickSize(-width + margin.left + margin.right) //upMonthd to reach across
    );

  svg.append("text")
    .attr("class", "x-label")
    .attr("text-anchor", "end")
    .attr("x", width - margin.right)
    .attr("y", height)
    .attr("dx", "0.5em")
    .attr("dy", "-0.5em")
    .text("Month");

  svg.append("text")
    .attr("class", "y-label")
    .attr("text-anchor", "end")
    .attr("x", -margin.top / 2)
    .attr("dx", "-0.5em")
    .attr("y", 8)
    .attr("transform", "rotate(-90)")
    .text("Sale Volume in $Millions");

  let area = d3.area()
    .x(d => x(d.month_year))
    .y0(y(0)) // flat bottom of shape
    .y1(d => y(d.size));

  svg.append("path")
    .datum(data)
    .attr("d", area) // this d is an attribute
    .attr("fill", "purple")
    .attr("stroke", "purple");

});
