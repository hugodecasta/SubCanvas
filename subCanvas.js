'use strict'

class SubCanvas {

    constructor(subcanvas_id='SubCanvas') {
        this.canvas_jq = $('<canvas>').attr('id',subcanvas_id)
        .css({
            position:'absolute',
            top:0,
            left:0
        })
        $('body').prepend(this.canvas_jq)
        this.canvas = document.getElementById(subcanvas_id)
        this.ctx = this.canvas.getContext("2d")

        this.update_method = function() {}

        this.__launch_updater()
        this.update_method()
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
            tthis.ctx.canvas.width  = window.innerWidth;
            tthis.ctx.canvas.height = window.innerHeight;
            tthis.update_method.call(tthis)
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