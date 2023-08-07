class PauseMenu {
    constructor({progress, onComplete}) {
      this.progress = progress;
      this.onComplete = onComplete;
    }
  
    getOptions(pageKey) {
  
      //Case 1: Show the first page of options
      if (pageKey === "root") {
        return [
          {
            label: "Credits",
            description: "Look at all those chickens",
            handler: () => {
            }
          },
          {
            label: "Help",
            description: "Controls etc...",
            handler: () => {
            }
          },
          {
            label: "Options",
            description: "Edit volume settings",
            handler: () => {
              this.keyboardMenu.setOptions( this.getOptions("options") );
            }
          },
          {
            label: "Save",
            description: "Save your progress",
            handler: () => {
              this.progress.save();
              this.close();
            } 
          },
          {
            label: "Save and Quit To Title",
            description: "Quit to title",
            handler: () => {
              this.progress.save();
              location.reload()
            } 
          },
          {
            label: "Close",
            description: "Edit options",
            handler: () => {
              this.close();
            }
          }
        ]
      } 
      if (pageKey === "options") {
        return [
          {
            label: "Sound",
            description: "Toggle in-game audio",
            handler: () => {
            }
          },
          {
            label: "Music",
            description: "Toggle in-game music",
            handler: () => {
            }
          },
          {
            label: "Back",
            description: "Back to root menu",
            handler: () => {
              this.keyboardMenu.setOptions( this.getOptions("root") );
            }
          }
        ];
      }
  
    }
  
    createElement() {
      this.element = document.createElement("div");
      this.element.classList.add("PauseMenu");
      this.element.classList.add("overlayMenu");
      this.element.innerHTML = (`
        <h2>Pause Menu</h2>
      `)
    }
  
    close() {
      this.esc?.unbind();
      this.x?.unbind();
      this.keyboardMenu.end();
      this.element.remove();
      this.onComplete();
    }
  
    async init(container) {
      this.createElement();
      this.keyboardMenu = new KeyboardMenu({
        descriptionContainer: container
      })
      this.keyboardMenu.init(this.element);
      this.keyboardMenu.setOptions(this.getOptions("root"));
  
      container.appendChild(this.element);
  
      this.esc = new KeyPressListener("Escape", () => {
        this.close();
      })
      this.x = new KeyPressListener("KeyX", () => {
        this.close();
      })
    }
  
  }