export function changeActive() {
    toggleAttr.call(this, "aria-expanded");
    this.classList.toggle("active");
}
export function toggleAttr(ariaName){
    if (this.getAttribute(ariaName) === "true")
        this.setAttribute(ariaName, "false");
    else this.setAttribute(ariaName, "true");
}
export function setAttr(ariaName, value){
    this.setAttribute(ariaName, value);
}
export function addEventListenerToElements(elements, func, event, ...args) {
    const arrFunc = [];
    if (elements?.length) {
        elements.forEach((element, index) => {
            arrFunc[index] = func.bind(element, ...args);
            element.addEventListener(event, arrFunc[index]);
        });
    }
    return arrFunc;
}

