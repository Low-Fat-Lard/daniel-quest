class Hud {
  
    update() {
        this.element.innerHTML = `<svg viewBox="0 0 100 100">
        <defs>
          <rect id="square" x="-2.5" y="-2.5" width="5" height="5" />
        </defs>
        <g transform="translate(50 50)">
          <g fill="white" stroke="none">
            <g id="dial-main">
              <use transform="rotate(0) translate(0 -40)" href="#square" />
              <use transform="rotate(90) translate(0 -40)" href="#square" />
            </g>
            <use href="#dial-main" transform="scale(-1 -1)" />
      
            <g id="dial-support" opacity="0.5">
              <use
                transform="rotate(30) translate(0 -40) rotate(-30)"
                href="#square"
              />
              <use
                transform="rotate(60) translate(0 -40) rotate(-60)"
                href="#square"
              />
              <use
                transform="rotate(120) translate(0 -40) rotate(-120)"
                href="#square"
              />
              <use
                transform="rotate(150) translate(0 -40) rotate(-150)"
                href="#square"
              />
            </g>
            <use href="#dial-support" transform="scale(-1 1)" />
          </g>
      
          <g
            fill="none"
            stroke="white"
            stroke-linecap="square"
            stroke-width="4"
          >
            <!-- mao the 0-23 range (getHours) to the 0-360 range (degrees) -->
            <g transform="rotate(`+overworld.timer/36+`)">
              <path opacity="0.5" d="M 0 0 v -15" stroke-width="4" />
            </g>
            <!-- map the 0-59 range (minutes) to the 0-360 range (degrees) -->
            <g transform="rotate(`+overworld.timer/3+`)">
              <path d="M 0 0 v -30" stroke-width="2.5" />
            </g>
          </g>
        </g>
      </svg>`;
    }
  
    createElement() {
  
      if (this.element) {
        this.element.remove();
      }
      this.element = document.createElement("div");
      this.element.classList.add("Hud");
     
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