let itemsDomNode : HTMLElement| null = document.getElementById('items');

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