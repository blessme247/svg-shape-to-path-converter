// TOAST.JS
//
const FADE_DUR = 500;
const DISPLAY_DUR = 3000;
let toastContain : HTMLDivElement | null = null 

export const toast = (message: string, extraClass: string = 'failure')=> {
  // 1. create global container for toast messages with class .toastContain
  if (!toastContain) {
    toastContain = document.createElement("div");
    toastContain.classList.add("toastContain");
    document.body.appendChild(toastContain);
  }

  // 2. append toast with classes .toast + extraClasses
  const EL = document.createElement("p");
  EL.classList.add("toast", extraClass );
  EL.innerText = message;
  toastContain.prepend(EL);

  // 3. transition the toast message
  setTimeout(() => EL.classList.add("open"), 10); // delay so transitions apply
  setTimeout(() => EL.classList.remove("open"), DISPLAY_DUR);
  setTimeout(() => toastContain?.removeChild(EL), DISPLAY_DUR + FADE_DUR);
}
