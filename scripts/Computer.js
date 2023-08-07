class Computer extends GameObject {
    constructor(config) {
      super(config);
      this.sprite = new Sprite({
        gameObject: this,
        src: "./images/characters/computer.png",
        animations: {
            "used-down"   : [ [0,0] ],
            "unused-down" : [ [1,0] ]
        },
        currentAnimation: "unused-down"
      });
      this.link = config.source || "Yahoo.com";
      this.storyFlag = false;
      this.talking = [
        {
          events: [
            { type: "textMessage", text: "*beep boop* initiating..." },
            { type: "computePage", link: this.link },
          ]
        }
      ]
  
    }
  
    update() {
        let animations = ["used-down","unused-down"]
        if(Math.random() > 0.99) {
            this.sprite.currentAnimation = animations[Math.floor(Math.random()*2)];
        }
    }
  
  }