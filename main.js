const canvas = document.getElementById("canvas");
canvas.setAttribute("width", String(window.innerWidth))
canvas.setAttribute("height", String(window.innerHeight))
const ctx = canvas.getContext("2d");
const g = 9.81;
const friction = 0.25;

class KineticObject {
  constructor(xCord, yCord, width, height){
    this.xCord = xCord;
    this.yCord = yCord;
    this.width = width;
    this.height = height;
  }

  render() {
    ctx.fillStyle = "black";
    ctx.fillRect(this.xCord, this.yCord, this.width, this.height);
  }
}

class MovingObject extends KineticObject {
  constructor(xCord, yCord, width, height, mass, velX, velY){
    super(xCord, yCord, width, height);
    this.mass = mass;
    this.velocityX = velX;
    this.velocityY = velY;
  }

  phisycs(floorThing){
    this.xCord += this.velocityX
    this.yCord += this.velocityY

    if(this.yCord + this.height >= floorThing.yCord) {
      this.velocityY = 0;
      this.yCord = floorThing.yCord - this.height
    } else {
      this.velocityY += (this.mass * g)/2000;
    }

  }

  render() {
    
    ctx.fillStyle = "#222";
    ctx.fillRect(this.xCord, this.yCord, this.width, this.height);
  }
}

var mainFloor = new KineticObject(0, 700, 2000, 40)
var box = new MovingObject(400, 200, 40, 40, 200, 0, 0)

function renderAll(){
  setTimeout(()=>{
    ctx.fillStyle = "#eee"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    box.phisycs(mainFloor)
    box.render()
    mainFloor.render()
    renderAll()
  }, 10)
}

window.addEventListener("mousemove", (e)=>{
  if(e.clientX >= box.xCord && e.clientX <= box.xCord + box.width && e.clientY >= box.yCord && e.clientY <= box.yCord + box.height) {

      box.xCord = e.clientX
  }
  console.log(e);
  
  
  window.addEventListener("mouseup", ()=>{
  })
  
})

renderAll()