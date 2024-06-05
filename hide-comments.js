'use strict'

let done_comments = false
let done_chat = false

const observer = new MutationObserver((mutations, observer) => {
    for (const mutation of mutations) {
        if (mutation.type !== 'childList') continue

        // Hide comments
        if (!done_comments) {
            const e = document.getElementById('comments')
            if (e) {
                e.style.display = 'none'
                done_comments = true
            }
        }

        // Hide live streaming chat
        if (!done_chat) {
            const e = document.getElementById('chat')
            if (e) {
                if (!e.hasAttribute('collapsed')) {
                    e.dispatchEvent(new Event('yt-toggle-button'))
                    e.style.display = 'none'
                    done_chat = true
                }
            }
        }
        
        if (done_comments && done_chat) {
            observer.disconnect()
            break
        }
    }
})

observer.observe(document.body, { subtree: true, childList: true })
setTimeout(() => observer.disconnect(), 10 * 1000)

