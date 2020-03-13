'use strict'

class SubCanvas {

    constructor(subcanvas_id='SubCanvas') {
        this.subcanvas_id = subcanvas_id
        this.setup_canvas()

        this.update_method = function() {}

        this.__launch_updater()
        this.update_method()
    }
    
    setup_canvas() {
        this.canvas = document.getElementById(this.subcanvas_id)
        this.ctx = null
        if(this.canvas != null) {
            this.canvas.getContext("2d")
        }
    }

    // ------------------------------------------------------

    set_update_method(update_method) {
        if(update_method == null)
            update_method = function(){}
        this.update_method = update_method
    }

    __launch_updater() {
        let tthis = this
        setInterval(function(){
            if(tthis.canvas == null) {
                tthis.setup_canvas()
            }
            tthis.ctx.canvas.width  = window.innerWidth;
            tthis.ctx.canvas.height = window.innerHeight;
            try {
                tthis.update_method.call(tthis)
            } catch(e) {
                console.error('updated method error')
                console.error(e)
                tthis.set_update_method(null)
            }
        },12)
    }

    // ------------------------------------------------------

    clear() {
        this.fill('transparent')
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    fill(color) {
        this.ctx.fillStyle = color;
    }

    stroke(color) {
        this.ctx.strokeStyle = color;
    }

    // ----------------------------

    rect(x,y,width,height) {
        this.ctx.fillRect(x,y,width,height);
    }

    line(fromx,fromy,tox,toy) {
        this.ctx.beginPath();
        this.ctx.moveTo(fromx,fromy);
        this.ctx.lineTo(tox,toy);
        this.ctx.stroke();
    }

    curve(p1x,p1y,p2x,p2y,p3x,p3y) {
        this.ctx.beginPath();
        this.ctx.moveTo(p1x, p1y);
        this.ctx.quadraticCurveTo(p2x, p2y, p3x, p3y);
        this.ctx.stroke();
    }

    // ------------------------------------------------------

}
