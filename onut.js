function Onut(id, data, config) {
    this.template = '<div class="onut-container"> \
                        <svg width="100%" height="100%" viewBox="0 0 40 40" class="onut" style="transform:rotate(270deg);"> \
                        <circle class="donut-ring" cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke-width="3.5"></circle> \
                        </svg> \
                    </div>'    
                    
      
    this.colors =["#8ED081", "#B4D2BA", "#DCE2AA", "#B57F50", "#4B543B", "#e63946", "#a8dadc", "#457b9d", "#1d3557", "#fca311", "#e29578", "#560bad", "#fec89a", "#ffb5a7", "#f77f00",
        "#9b5de5", "#f15bb5", "#fee440", "#e26d5c", "#723d46", "#472d30", "#c9cba3", "#ffe1a8", "#9e2a2b", "#353535", "#344e41", "#e2afff", "#f3c4fb"
    ]     
    
    this.width = config ? config.width ? config.width : 3.5 : 3.5;
                    
    this.createCircle = function(color, value, offset) {
        return '<circle class="onut-slice" cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke="' + color +'" stroke-width="'+ this.width +'" stroke-dasharray="'+ value +' 100" stroke-dashoffset="'+ offset +'"></circle>'
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
    
        document.getElementById(id).innerHTML = this.template;

        for(let i=0; i < above_threshold.length; i++) {
            var val = (data[i].value / total) * 100;
            var color_index = this.generateNumber(0, this.colors.length - 1);
            var color = data[i].color ? data[i].color : this.colors[color_index];

            if(used_colors.includes(color)) {
                color = this.colors[this.generateNumber(0, this.colors.length - 1)];
            }

            used_colors.push(color);

            document.querySelector("#" + id + " .onut-container svg").innerHTML += this.createCircle(color, val, -offset_val);
            offset_val = offset_val + val
        }

        if(below_threshold.length > 0) {
            var others_val = below_threshold.reduce((acc, item) => acc + item);
            document.querySelector("#" + id + " .onut-container svg").innerHTML += this.createCircle(this.colors[this.generateNumber(0, this.colors.length - 1)], others_val, -offset_val);
        }
    }
}


new Onut("onut-demo", [
    {
        value: 40,
        color: "#B4D2BA"
    },
    {
        value: 25
    },
    {
        value: 20
    },
    {
        value: 10
    },
    {
        value: 5
    }
], 
{
    width: 3,
    threshold: 10
}).draw();