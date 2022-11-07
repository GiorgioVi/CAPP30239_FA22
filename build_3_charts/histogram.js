/* Bar chart for Age of people killed */

d3.csv("age_of_shooters.csv").then(data => {

    for (let d of data) {
        d.num = +d.num; //force a number
    };

    const height = 500,
          width = 800,
          margin = ({ top: 25, right: 30, bottom: 50, left: 50 });

    let svg = d3.select("#bar_chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); // for resizing element in browser
    
    let x = d3.scaleBand()
        .domain(data.map(d => d.age)) // data, returns array
        .range([margin.left, width - margin.right]) // pixels on page
        .padding(0.1);
    
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.num)]).nice() // nice rounds the top num
        .range([height - margin.bottom, margin.top]); //svgs are built from top down, so this is reversed
    
    /* Update: simplfied axes */
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) // move location of axis
        .call(d3.axisBottom(x))
            .selectAll('.tick text')
            .attr("transform","rotate(-45)");
    
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
        .attr("x", d => x(d.age)) // x position attribute
        .attr("width", x.bandwidth()) // this width is the width attr on the element
        .attr("y", d => y(d.num)) // y position attribute
        .attr("height", d => y(0) - y(d.num)); // this height is the height attr on element
    
    bar.append('text') // add labels
        .text(d => d.num)
        .attr('x', d => x(d.age) + (x.bandwidth()/2))
        .attr('y', d => y(d.num) + 15)
        .attr('text-anchor', 'middle')
        .style('fill', 'white');

    // adding in X-axis name
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width / 2)
        .attr("y", height -4)
        .style("font-size", "18px")
        .text("Age Of Victim");

    // adding in y-axis name

    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -3)
        .attr("x", 0)
        .attr("dy", ".75em")
        .style("font-size", "18px")
        .attr("transform", "rotate(-90)")
        .text("Number of Victims");

});