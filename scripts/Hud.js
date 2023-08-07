class Hud {
  
    update() {
    }
  
    createElement() {
  
      if (this.element) {
        this.element.remove();
      }
      this.element = document.createElement("div");
      // this.element.classList.add("Hud");
     
      this.update();
    }
  
    init(container) {
      this.createElement();
      container.appendChild(this.element);
  
      document.addEventListener("PlayerStateUpdated", () => {
        this.update();
      })
  
      document.addEventListener("LineupChanged", () => {
        this.createElement();
        container.appendChild(this.element);
      })
  
    }
  
  
  
  }
