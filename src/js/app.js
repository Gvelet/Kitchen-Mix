import weather from "./modules/weather.js"
import modals from "./modules/modelCards.js"
import tabs from "./modules/tabs.js";
import form from "./modules/forms.js";


window.addEventListener('DOMContentLoaded', () => {
    weather();
    modals();
    tabs();
    form();
})