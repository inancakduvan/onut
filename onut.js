function Onut(id, data) {
    this.template = '<div class="onut-container"> \
                        <svg width="100%" height="100%" viewBox="0 0 40 40" class="onut"> \
                        <circle class="donut-ring" cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke-width="3.5"></circle> \
                        </svg> \
                    </div>'    
                    
    this.createCircle = function(color, value, offset) {
        return '<circle class="onut-slice" cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke="' + color +'" stroke-width="3.5" stroke-dasharray="'+ value +' 100" stroke-dashoffset="'+ offset +'"></circle>'
    }       
    
    this.draw = function() {
        var offset_val = 0;

        document.getElementById(id).innerHTML = this.template;

        for(let i=0; i < data.length; i++) {
            document.querySelector("#" + id + " .onut-container svg").innerHTML += this.createCircle(data[i].color, data[i].value, -offset_val);
            offset_val = offset_val + data[i].value
        }
    }
}


new Onut("onut-demo", [
    {
        value: 25,
        color: "red"
    },
    {
        value: 75,
        color: "salmon"
    }
]).draw();