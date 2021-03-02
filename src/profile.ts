let itemsDomNode : HTMLElement| null = document.getElementById('items');

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
                    img.src = "http://www.pixeden.com/media/k2/galleries/468/001-business-card-clip-brand-mock-up-vol-20-psd.jpg";
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