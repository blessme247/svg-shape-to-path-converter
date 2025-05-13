import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'
// import heart from './heart.svg'
import { convertSvgShapesToPaths } from './convert.ts'
import { copyToClipBoard } from './copy.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
   
    <h1>SVG Shape to Path Converter</h1>

    <section class="convert-wrapper" >
    <textarea id="svg-paste" placeholder="Paste your SVG code here"></textarea>

    <div class="svg-preview-wrapper" data-preview="false" >

    <div class="textarea-wrapper">
    <textarea id="svg-copy" placeholder="Your path will appear here" readonly>
    </textarea>
    <svg class="copy" data-copied="false" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-icon lucide-copy"> <path class="check" d="m12 15 2 2 4-4" pathLength="1"/> <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
    </div>

    </div>
    
    <div class="card">
      <button id="convert" type="button">Convert</button>
    </div>
    </section>
    <p class="read-the-docs">
      Built with <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#646cffaa" stroke="#646cffaa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> by <a href="https://github.com/blessme247" target="_blank" rel="noopener">Blessme</a>
    </p>
  </div>
`

convertSvgShapesToPaths(document.querySelector<HTMLButtonElement>('#convert')!)
copyToClipBoard(document.querySelector<SVGElement>('.copy')!)
