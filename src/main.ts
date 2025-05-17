import './style.css'
import './toast.css'


import { convertSvgShapesToPaths } from './functions/convert.ts'
import { copyToClipBoard } from './functions/copy.ts'
import { toggleDarkMode, toggleLightMode } from './functions/themeToggle.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container" >

  <div class="theme-toggle-wrapper">
  <div class="theme-toggle">
  <button class="dark" data-toggled="true">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
  <p>Dark</p>
  </button>

  <button class="light" data-toggled="false">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-moon-icon lucide-sun-moon"><path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/></svg>
  <p>Light</p>
  </button>
  </div>
  
  </div>
   
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
toggleDarkMode(document.querySelector<HTMLButtonElement>('.light')!)
toggleLightMode(document.querySelector<HTMLButtonElement>('.dark')!)
