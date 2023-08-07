class Progress {
    constructor() {
      this.mapIds = "DemoRoom";
      this.startingHeroX = 0;
      this.startingHeroY = 0;
      this.startingHeroDirection = "down";
      this.saveFileKey = "Danielquest_SaveFile1";
    }
  
    save() {
      console.log(overworld)
      this.mapIds = overworld.map.name
      this.startingHeroX = overworld.map.gameObjects["hero"].x - overworld.map.gameObjects["hero"].x%16;
      this.startingHeroY = overworld.map.gameObjects["hero"].y - overworld.map.gameObjects["hero"].y%16;
      this.startingHeroDirection = overworld.map.gameObjects["hero"].direction;
      window.localStorage.setItem(this.saveFileKey, JSON.stringify({
        mapId: this.mapIds,
        startingHeroX: this.startingHeroX,
        startingHeroY: this.startingHeroY,
        startingHeroDirection: this.startingHeroDirection,
      }))
    }
  
    getSaveFile() {
      if (!window.localStorage) {
        return null;
      }
  
      const file = window.localStorage.getItem(this.saveFileKey);
      return file ? JSON.parse(file) : null
    }
    
    load() {
      const file = this.getSaveFile();
      if (file) {
        this.mapIds = file.mapId;
        this.startingHeroX = file.startingHeroX;
        this.startingHeroY = file.startingHeroY;
        this.startingHeroDirection = file.startingHeroDirection;
      }
    }
  
  }