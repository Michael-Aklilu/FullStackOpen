sequenceDiagram
participant browser
participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: 302 Redirect(URL)
    deactivate server

    browser->>server: GET  https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the Javascript file
    deactivate server

    browser->>server: GET
    https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [
    {
        "content": "oops",
        "date": "2024-10-14T20:13:31.584Z"
    },
    {
        "content": "keep going you're doing great",
        "date": "2024-10-14T20:16:07.752Z"
    },...]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
