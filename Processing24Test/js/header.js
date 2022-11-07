import { changeActive, setAttr, toggleAttr, addEventListenerToElements } from "./utils.js";

export function header() {
    const btnHeaderMobile = document.querySelector(".header .menu-icon");
    const menuHeaderMobile = document.querySelector(".mobile-header");
    const menuHeaderSelectAll = document.querySelectorAll(".list-header__select");

    const widthCurrentWindow = Math.max(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth, 0);
    const widthFromMobile = 850;
    const switcherHeaderMenu = {
        isDesktopFlagFlag: true,
        isMobileFlagFlag: true,
    };
    let arrFunc = [[], []];

    // eventListener (click) for button of menu
    if (btnHeaderMobile && menuHeaderMobile) {
        btnHeaderMobile.addEventListener("click", e => {
            btnHeaderMobile.style.pointerEvents = "none";

            btnHeaderMobile.classList.toggle("active");

            if (document.body.style.overflow) document.body.style.overflow = null;
            else document.body.style.overflow = "hidden";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            if (menuHeaderMobile.style.left) menuHeaderMobile.style.left = null;
            else menuHeaderMobile.style.left = 0;

            toggleAttr.bind(btnHeaderMobile);

            btnHeaderMobile.style.pointerEvents = null;
        });
    }

    if (widthCurrentWindow > widthFromMobile) {
        // add eventListener (hover) for select of menu
        arrFunc[0] = addEventListenerToElements(menuHeaderSelectAll, setAttr, "mouseenter", "aria-expanded", true);
        arrFunc[1] = addEventListenerToElements(menuHeaderSelectAll, setAttr, "mouseleave", "aria-expanded", false);       
    } else {
        // eventListener (click) for select of menu
        addEventListenerToElements(menuHeaderSelectAll, changeActive, "click");
    }

    window.addEventListener('resize', () => {
        const widthWindow = Math.max(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth, 0);

        if (btnHeaderMobile && menuHeaderMobile && menuHeaderSelectAll) {
            if (widthWindow > widthFromMobile && switcherHeaderMenu.isDesktopFlag) {
                closeMenuMobile();

                // add eventListener (hover) for select of menu
                arrFunc[0] = [...addEventListenerToElements(menuHeaderSelectAll, setAttr, "mouseenter", "aria-expanded", true)];
                arrFunc[1] = [...addEventListenerToElements(menuHeaderSelectAll, setAttr, "mouseleave", "aria-expanded", false)];        
                
                switcherHeaderMenu.isDesktopFlag = false;
                switcherHeaderMenu.isMobileFlag = true;
            } else if (widthWindow <= widthFromMobile && switcherHeaderMenu.isMobileFlag){
                // add eventListener (click) for select of menu
                addEventListenerToElements(menuHeaderSelectAll, changeActive, "click");

                // remove eventListener (hover) for select of menu
                menuHeaderSelectAll.forEach((element, index) => {
                    element.removeEventListener("mouseenter", arrFunc[0]?.[index]);
                    element.removeEventListener("mouseleave", arrFunc[1]?.[index]);
                });             
                arrFunc = [[], []];
                switcherHeaderMenu.isDesktopFlag = true;
                switcherHeaderMenu.isMobileFlag = false;
            }
        }
    });

    function closeMenuMobile() {
        document.body.style.overflow = null;
        menuHeaderMobile.style.left = null;
        btnHeaderMobile.style.pointerEvents = null;
        btnHeaderMobile.classList.remove("active");
        btnHeaderMobile.setAttribute("aria-expanded", "false");

        menuHeaderSelectAll.forEach(element => {
            setAttr.call(element, "aria-expanded", "false");
        });

        menuHeaderSelectAll.forEach(element => {
            element.removeEventListener("click", changeActive);
        });
    }

}