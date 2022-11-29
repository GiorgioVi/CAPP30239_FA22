
d3.csv("./Data/monthly_average_price.csv").then(data => {

    let timeParse = d3.timeParse("%Y-%m-%d");

    var timeFormatter = d3.timeFormat('%b-%Y')

    for (let d of data) {
        d.size = +d.size; //force a number
        d.month_year = timeFormatter(timeParse(d.month_year));
    };

    const height = 600,
          width = 800,
          margin = ({ top: 25, right: 30, bottom: 60, left: 50 });

    let svg = d3.select("#average_price_chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); // for resizing element in browser
    
    let x = d3.scaleBand()
        .domain(data.map(d => d.month_year)) // data, returns array
        .range([margin.left, width - margin.right]) // pixels on page
        .padding(0.1);

    
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.size)]).nice() // nice rounds the top num
        .range([height - margin.bottom, margin.top]); //svgs are built from top down, so this is reversed
    
    /* Update: simplfied axes */
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 15})`) // move location of axis
        .call(d3.axisBottom(x))
            .selectAll('.tick text')
            .attr("transform","rotate(45)");
    
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));

    let bar = svg.selectAll(".bar") // create bar groups
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    bar.append("rect") // add rect to bar group
        .attr("fill", "steelblue")
        .attr("x", d => x(d.month_year)) // x position attribute
        .attr("width", x.bandwidth()) // this width is the width attr on the element
        .attr("y", d => y(d.size)) // y position attribute
        .attr("height", d => y(0) - y(d.size)); // this height is the height attr on element
    
    bar.append('text') // add labels
        .text(d => d.size)
        .attr('x', d => x(d.month_year) + (x.bandwidth()/2))
        .attr('y', d => y(d.size) - 10)
        .attr('text-anchor', 'middle')
        .style('fill', 'black');

});