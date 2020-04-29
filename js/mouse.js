var width, height
var step = 0;
var canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d')
var bg = [35,	36,	37]

// mouse coordinates
function Mouse () {
  this.x = window.innerWidth / 2
  this.y = window.innerHeight / 2
}
var mouse = new Mouse()
document.onmousemove = function(e){ mouse.x = e.pageX; mouse.y = e.pageY}

document.getElementsByTagName('body')[0].appendChild(canvas)

window.addEventListener('resize', setup)




setup()

function setup() {
  canvas.width = width = window.innerWidth
  canvas.height = height = window.innerHeight
  
  fillCanvas(ctx, bg, 1)
}

window.requestAnimationFrame(animate);

function animate() {
  fillCanvas(ctx, bg, 1)
  draw()
  step++
  window.requestAnimationFrame(function(){animate()})
}


function Flwr () {
  this.follow = null
  this.child = null
  this.x = mouse.x
  this.y = mouse.y
  this.dx = 0
  this.dy = 0
  this.a = 0.35
  this.b = 0.54
  this.n = 0
}


var flwr, flwrPrev, train = [], i, n = 50;
for (i = 0; i < n; i++) {
  flwr = new Flwr()
  flwr.n = i
  if (flwrPrev) {
    flwr.b = flwrPrev.b + (0.1/n)
    flwr.follow = flwrPrev
    flwrPrev.child = flwr
  } else {
    flwr.follow = mouse
  }
  flwrPrev = flwr
  train.push(flwr)
}

function draw () {
  // update flwrs
  // console.log(train)
  
  for (i in train){
    // update position
    flwr = train[i]
    var dx = flwr.follow.x - flwr.x
    var dy = flwr.follow.y - flwr.y

    flwr.dx = flwr.dx * flwr.a + dx * (1 - flwr.a)
    flwr.dy = flwr.dy * flwr.a + dy * (1 - flwr.a)

    flwr.x = flwr.dx * flwr.b + flwr.x 
    flwr.y = flwr.dy * flwr.b + flwr.y 
    
    // draw
    // ctx.beginPath();
    // drawCircle(ctx, flwr.x, flwr.y, 2)
    // ctx.fillStyle = '#FFF547'
    // ctx.fill()
    
    if (flwr.follow !== mouse) {
      ctx.beginPath();
      ctx.strokeStyle = '#00fcff'
      ctx.lineCap = 'round'
      ctx.lineWidth = (n-flwr.n)/n * 8 + 2
      ctx.moveTo(flwr.x,flwr.y);
      ctx.lineTo(flwr.follow.x,flwr.follow.y);
      ctx.stroke();
    }
  }
  
}

function drawCircle (context, x, y, r) {
  context.arc(x ,y , r, 0, 2*Math.PI);
}

function fillCanvas (context, color, alpha) {
  context.rect(0, 0, this.width, this.height)
  context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`
  context.fill()
}


