export interface Route {
    name: string,
    path: string,
    showOnNav?: boolean,
    showWithoutSession?: boolean
    showWithSession?: boolean
}

export abstract class Routing {
    private static readonly routes: Route[] = [
        { name: "Home", path: "index.html", showOnNav: true },
        { name: "Login", path: "login.html", showOnNav: true, showWithSession: false },
        { name: "Profile", path: "profile.html", showOnNav: true, showWithSession: true },
        { name: "SignUp", path: "signup.html" },
        { name: "ItemDetail", path: "item.html" }
    ];
    public static getRoutes(): Route[] {
        return Routing.routes;
    }
    public static findRouteByProperty(name: string): Route | null {
        return Routing.getRoutes().filter((route: Route) => route.name.toLowerCase() == name)[0];
    }
    public static findRouteByPath(path: string): Route | null {
        return Routing.getRoutes().filter((route: Route) => route.path.toLowerCase() == path)[0];
    }
}

export default Routing;


