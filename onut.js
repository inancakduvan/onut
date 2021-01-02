function Onut(id) {
    this.template = '<div class="onut-container"> \
                        <svg width="100%" height="100%" viewBox="0 0 40 40" class="onut"> \
                        </svg> \
                    </div>'    
                    
    this.createCircle = function(color, value, offset) {
        return '<circle class="onut-slice" cx="20" cy="20" r="15.91549430918954" fill="' + color +'" stroke-width="3.5" stroke-dasharray="'+ value +' 100" stroke-dashoffset="'+ offset +'"></circle>'
    }        
}


new Onut("onut-demo");