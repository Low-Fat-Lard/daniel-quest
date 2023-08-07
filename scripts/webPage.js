class webPage {
    constructor({url, onComplete}) {
      this.url = url;
      this.onComplete = onComplete;
      this.element = null;
      this.canvas = document.querySelector(".game-canvas");
      this.ctx = this.canvas.getContext("2d");
    }

    renderPage(toRender) {
        this.element = null;
        this.element = document.createElement("div");
        this.element.classList.add("WebSite");
        if (Object.keys(window.db).indexOf(toRender) != -1) {
            try{
                this.element.innerHTML = "<div class='display'>" + window.db[toRender] + "</div>"
                this.button();

            }
            catch(e){
                let error=e
                console.error(error)
            }
        } else {
            this.element.innerHTML = (`
            <div class='display'>
                ERROR 404: Page not found.</br> 
                If you are looking at this, you have broken something
            </div>
            `)
        }
        this.closeButton()

        this.esc = new KeyPressListener("Escape", () => {
            this.close();
        })
        this.x = new KeyPressListener("KeyX", () => {
            this.close();
        })
    }
    close() {
        this.esc?.unbind();
        this.x?.unbind();
        this.element.remove();
        this.onComplete();
    }
    closeButton() {
        let button = document.createElement("button");
        button.classList.add("close")
        button.innerHTML = "X"
        button.addEventListener("click", () => {
            this.close();
        })
        this.element.appendChild(button);
    }
    button() {
        this.element.querySelectorAll('.button').forEach(ele => {
            this.renderPage = this.renderPage.bind(this);
            ele.addEventListener("click", () => {
                this.element.innerHTML = "<div class='display'>" + window.db[ele.id] + "</div>";
                this.button()
                this.closeButton()
            }, false)
            
        });
    }
    init(container) {
        this.renderPage(this.url)
        container.appendChild(this.element);
    }
}
window.db = {
    "tgr:loading": ``,
    "Yahoo.com": `The end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end`,
    "Clues.com": `<p style="color:red">Margerine</p> This is the <i>Margerine</i> website. Back to <button class="button" id="404.com">marmite</button>`,
    "404.com": `
    <p style="color:red">Hello</p> my name is
    <button class="button" id="Clues.com">margerine</button>
    I'm also
    <button class="button" id="Yahoo.com">butter</button>
    `
};
