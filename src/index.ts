const app : HTMLElement = document.body;

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

let p : HTMLParagraphElement = createParagraphWithMessage("Hello, welcome to parcel.js!");

app.append(p);