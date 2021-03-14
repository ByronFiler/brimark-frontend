let itemsDomNode : HTMLElement| null = document.getElementById('items');
let profileOverlay: HTMLElement | null = document.getElementById('overlay');
let imageUrls = [
    'http://www.pixeden.com/media/k2/galleries/468/001-business-card-clip-brand-mock-up-vol-20-psd.jpg',
    'http://www.graphicsfuel.com/wp-content/uploads/2015/11/branding-mockup-psd.jpg',
    'http://www.pixeden.com/media/k2/galleries/511/001-business-card-mockup-vol-22-box-brand-psd.jpg',
    'https://blog.spoongraphics.co.uk/wp-content/uploads/2013/mockup/23.jpg'
]

function getRandomNumber(minimum: number, maximum: number) : number {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function getRandomImageURL() : string {
    let index: number = getRandomNumber(0, imageUrls.length -1);
    return imageUrls[index];
}

if(itemsDomNode) {
    const editButton : HTMLElement | null = document.getElementById('editButton');
    if(editButton) {
        editButton.addEventListener('click', function() {
            // digusting, I would change this to != this.dataset.isclicked but cast typing seems weird in javascript.
            this.dataset.isclicked = this.dataset.isclicked === "false" ? "true" : "false";


            // god, I hope there's another way to do this - Jordan, I don't want to assign css like this. Transitions seem to be iffy when trying to keep states. Can't display: none; then display:block etc.
            if(this.dataset.isclicked === "true") {
                Object.assign(itemsDomNode?.style, {
                    display: "none"
                });
                
                Object.assign(profileOverlay?.style, {
                    display: "block"
                });
            } else {
                Object.assign(itemsDomNode?.style, {
                    display: "grid"
                });
                Object.assign(profileOverlay?.style, {
                    display: "none"
                });
            }
        });
    }

    fetch('https://brimark.api.connieprice.co.uk/Search').then(response => {
	    response.json().then(items => {
           for(let item of items) {
                let rating : HTMLElement = document.createElement('div');
                rating.classList.add("rating");
                
                let randomStars: number = Math.random() * (5 - 1) + 1;
                // generate stars
                for(let i=0; i < randomStars; i++) {
                    let icon : HTMLElement = document.createElement('i');
                        icon.classList.add("material-icons");
                        icon.innerText = "star";
                    let span : HTMLElement = document.createElement('span');
                        span.classList.add("star");
                        span.appendChild(icon);
                    rating.appendChild(span);
                }

                let img : HTMLImageElement = document.createElement('img');
                    img.src = getRandomImageURL();
                let p : HTMLElement = document.createElement('p');
                    p.innerText = `${item.title} (£${item.price})`;
                let itemDom : HTMLElement = document.createElement('div');
                    itemDom.classList.add('item');
                    itemDom.append(img, rating, p);
                itemsDomNode?.appendChild(itemDom);
            }
	    });
    });
}