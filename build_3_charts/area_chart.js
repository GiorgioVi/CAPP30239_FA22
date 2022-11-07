

d3.csv('month_of_shootings.csv').then(data => {
    let timeParse = d3.timeParse("%m/%y");
    
    for (let d of data) {
        d.count = +d.count;
        d.month = timeParse(d.month);
    }

    /* D3 Area Chart */

    const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 80, left: 40 });

    const svg = d3.select("#area_chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

    let x = d3.scaleTime()
      .domain(d3.extent(data, d => d.month))
      .range([margin.left, width - margin.right]);
    
    let y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .range([height - margin.bottom, margin.top]);
    
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom + 20})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll('.tick text')
        .attr("transform","rotate(45)");

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y)
        .tickFormat(d => d)
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
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("Death Toll");
    
    let area = d3.area()
      .x(d => x(d.month))
      .y0(y(0)) // flat bottom of shape
      .y1(d => y(d.count));

    svg.append("path")
      .datum(data)
      .attr("d", area) // this d is an attribute
      .attr("fill", "lavender")
      .attr("stroke", "lavender");
    
  });

