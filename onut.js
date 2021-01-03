function Onut(id, data, config) {
    this.template = '<div class="onut-container" style="position:relative;"> \
                        <svg width="100%" height="100%" viewBox="0 0 40 40" class="onut" style="transform:rotate(270deg);"> \
                        </svg> \
                    </div>'    
                    
      
    this.colors =["#8ED081", "#B4D2BA", "#DCE2AA", "#B57F50", "#4B543B", "#e63946", "#a8dadc", "#457b9d", "#1d3557", "#fca311", "#e29578", "#560bad", "#fec89a", "#ffb5a7", "#f77f00",
        "#9b5de5", "#f15bb5", "#fee440", "#e26d5c", "#723d46", "#472d30", "#c9cba3", "#ffe1a8", "#9e2a2b", "#353535", "#344e41", "#e2afff", "#f3c4fb"
    ]     
    
    this.width = config ? config.width ? config.width : 3.5 : 3.5;
    this.spacing = config ? config.spacing ? config.spacing : 0 : 0;
    this.animated = config ? config.animated ? config.animated : false : false;
    this.legend = config ? config.legend ? config.legend : false : false;
                    
    this.createCircle = function(name, color, value, offset, spacing) {
        var pad = spacing ? spacing : 0;
        var val = value - pad;
        var off = offset + pad;
        return '<circle style="pointer-events:stroke; transition: 0.3s;" data-name="'+ name +'" class="onut-slice" cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke="' + color +'" stroke-width="'+ this.width +'" stroke-dasharray="'+ val +' 100" stroke-dashoffset="'+ off +'"></circle>'
    }   

    function insertAfter(newNode, existingNode) {
        existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }

    this.animate = function(e) {
        var parent = document.querySelector("#" + id + " svg");
        var all = document.querySelectorAll("#" + id + " svg circle");
        var width = parseFloat(e.target.getAttribute("stroke-width"));


        for(let k=0; k < all.length; k++) {
            all[k].style.strokeWidth = width;
            all[k].style.strokeLinecap = "butt";
            all[k].style.opacity = 0.5;
        }

        e.target.style.strokeWidth = width + 1;
        e.target.style.strokeLinecap = "round";
        e.target.style.opacity = 1;
        insertAfter(e.target, parent.lastChild);
    }

    this.generateNumber = function(min, max) {
        return Math.floor(
        Math.random() * (max - min) + min
        )
    }
    
    this.draw = function() {
        var above_threshold = [];
        var below_threshold = [];
        var offset_val = 0;
        var total = 0;
        var used_colors = [];

        for(let i=0; i < data.length; i++) {
            var val = data[i].value

            total = total + val;
        }

        for(let i=0; i < data.length; i++) {
            var val = (data[i].value / total) * 100;

            if(config && config.threshold && val <= config.threshold) {
                below_threshold.push(val);
            } else {
                above_threshold.push(data[i]);
            }
        }
    
        document.querySelector("#" + id).innerHTML = this.template;

        for(let i=0; i < above_threshold.length; i++) {
            var name = above_threshold[i].name;
            var val = (data[i].value / total) * 100;
            var color_index = this.generateNumber(0, this.colors.length - 1);
            var color = data[i].color ? data[i].color : this.colors[color_index];

            if(used_colors.includes(color)) {
                color = this.colors[this.generateNumber(0, this.colors.length - 1)];
            }

            used_colors.push(color);

            if(below_threshold.length == 0 && i == above_threshold.length - 1) {
                document.querySelector("#" + id + " .onut-container svg").innerHTML += this.createCircle(name, color, val + this.spacing, -offset_val, this.spacing);
            } else {
                document.querySelector("#" + id + " .onut-container svg").innerHTML += this.createCircle(name, color, val, -offset_val, this.spacing);
            }

            offset_val = offset_val + val
        }

        if(below_threshold.length > 0) {
            var others_val = below_threshold.reduce((acc, item) => acc + item);
            document.querySelector("#" + id + " .onut-container svg").innerHTML += this.createCircle("Others", this.colors[this.generateNumber(0, this.colors.length - 1)], others_val + this.spacing, -offset_val, this.spacing);
        }

        if(this.legend) {
            var circles = document.querySelectorAll("#" + id + " .onut-container svg circle");
            var legend = "<div class='onut-legend' style='display: flex; width: 100%;'></div>";
            document.querySelector("#" + id + " .onut-container").innerHTML += legend;

            for(let i=0; i < circles.length; i++) {
                var name = circles[i].getAttribute("data-name");
                var color = circles[i].getAttribute("stroke");

                document.querySelector("#" + id + " .onut-container .onut-legend").innerHTML += ' \
                    <div class="onut-legend-item" style="flex: 1; margin: 0 5px;"> \
                        <div class="onut-legend-name" style="width: 100%; text-align: center; margin-bottom: 5px">'+ name +'</div> \
                        <div class="onut-legend-color" style="background:'+ color +' ;height: 10px;"></div> \
                    </div> \
                '
            }
        }

        if(this.animated) {
            var animate = this.animate;
            var circles = document.querySelectorAll("#" + id + " svg circle");

            for(let i = 0; i < circles.length; i++) {
                circles[i].addEventListener("click", function(e) {                    
                    animate(e);
                })
            }
        }
    }

    
}


new Onut("onut-demo", [
    {
        name: "Demo 1",
        value: 40,
        color: "#B4D2BA"
    },
    {
        name: "Demo 2",
        value: 25
    },
    {
        name: "Demo 3",
        value: 20
    },
    {
        name: "Demo 4",
        value: 10
    },
    {
        name: "Demo 5",
        value: 5
    }
], 
{
    width: 3,
    spacing: 0.1,
    threshold: 10,
    legend: true,
    animated: true
}).draw();

