import './style/main.sass'
import $ from 'jquery'
import 'slick-carousel'
import 'animate.css'
import WOW from 'wow.js'

window.jQuery = $
window.$ = $

new WOW().init()
windowsHandler()


function windowsHandler() {
    const windows = document.body.querySelectorAll('[data-window-id]')
    const buttonsOpen = document.body.querySelectorAll('[data-open-window]')
    const buttonsClose = document.body.querySelectorAll('[data-close-window]')

    for (const button of buttonsOpen) {
        button.addEventListener('click', () => {
            const targetWindowID = button.getAttribute('data-open-window')
            const window = getWindowByID(targetWindowID)
            if (!window) return
            window.classList.add('show')
            document.body.style.overflow = 'hidden'
        })
    }

    for (const button of buttonsClose) {
        button.addEventListener('click', () => {
            const targetWindowID = button.getAttribute('data-close-window')
            const window = getWindowByID(targetWindowID)
            if (!window) return
            window.classList.remove('show')
            document.body.style.overflow = ''
        })
    }

    function getWindowByID(id) {
        for (const window of windows) {
            const windowID = window.getAttribute('data-window-id')
            if (!windowID || windowID !== id) continue
            return window
        }
    }
}
