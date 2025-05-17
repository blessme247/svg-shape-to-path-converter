export function toggleLightMode(button: HTMLButtonElement) {

    const lightModeBtn = document.querySelector<HTMLButtonElement>('.light')!
    const body = document.querySelector<HTMLBodyElement>('body')!

    button.addEventListener("click", () => {

        button.setAttribute("data-toggled", "false")
        lightModeBtn.setAttribute("data-toggled", "true")
        body.setAttribute("data-theme", "light")
    })

}

export function toggleDarkMode(button: HTMLButtonElement) {

    const darkModeBtn = document.querySelector<HTMLButtonElement>('.dark')!
    const body = document.querySelector<HTMLBodyElement>('body')!

    button.addEventListener("click", () => {

        button.setAttribute("data-toggled", "false")
        darkModeBtn.setAttribute("data-toggled", "true")
        body.setAttribute("data-theme", "dark")
    })

}