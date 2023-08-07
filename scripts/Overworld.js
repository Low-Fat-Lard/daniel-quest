class Overworld {
 constructor(config) {
   this.element = config.element;
   this.canvas = this.element.querySelector(".game-canvas");
   this.ctx = this.canvas.getContext("2d");
   this.map = null;
   this.timer = 0;
 }

  startGameLoop() {
    const step = () => {
      if (this.map.isPaused) {
        return;
      }
      //Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.timer++;
      //Establish the camera person
      const cameraPerson = this.map.gameObjects.hero;

      //Update all objects
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        })
      })
      this.hud.update();
      //Draw Lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson);

      //Draw Game Objects
      Object.values(this.map.gameObjects).sort((a,b) => {
        return a.y - b.y;
      }).forEach(object => {
        object.sprite.draw(this.ctx, cameraPerson);
      })

      //Draw Upper layer
      this.map.drawUpperImage(this.ctx, cameraPerson);
      
      requestAnimationFrame(() => {
        step();   
      })
    }
    step();
 }

 bindActionInput() {
   new KeyPressListener("Enter", () => {
     //Is there a person here to talk to?
     this.map.checkForActionCutscene()
   })
   new KeyPressListener("KeyZ", () => {
    //Is there a person here to talk to?
    this.map.checkForActionCutscene()
  })
   new KeyPressListener("Escape", () => {
    if (!this.map.isCutscenePlaying) {
     this.map.startCutscene([
       { type: "pause" }
     ])
    }
  })
  new KeyPressListener("KeyX", () => {
    if (!this.map.isCutscenePlaying) {
     this.map.startCutscene([
       { type: "pause" }
     ])
    }
  })
 }

 bindHeroPositionCheck() {
   document.addEventListener("PersonWalkingComplete", e => {
     if (e.detail.whoId === "hero") {
       //Hero's position has changed
       this.map.checkForFootstepCutscene()
     }
   })
 }
 drawCursor() {
  let cursorImage = document.createElement("img");
  cursorImage.src = "./images/characters/cursor.png";
  cursorImage.className = "cursor";
  cursorImage.id = "cursorImg"
  document.body.appendChild(cursorImage);
  cursorImage.style.display = "none";

  document.addEventListener("mousemove", e => {
    cursorImage.style.display = "block"
    cursorImage.style.top = e.y + "px";
    cursorImage.style.left = e.x + "px";
  })
  document.addEventListener("scroll", e => {
    cursorImage.style.display = "block"
    cursorImage.style.top = e.y + "px";
    cursorImage.style.left = e.x + "px";
  });
 }

 startMap(mapConfig, heroInitialState=null) {
  this.map = new OverworldMap(mapConfig);
  this.map.overworld = this;
  this.map.mountObjects();

  if (heroInitialState) {
    const {hero} = this.map.gameObjects;
    hero.x = heroInitialState.x;
    hero.y = heroInitialState.y;
    hero.direction = heroInitialState.direction;
  }
  console.log(this.map)
  this.progress.mapId = mapConfig.id;
  this.progress.startingHeroX = this.map.gameObjects.hero.x;
  this.progress.startingHeroY = this.map.gameObjects.hero.y;
  this.progress.startingHeroDirection = this.map.gameObjects.hero.direction;

 }

 async init() {
  const container = document.querySelector(".game-container");
  this.drawCursor();
  //Create a new Progress tracker
  this.progress = new Progress();

  //Show the title screen
  this.titleScreen = new TitleScreen({
    progress: this.progress
  })
  const useSaveFile = await this.titleScreen.init(container);
  //const useSaveFile = false;
  console.log(this.progress)

  //Potentially load saved data
  let initialHeroState = null;
  if (useSaveFile) {
    this.progress.load();
    initialHeroState = {
      x: this.progress.startingHeroX,
      y: this.progress.startingHeroY,
      direction: this.progress.startingHeroDirection,
    }
  }

  //Load the HUD
  this.hud = new Hud();
  this.hud.init(container);

  //Start the first map
  console.log(this.progress)
  this.startMap(window.OverworldMaps[this.progress.mapIds], initialHeroState );

  //Create controls
  this.bindActionInput();
  this.bindHeroPositionCheck();

  this.directionInput = new DirectionInput();
  this.directionInput.init();

  //Kick off the game!
  this.startGameLoop();


  if(!useSaveFile) {
    this.map.startCutscene([
      { type: "textMessage", text: "The four ancient sages (Daniel M, Daniel G, Daniel F and Daniel C) are locking aray the ancient Daniel Demon (Daniel McGrath)", image: "https://img.huffingtonpost.com/asset/5cc12ead2600003500707f90.jpeg?ops=scalefit_720_noupscale&format=webp"},
      { type: "textMessage", text: "Mr. Forrest has rescently sealed the sages in the DETENTION DIMENSION", image: "https://media.licdn.com/dms/image/C4D03AQGJLHhXHWomYw/profile-displayphoto-shrink_800_800/0/1517625308263?e=2147483647&v=beta&t=Rf2w56H5zeunvnyeIfO-BVh_H8-kXTYPHPa7TnzDwWg"},
      { type: "textMessage", text: "The sages hid the location of a book containing the information regarding the method of containing the Daniel Deamon and the placement of the containment vessel behind a series of clues", image: "https://i.insider.com/579677e188e4a78c148ba925?width=750&format=jpeg&auto=webp"},
      { type: "textMessage", text: "Daniel Flemming is the grandson of Daniel Martin who cannot tell Daniel the location of the book directly because he's worried Mr Forrest can hear him, but he has told you one thing...", image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Flamingos_Laguna_Colorada.jpg"},
      { type: "textMessage", text: "That all the clues can be found in the HighSchool", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg"}
    ])
  }

 }
}