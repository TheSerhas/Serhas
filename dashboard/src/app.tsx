import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashHistory, createRouter } from '@tanstack/react-router'
import '@serhas/features/i18n'
import './globals.css'

import { routeTree } from './routeTree.gen'

const hashHistory = createHashHistory()

const router = createRouter({ routeTree, history: hashHistory })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const originalFetch = window.fetch;

window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    let url = typeof input === "string" ? input : input.toString();

    if (!url.startsWith("http://") && !url.startsWith("https://") && !url.startsWith("/api") && !url.startsWith("/locales") && !url.startsWith("/static")) {
        url = "/api" + (url.startsWith("/") ? url : `/${url}`);
    }

    return originalFetch(url, init);
};

const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>,
    )
}
