# Fix log

Everything below was broken (wouldn't run / crashed / built for the wrong OS) and has been fixed and tested. node_modules was removed from this archive — run `npm install` where noted before running anything.

## Setup
- `fsdworkshop-cse-16-460/`: your installed packages had **Windows-only native binaries** (rolldown/lightningcss compiled for `win32-x64-msvc`), so `npm run dev`/`build` would fail on Linux/Mac. Run `npm install` fresh in that folder on whatever machine you're using — npm will fetch binaries for your actual OS.
- Project root (`/`): run `npm install` here too — it now installs `express` and `dotenv` (dotenv was imported by `lab5/expressserver.js` but was never listed as a dependency).

## backend/Lab1/index.js
- File used `require()` but `package.json` declares `"type": "module"` (ESM) — `require` doesn't exist in ESM. Switched to `import`.
- `console.log('${course} started')` used single quotes, so it printed the literal text instead of interpolating — changed to backticks.

## backend/Lab1/server.js
- `/sys` route referenced `SYSDATA`, which was never defined — added the missing object.

## backend/Lab1/httpserver.js
- Delete route: `url.startsWith("/delete/" && method=="DELETE")` puts the `&&` *inside* `startsWith(...)`, which is not what that method takes — fixed to `url.startsWith("/delete/") && method=="DELETE"`.

## backend/Lab1/domEvents.js
- Two `console.log('...${...}...')` calls used single quotes instead of backticks, so interpolation never happened — fixed.

## backend/Lab1/filedemo.js
- `fs.writefile` / `fs.readfile` — wrong case; the real methods are `writeFile` / `readFile`.
- The second `catch` block had no parameter or body at all (`} catch \n}`), which is a syntax error that crashed the whole file — fixed.
- `createfile`/`readfile` were defined but never called — added a `main()` that actually runs them.

## backend/Lab1/assignment1/index.js + data.json
- Same `require`-under-ESM issue as above — switched to `import`.
- `data.json` on disk was invalid JSON (`[]{"name":"Dhruv","age":20}`, two values with no wrapping array) — fixed to a valid seed array.
- `createFile()`, `read()`, and `update()` were all fired at once with no sequencing, so their file writes/reads raced each other on the same file and could corrupt it (`JSON.parse` would randomly throw on a half-written file). Chained them (create → read → update) so each finishes before the next starts.
- `update()` used `fs.appendFile` to append a raw object after the array, which produces invalid JSON (`[...]{...}`) — changed to push into the in-memory array and rewrite the whole file.

## backend/Lab1/assignment2/assign.js
- Same `require`-under-ESM issue — switched to `import`.
- `req.url.startswith(...)` — should be `startsWith` (capital S); as written it threw a `TypeError` on any request that reached that check.
- Added a final `else` 404 handler so unmatched routes get a response instead of the connection hanging forever.

## backend/Lab1/lab5/expressserver.js
- `import cars from "cars"` — unused, and no such package exists/is installed; this alone made the file fail to load. Removed.
- The `userData` array was missing commas between objects — a syntax error.
- `app.get("/user", ...)` had a `try` block with no `catch` (also a syntax error), and it never sent a response. Fixed to `res.json(userData)` with a proper `catch`.
- `app.listen(3000, ...)` ignored the `port` variable it had already computed from `process.env.PORT` — now uses `port`.

## fsdworkshop-cse-16-460/src/components/Home.jsx
- Unused `import React from 'react'` (not needed with the React 19 JSX runtime) was failing `npm run lint` — removed.

## Verified
- Frontend: `npm run build`, `npm run lint`, and `npm run dev` (served and responded on `:5000`) all pass clean.
- Every backend script was run directly; every server was started and hit with `curl` against each of its routes (including error/404 paths) to confirm real responses.
