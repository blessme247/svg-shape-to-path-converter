export const copyToClipBoard = (element: SVGElement) => {

    element.addEventListener('click', () => {
        const pathArea = document.querySelector<HTMLTextAreaElement>('#path')!
        element.setAttribute("data-copied", "true")
        pathArea.select();
        navigator.clipboard.writeText(pathArea.value);

        setTimeout(()=>{
            element.setAttribute("data-copied", "false")
            // unselect the text area
            pathArea.selectionStart = 0
            pathArea.selectionEnd = 0
            // pathArea.blur()
        }, 600)
    });
}