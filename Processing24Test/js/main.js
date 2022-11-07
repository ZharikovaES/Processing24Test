import { header } from "./header.js";
import { fuelDelivery } from "./fuel-delivery.js";

function ready() {
    const inputsTel = document.querySelectorAll("input[type=tel]");

    const maskPhone = "+7 (999) 999-99-99";

    // dynamic adaptive
    new DynamicAdapt("max").init();

    // validation for inputs with type=tel
    const maskTel = new Inputmask(maskPhone);
    maskTel.mask(inputsTel);
    
    // header
    header();

    //fuel-delivery
    fuelDelivery();
}

window.addEventListener("load", () => {
    document.body.classList.remove("preload");
});

document.addEventListener("DOMContentLoaded", ready);

