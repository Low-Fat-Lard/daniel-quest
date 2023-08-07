class TextMessage {
  constructor({ text, onComplete, image}) {
    this.text = text;
    this.onComplete = onComplete;
    this.element = null;
    this.src = image || null;
  }

  createElement() {
    //Create the element
    this.element = document.createElement("div");
    this.element.classList.add("TextMessage");

    this.element.innerHTML = (`
      <p class="TextMessage_p"></p>
      <button class="TextMessage_button">■</button>
    `)

    //Init the typewriter effect
    this.revealingText = new RevealingText({
      element: this.element.querySelector(".TextMessage_p"),
      text: this.text
    })

    this.element.querySelector("button").addEventListener("click", () => {
      //Close the text message
      this.done();
    });

    this.actionListener = new KeyPressListener("Enter", () => {
      this.done();
    })
    this.actionListener = new KeyPressListener("KeyZ", () => {
      this.done();
    })
    if (this.src) {
      //Create the element
      this.image = document.createElement("div");
      this.image.classList.add("container");
  
      this.image.innerHTML = (`
        <div class="image-container">
          <img src="`+this.src+`" alt="Revealing Image">
          <div class="reveal-box"></div>
        </div>
      `)
    }
  }

  done() {

    if (this.revealingText.isDone) {
      if (this.image) {
        this.image.remove();
        document.querySelector(':root').style.setProperty('--animation-duration', '5s');
      }
      this.element.remove();
      this.actionListener.unbind();
      this.onComplete();
    } else {
      this.revealingText.warpToDone();
      if (this.image) {
        document.querySelector(':root').style.setProperty('--animation-duration', '0s');
      }
    }
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
    if (this.image) {
      container.appendChild(this.image);
    }
    this.revealingText.init();
  }

}