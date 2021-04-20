import * as M from "materialize-css";
import API from "./api";
import Routing from "./routing";

// i"./assets/svg/bear.svg";
const logo = require("./assets/svg/bear.svg") as string;


let navbarTarget : string = "mobile-demo";

function createSection() : HTMLElement {
    return document.createElement('section');
}

// <section>
//     <nav class="dark-theme">
//         <div class="nav-wrapper container">
//             <a href="index.html" class="brand-logo"><img class="icon" src="assets/svg/bear.svg" alt="a brown bear with a pride flag behind it"></a>
//             <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
//             <ul class="right hide-on-med-and-down">
//                 <li class="active"><a href="index.html">Home</a></li>
//                 <li><a href="#">Catalogue</a></li>
//                 <li><a href="profile.html">Profile</a></li>
//             </ul>
//         </div>
//     </nav>


//     <ul class="sidenav" id="mobile-demo">
//         <li><a href="index.html">Home</a></li>
//         <li><a href="#">Catalogue</a></li>
//         <li><a href="profile.html">Profile</a></li>
//     </ul>
// </section>

function createBrandLogo() : HTMLAnchorElement {
    let icon : HTMLImageElement = document.createElement('img');
        icon.src = logo;
        icon.alt = 'a brown bear with a pride flag behind it';
        icon.classList.add('icon');
    let link : HTMLAnchorElement = document.createElement('a');
        link.classList.add('brand-logo');
        link.href = 'index.html';
        link.appendChild(icon);
    return link;
}

function createBurgerMenu() : HTMLAnchorElement {
    let materialIcon : HTMLElement = document.createElement('i');
        materialIcon.classList.add('material-icons');
        materialIcon.innerText = 'menu';
    let anchor : HTMLAnchorElement = document.createElement('a');
        anchor.href = "#";
        anchor.dataset.target = navbarTarget;
        anchor.classList.add('sidenav-trigger');
        anchor.appendChild(materialIcon);
    return anchor;
}


interface MenuOption {
    href: string, 
    text: string
}

function createMenuOptions(...menuOptions: MenuOption[]) : HTMLUListElement {
    let ul : HTMLUListElement = document.createElement('ul');

    for(let i=0; i < menuOptions.length; i++) {
        let option : MenuOption = menuOptions[i];

        let href : string = option.href;
        if(option.href.charAt(0) !== '/') {
            href = `/${href}`;
        }

        let anchor : HTMLAnchorElement = document.createElement('a');
        anchor.innerText = option.text;
        anchor.href = href;

        let li : HTMLLIElement = document.createElement('li');
        li.appendChild(anchor);

        console.log(href, window.location.pathname);
        
        let pathname : string = window.location.pathname;
        
        if(href === pathname || href === "/index.html" && pathname === '/') {
            li.classList.add('active');
        }

        ul.appendChild(li);
    }
    return ul;
}


function hasSession() : boolean {
    let SID : string = API.getCookieValue("SID");
    return SID !== "" && SID.length > 0;
}

function getNavbarOptions() : MenuOption[] {
    let options : MenuOption[] = new Array();
    let filteredRouting = Routing.getRoutes().filter(route => route.showOnNav);
    filteredRouting.forEach(route => {
        
        // if the menu item is to be shown when the user doesn't have a session.
        let menuOption : MenuOption = {} as MenuOption;
            menuOption.text = route.name;
            menuOption.href = route.path;

        let hasShowWithSessionProperty : boolean = route.hasOwnProperty('showWithSession');
        
        if(hasShowWithSessionProperty) {
            if(hasSession()) {
                if(route.showWithSession) {
                    options.push(menuOption);
                }
            } else {
                if(!route.showWithSession) {
                    options.push(menuOption);
                }
            }
        } else {
            options.push(menuOption);
        }
    });
    return options;
} 

function createNavWrapper() : HTMLElement {
    let options : MenuOption[] = getNavbarOptions();
    
    let menuOptions : HTMLUListElement = createMenuOptions(...options);
    menuOptions.classList.add('right', 'hide-on-med-and-down');

    let navWrapper : HTMLDivElement = document.createElement('div');
    navWrapper.classList.add('nav-wrapper', 'container');
    navWrapper.append(
        createBrandLogo(),
        createBurgerMenu(),
        menuOptions
    );

    return navWrapper;
}

function createNavBar(): HTMLElement { 
    let navWrapper : HTMLElement = createNavWrapper();
    let nav : HTMLElement = document.createElement('nav');
        nav.classList.add('dark-theme');
        nav.appendChild(navWrapper);
       
    return nav;
}   

function createNavSideMenu() : HTMLUListElement {
    let sideNav : HTMLUListElement = document.createElement('ul');
    sideNav.classList.add('sidenav');
    sideNav.id = "mobile-demo";
    sideNav.setAttribute('style', 'transform:translateX(-105%);');
    
    let options : MenuOption[] = getNavbarOptions();

    options.forEach(option => {
        let a : HTMLAnchorElement= document.createElement('a');
        a.href = option.href;
        a.innerText = option.text;
        
        let li : HTMLLIElement = document.createElement('li');
        li.appendChild(a);

        sideNav.appendChild(li);
    });

    return sideNav;
}

function hasNavBar() : boolean {
    return document.getElementsByTagName('nav').length > 0;
}

export function navbar() : void {
    // if there isn't already a navbar on the screen, we'll create one!
    if(!hasNavBar()) {
        let navbarContainer: HTMLElement = createSection();
        
        navbarContainer.append(
            createNavBar(),
            createNavSideMenu()
        );
        
        document.body.prepend(navbarContainer);
        M.AutoInit();
    }
}

export default navbar;
