function Animation(rate) {
    this.LastTime = 0;
    this.Rate = rate;
    this.update = function() {};
    this.render = function() {}
}

Animation.prototype.run = function(time) {
    if ((time - this.LastTime) > this.Rate) {
        this.LastTime = time;
        this.update();
    }
    this.render();

};
// задаём параметры слоя на исходном изображении

var layer1 = new Animation(30);
layer1.sx = 0;
layer1.sy = 0;
layer1.w = 1024;
layer1.h = 600;
layer1.render = function() {
    var x = 0;
    var screen_w = canvas.width;
    // покрытие если canvas > слоя
    while (x < screen_w) {
        var draw_w = Math.min(this.w, screen_w - x);
        ctx.drawImage(art, this.sx, this.sy, draw_w, this.h,
            x, 0, draw_w, this.h);
        x += this.w;
    }
    // добавим луну
    ctx.drawImage(art, 1024, 0, 300, 300,
        100, 0, 300, 300);
};

var layer2 = new Animation(30);
layer2.sx = 0;
layer2.sy = 600;
layer2.w = 1664;
layer2.h = 600;
layer2.dx = 0;
layer2.speed = 1;
layer2.update = function() {
    this.dx += this.speed;
    if (this.dx > this.w) {
        this.dx -= this.w;
    }
};
layer2.render = function() {
    var x = 0;
    var screen_w = canvas.width;
    // в начало помещаем смещающееся изображение, х перемещаем на ширину картинки, потом к статическому слою
    if ((this.w - this.dx) > 0) {
        ctx.drawImage(art, this.sx + this.dx, this.sy, this.w - this.dx, this.h,
            x, 0, this.w - this.dx, this.h);
        x += this.w - this.dx;
    }
    while (x < screen_w) {
        var draw_w = Math.min(this.w, screen_w - x);
        ctx.drawImage(art, this.sx, this.sy, draw_w, this.h,
            x, 0, draw_w, this.h);
        x += this.w;
    }
};

var layer3 = new Animation(30);
layer3.sx = 0;
layer3.sy = 1200;
layer3.w = 1664;
layer3.h = 600;
layer3.dx = 0;
layer3.speed = 3;
layer3.update = layer2.update;
layer3.render = layer2.render;

var layer4 = new Animation(30);
layer4.sx = 0;
layer4.sy = 1800;
layer4.w = 1664;
layer4.h = 600;
layer4.dx = 0;
layer4.speed = 6;
layer4.update = layer2.update;
layer4.render = layer2.render;

var layer5 = new Animation(30);
layer5.sx = 0;
layer5.sy = 2400;
layer5.w = 1664;
layer5.h = 600;
layer5.dx = 0;
layer5.speed = 10;
layer5.update = layer2.update;
layer5.render = layer2.render;

var santa_claus = new Animation(50);
santa_claus.frame_num = 0;

santa_claus.get_frame = function() {
	if(this.frame_num > 7) {
		return {x: ((this.frame_num - 8) * 150), y:3150};	
	} else {
		return {x:(this.frame_num * 150), y:3000};
	}
};

santa_claus.update = function() {
	this.frame_num++;
	if(this.frame_num > 15) this.frame_num = 0;

};
santa_claus.render = function() {
	var frame = this.get_frame();
	ctx.drawImage(art, frame.x, frame.y, 150, 150,
		150, 450, 150, 150);
};

function MainLoop(time) {

    layer1.run(time);
    layer2.run(time);
    layer3.run(time);
    layer4.run(time);
    layer5.run(time);
    santa_claus.run(time);
    requestAnimationFrame(MainLoop);

}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var art = new Image();

art.onload = function() {
    requestAnimationFrame(MainLoop);
}

art.src = "art.png";

// динамическое изменение ширины canvas

resizeCanvas();

function resizeCanvas() {
    canvas.width = window.innerWidth - 40;
}