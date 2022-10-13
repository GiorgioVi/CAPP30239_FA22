// Bar chart for covid country cases

d3.csv('covid.csv').then(data => {
    for (let d of data) {
        d.cases = +d.cases; //force a numbers
    };

    const height = 400, width = 800, 
    margin = ({top:25,right:30,bottom:35,left:50});


    let svg = d3.select('#chart')
        .append("svg")
        .attr("viewBox",[0,0,width,height]);

    let x = d3.scaleBand()
        .domain(data.map(d => d.country))
        .range([margin.left,width-margin.right])
        .padding(0.1);

    let y = d3.scaleLinear()
        .domain([0,d3.max(data, d=> d.cases)])
        .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(xAxis)
});

