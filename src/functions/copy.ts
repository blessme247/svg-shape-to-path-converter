import { toast } from "./toast";

export const copyToClipBoard = (element: SVGElement) => {

    element.addEventListener('click', () => {
        const pathArea = document.querySelector<HTMLTextAreaElement>('#svg-copy')!
        element.setAttribute("data-copied", "true")
        pathArea.select();
        navigator.clipboard.writeText(pathArea.value);
        toast("Copied", "success")

        setTimeout(()=>{
            element.setAttribute("data-copied", "false")
            // unselect the text area
            pathArea.selectionStart = 0
            pathArea.selectionEnd = 0
            // pathArea.blur()
        }, 600)
    });
}