const app : HTMLElement | null = document.getElementById('app');

/**
 * Sets the message inside of the paragraph elemeent
 * @param {string} message the message you want to set the paragraph element to.
 * @returns {HTMLParagraphElement} 
 */
export function createParagraphWithMessage(message: string) : HTMLParagraphElement {    
    const p : HTMLParagraphElement = document.createElement("p");
          p.textContent = message;
    return p;
}

if(app) {
    let p : HTMLParagraphElement = createParagraphWithMessage("Appended using TypeScript!");
    let div : HTMLDivElement = document.createElement("div");
        div.classList.add("col", "s0", "m0", "l0");
        div.appendChild(p);
    let parent : HTMLElement | null = app.querySelector("#app .row:first-of-type");
    
    if(parent) {
        parent.appendChild(div);
    }
}
