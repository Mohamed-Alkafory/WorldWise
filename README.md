<div align="center">

# 🌍 WorldWise

### _"You travel the world. WorldWise keeps track of your adventures."_

[![React](https://img.shields.io/badge/React-18.2-%2361DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-4.4-%23646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-6.x-%23CA4245?style=for-the-badge&logo=reactrouter)](https://reactrouter.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-%23199900?style=for-the-badge&logo=leaflet)](https://leafletjs.com/)
[![JSON Server](https://img.shields.io/badge/JSON_Server-API-%23000?style=for-the-badge)](https://github.com/typicode/json-server)

**A travel tracker SPA that pins every city you've visited on a beautiful interactive world map.**  
Click a location → fill a quick form → your memory is saved forever. 🗺️

---

</div>

## 📖 What Is WorldWise?

WorldWise is a **React Single-Page Application** built as a learning project for mastering advanced React concepts. It lets you travel digitally — click anywhere on a real map, and the app reverse-geocodes your click to automatically identify the city and country. You add a visit date, write a personal note, and the city is persisted to a local JSON database via `json-server`.

The app features an **authentication flow**, a **sidebar with nested routes**, a **real interactive map** powered by Leaflet, and a **Context API + `useReducer`** global state architecture — all without any heavy external state management library like Redux.

---

## ✨ Features at a Glance

| Feature                  | Description                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| 🗺️ **Interactive Map**   | Powered by Leaflet + OpenStreetMap. Scroll, zoom, and click to explore                     |
| 📍 **Click-to-Add**      | Click any point on the map → opens the Add City form pre-filled with location data         |
| 🌐 **Reverse Geocoding** | BigDataCloud API converts lat/lng coordinates into real city & country names automatically |
| 📅 **Date Picker**       | Use `react-datepicker` to log the exact date you visited                                   |
| 📝 **Personal Notes**    | Write your memories and impressions for each city                                          |
| 🏳️ **Country Flags**     | Beautiful flag images auto-loaded from `flagcdn.com` based on country code                 |
| 📌 **Map Markers**       | Every saved city appears as a marker on the map with a popup                               |
| 🗑️ **Delete Cities**     | Remove any city from your list (and the database) with one click                           |
| 🌏 **Countries View**    | Auto-derived list of all unique countries you've visited                                   |
| 🔐 **Auth Protection**   | The entire `/app` dashboard is protected — unauthenticated users are bounced to home       |
| 📡 **Your Position**     | Hit "Get your position" to center the map on your real-world GPS coordinates               |
| ⚡ **Optimized State**   | `useReducer` + `useCallback` for lean, predictable, re-render-safe state management        |

---

## 🛠️ Tech Stack & Why

| Tool                 | Version    | Role in the App                                                      |
| -------------------- | ---------- | -------------------------------------------------------------------- |
| **React**            | `18.2`     | Core UI framework — components, hooks, context                       |
| **Vite**             | `4.4`      | Blazing-fast dev server & production bundler                         |
| **React Router DOM** | `6.x`      | Client-side routing, nested routes, protected routes                 |
| **Leaflet**          | `1.9`      | The underlying open-source map engine                                |
| **React-Leaflet**    | `4.2`      | React bindings for Leaflet (`MapContainer`, `Marker`, `Popup`, etc.) |
| **react-datepicker** | `9.1`      | Accessible date selection in the Add City form                       |
| **JSON Server**      | `1.0-beta` | Simulates a real REST API — reads/writes to `data/cities.json`       |
| **ESLint**           | `8.x`      | Linting with `react-hooks` and `react-refresh` plugins               |

---

## 🚀 Getting Started

> **You need TWO terminal windows running simultaneously** — one for the API, one for React.

### Step 1 — Install dependencies

```bash
npm install
```

### Step 2 — Start the fake REST API (run this FIRST!)

```bash
npm run server
```

This boots `json-server` on **`http://localhost:9000`** and watches `data/cities.json`.  
All city CRUD operations (`GET`, `POST`, `DELETE`) hit this local server.

### Step 3 — Start the React dev server

```bash
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

> ⚠️ **Important:** If you skip Step 2, the cities context will fail to fetch data and the sidebar will stay empty.

---

## 🔑 Login Credentials

The app uses **fake authentication** (no real backend). The credentials are hardcoded in `FakeAuthContext.jsx`:

```
Email:    jack@example.com
Password: qwerty
```

After login, you'll see an avatar and name ("Jack") displayed on the map, and the full `/app` dashboard becomes accessible.

---

## 📁 Project Structure — Every File Explained

This section is your cheat sheet. Come back here whenever you forget what something does.

```
worldwise/
│
├── 📄 index.html               # Vite HTML entry point. Imports /src/main.jsx
├── 📄 vite.config.js           # Vite setup — enables React plugin for JSX transform
├── 📄 package.json             # npm scripts, all dependencies declared here
├── 📄 .eslintrc.cjs/.json      # ESLint config for React hooks & refresh rules
├── 📄 .gitignore               # Excludes node_modules, dist, .env, etc from git
│
├── 📂 data/
│   └── 📄 cities.json          # The "database" — JSON Server reads & writes here.
│                               # Each city is a JSON object with name, country,
│                               # date, notes, position (lat/lng), and a random ID.
│
├── 📂 public/
│   └── (static assets served as-is by Vite — e.g. favicon)
│
└── 📂 src/                     # All React source code lives here
    │
    ├── 📄 main.jsx             # App entry — calls ReactDOM.createRoot().render(<App />)
    ├── 📄 App.jsx              # Root component. Sets up the full provider tree:
    │                           # AuthProvider → CitiesProvider → BrowserRouter → Routes
    ├── 📄 App.css              # Top-level styles for the overall app shell layout
    └── 📄 index.css            # Global CSS resets and base typography/color variables
    │
    ├── 📂 pages/               # Route-level page components (one per URL)
    │   │
    │   ├── 📄 Homepage.jsx         # The landing page. Shows the hero tagline
    │   │                           # "You travel the world..." with a Start Tracking CTA.
    │   │                           # Renders <PageNav> at the top.
    │   │
    │   ├── 📄 Product.jsx          # Static marketing page describing the product.
    │   │
    │   ├── 📄 Pricing.jsx          # Static marketing page with pricing info.
    │   │
    │   ├── 📄 Login.jsx            # Login form page. Reads email/password from state,
    │   │                           # calls login() from useAuth(). On success, navigates
    │   │                           # to /app. If already authenticated, auto-redirects.
    │   │
    │   ├── 📄 AppLayout.jsx        # The protected dashboard shell. Renders a two-column
    │   │                           # layout: <Sidebar> on the left, <Map> on the right.
    │   │                           # <Outlet> inside Sidebar swaps city/country/form views.
    │   │
    │   ├── 📄 ProtectedRoute.jsx   # HOC wrapper. Checks isAuthenticated from useAuth().
    │   │                           # If false → useEffect fires navigate("/").
    │   │                           # If true → renders children normally.
    │   │
    │   ├── 📄 PageNotFound.jsx     # Simple wrapper that renders <Notfound>.
    │   └── 📄 Notfound.jsx         # The 404 UI — shown for any unknown route ("*").
    │
    ├── 📂 components/          # Reusable building blocks used across pages
    │   │
    │   ├── 📄 Map.jsx              # ★ CORE COMPONENT ★
    │   │                           # Renders the full-screen Leaflet map. Displays a
    │   │                           # <Marker> for every saved city with a <Popup> showing
    │   │                           # the flag + city name. Contains two internal helper
    │   │                           # components:
    │   │                           #   • ChangeCenter — calls map.setView() when position changes
    │   │                           #   • DetectClick  — listens for map clicks and navigates
    │   │                           #                    to /app/form?lat=...&lng=...
    │   │                           # Also shows the "Get your position" button (uses useGeolocation).
    │   │
    │   ├── 📄 Sidebar.jsx          # The left panel of the dashboard. Contains:
    │   │                           # <Logo> → <AppNav> → <Outlet> (nested route content) → <Footer>
    │   │
    │   ├── 📄 AppNav.jsx           # Tab-style navigation inside the sidebar.
    │   │                           # Two links: "Cities" (/app/cities) and "Countries" (/app/countries).
    │   │                           # Uses <NavLink> for active styling.
    │   │
    │   ├── 📄 CityList.jsx         # Reads cities from useCities(). Shows <SpinnerFullPage>
    │   │                           # while loading. Shows <Message> if list is empty.
    │   │                           # Maps cities to <CityItem> cards.
    │   │
    │   ├── 📄 Cityitem.jsx         # A single city card in the list.
    │   │                           # Displays: flag, city name, formatted visit date.
    │   │                           # Clicking the card navigates to /app/cities/:id.
    │   │                           # Has a delete button (×) that calls deleteCity(id).
    │   │
    │   ├── 📄 City.jsx             # Detailed view of ONE city. Reads the :id param
    │   │                           # from the URL, calls getCity(id) on mount.
    │   │                           # Shows: city name, visit date, notes, country flag,
    │   │                           # and a <BackButton>.
    │   │
    │   ├── 📄 CountryList.jsx      # Derives a unique country list from the cities array
    │   │                           # by filtering duplicates. Maps to <CountryItem> cards.
    │   │                           # Shares the same loading/empty-state logic as CityList.
    │   │
    │   ├── 📄 CountryItem.jsx      # A single country card. Shows the flag and country name.
    │   │
    │   ├── 📄 Form.jsx             # ★ CORE COMPONENT ★
    │   │                           # The "add city" form. Reads lat/lng from URL via
    │   │                           # useUrlPosition(). On mount, fires a fetch to BigDataCloud
    │   │                           # reverse geocode API to get city + country name.
    │   │                           # Fields: City name, Date (DatePicker), Notes.
    │   │                           # On submit → calls createCity() → navigates to /app/cities.
    │   │                           # Also exports convertToEmoji(countryCode) utility.
    │   │
    │   ├── 📄 Flag.jsx             # Renders a country flag <img> sourced from flagcdn.com.
    │   │                           # Props: countryCode (2-letter ISO), countryName (for alt text).
    │   │
    │   ├── 📄 Button.jsx           # Generic styled button. The `type` prop picks the CSS variant:
    │   │                           #   "primary" = green CTA, "back" = grey, "position" = green outline
    │   │
    │   ├── 📄 BackButton.jsx       # Thin wrapper around <Button type="back">.
    │   │                           # Calls useNavigate(-1) on click to go back one step.
    │   │
    │   ├── 📄 PageNav.jsx          # Top navigation bar for PUBLIC pages (Homepage, Product, Pricing).
    │   │                           # Contains <Logo> + nav links + a Login button.
    │   │
    │   ├── 📄 Logo.jsx             # The WorldWise logo. Wrapped in a <Link to="/">.
    │   │
    │   ├── 📄 User.jsx             # Shown in the map area when logged in.
    │   │                           # Displays user avatar (pravatar.cc), name, and a Logout button
    │   │                           # that calls logout() from useAuth().
    │   │
    │   ├── 📄 Spinner.jsx          # A small inline CSS animation spinner. Used inside panels.
    │   ├── 📄 SpinnerFullPage.jsx  # Centers <Spinner> to fill the entire viewport.
    │   │                           # Used while the initial cities list is being fetched.
    │   │
    │   ├── 📄 Message.jsx          # Simple centered paragraph for status messages.
    │   │                           # Used for: "Click on the map", "No cities yet", errors, etc.
    │   └── 📄 Footer.jsx           # Bottom of the sidebar. Shows a copyright year.
    │
    ├── 📂 contexts/            # React Context API — global state without Redux
    │   │
    │   ├── 📄 CitiesContext.jsx    # Manages ALL city data for the app.
    │   │                           # Uses useReducer for precise, testable state transitions.
    │   │                           # Fetches the initial city list from JSON Server on mount.
    │   │                           # Exposes: cities, isLoading, currentCity, getCity,
    │   │                           #           createCity, deleteCity via useCities() hook.
    │   │
    │   └── 📄 FakeAuthContext.jsx  # Manages user authentication state.
    │                               # Stores: user object, isAuthenticated flag.
    │                               # Exposes: login(email, password), logout() via useAuth() hook.
    │                               # The FAKE_USER constant holds the hardcoded test credentials.
    │
    └── 📂 hooks/               # Custom reusable hooks extracted for clean separation
        │
        ├── 📄 useGeolocation.js    # Wraps navigator.geolocation.getCurrentPosition().
        │                           # Returns: { isLoading, position: {lat, lng}, error, getPosition }
        │                           # getPosition() triggers the browser's location prompt.
        │
        └── 📄 useUrlPosition.js    # Reads `?lat=...&lng=...` from the current URL's query string.
                                    # Uses useSearchParams() from react-router.
                                    # Returns: [lat, lng] as a simple array.
```

---

## 🧠 Architecture Deep Dive

### The Provider Tree

The entire app is wrapped in nested providers that make global state available everywhere without prop drilling:

```jsx
// App.jsx
<AuthProvider>           // ← Authentication state (isAuthenticated, user, login, logout)
  <CitiesProvider>       // ← Cities CRUD state (cities[], isLoading, currentCity, getCity, ...)
    <BrowserRouter>
      <Routes> ...       // ← All routes defined here
    </BrowserRouter>
  </CitiesProvider>
</AuthProvider>
```

---

### State Management with `useReducer`

Both contexts use `useReducer` instead of `useState` for complex, multi-field state that changes in coordinated ways.

#### `CitiesContext` — Reducer Actions

```
Dispatch: { type: "loading" }         → isLoading = true
Dispatch: { type: "cities/loaded" }   → isLoading = false, cities = payload
Dispatch: { type: "city/loaded" }     → isLoading = false, currentCity = payload
Dispatch: { type: "city/created" }    → isLoading = false, cities = [...cities, payload], currentCity = payload
Dispatch: { type: "city/deleted" }    → isLoading = false, cities filtered, currentCity = {}
Dispatch: { type: "rejected" }        → isLoading = false, error = payload
```

#### `FakeAuthContext` — Reducer Actions

```
Dispatch: { type: "login",  payload: FAKE_USER } → user = FAKE_USER, isAuthenticated = true
Dispatch: { type: "logout" }                     → user = null,      isAuthenticated = false
```

---

### Route Map

```
/                    → <Homepage>          Public — landing page
/Product             → <Product>           Public — product info
/Pricing             → <Pricing>           Public — pricing info
/Login               → <Login>            Public — login form

/app  ───────────── → <ProtectedRoute>    🔒 Auth check gates everything below
  │                     └─ <AppLayout>    Dashboard shell (Sidebar + Map)
  │
  ├── /app           → redirect to /app/cities  (index route)
  ├── /app/cities    → <CityList>         List of all logged cities
  ├── /app/cities/:id→ <City>             Single city detail (fetched by ID)
  ├── /app/countries → <CountryList>      Unique countries derived from cities
  └── /app/form      → <Form>             Add-city form (?lat=...&lng=... in URL)

*                    → <Notfound>          404 for any unmatched path
```

---

### The Full "Click → Save" Flow

This is the magic interaction at the heart of WorldWise:

```
1. User opens /app  →  AppLayout renders: <Sidebar> on left, <Map> on right

2. User clicks a point on the Leaflet map
   └── DetectClick (inside Map.jsx) catches the click event
   └── navigate(`/app/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)

3. Form.jsx mounts at /app/form
   └── useUrlPosition() reads lat & lng from the URL query string

4. useEffect in Form fires a fetch to:
   https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=...&longitude=...
   └── Response → setCityName(data.city), setCountry(data.countryName), setCountryCode(...)

5. Form is now pre-filled: city name, country, flag emoji shown

6. User picks a date (react-datepicker), types a note, clicks "Add"
   └── handleSubmit() calls createCity({ cityName, country, countryCode, date, notes, position })

7. CitiesContext.createCity():
   └── dispatch({ type: "loading" })
   └── POST to http://localhost:9000/cities  (JSON Server)
   └── dispatch({ type: "city/created", payload: savedCity })

8. navigate("/app/cities")
   └── New city appears in the CityList sidebar
   └── A new Marker appears on the map
```

---

## 🎣 Custom Hooks Reference

### `useGeolocation(defaultPosition?)`

Located in `src/hooks/useGeolocation.js`

Abstracts away the verbose browser geolocation API. Simply call `getPosition()` and react to the returned state:

```js
const { isLoading, position, error, getPosition } = useGeolocation();
// position → { lat: 51.505, lng: -0.09 }
```

**Used in:** `Map.jsx` — triggers when user clicks "Get your position".

---

### `useUrlPosition()`

Located in `src/hooks/useUrlPosition.js`

Pulls coordinates directly from the URL query string. This is how the Form knows where the user clicked on the map — no props, no global state, just the URL.

```js
const [lat, lng] = useUrlPosition();
// e.g. URL is /app/form?lat=48.85&lng=2.35
// → lat = "48.85", lng = "2.35"
```

**Used in:** `Form.jsx` and `Map.jsx`.

---

## 💾 City Data Shape

Every city in `data/cities.json` looks like this:

```json
{
  "cityName": "Lisbon",
  "country": "Portugal",
  "countryCode": "PT",
  "date": "2027-10-31T15:59:13.143Z",
  "notes": "My favorite city so far!",
  "position": {
    "lat": 38.727881642324326,
    "lng": -9.140900099907554
  },
  "id": 73930385
}
```

> JSON Server auto-assigns the `id` on POST. The file acts as the full persistent database.

---

## 🌐 External APIs & Services

| Service                    | URL                                                | When it's called                                   |
| -------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| **BigDataCloud Geocoding** | `api.bigdatacloud.net/data/reverse-geocode-client` | Every time the Form mounts with lat/lng in the URL |
| **Flag CDN**               | `flagcdn.com/24x18/{code}.png`                     | Inside every `<Flag>` component render             |
| **OpenStreetMap (HOT)**    | `tile.openstreetmap.fr/hot/{z}/{x}/{y}.png`        | Continuously as the Leaflet map tile layer         |
| **JSON Server (local)**    | `localhost:9000/cities`                            | All city fetch, create, and delete operations      |

---

## 📦 npm Scripts

```bash
npm run dev       # Vite dev server → http://localhost:5173  (HMR enabled)
npm run server    # JSON Server API → http://localhost:9000  (watches cities.json)
npm run build     # Production bundle → /dist folder
npm run preview   # Serve the /dist build locally to test production output
npm run lint      # ESLint check across all .js/.jsx files (max 0 warnings)
```

---

## 🧩 Implementation Notes Worth Remembering

- **CSS Modules everywhere** — Every component has a paired `.module.css` file. Class names are locally scoped, so `.container` in `City.module.css` never clashes with `.container` elsewhere.

- **`useCallback` on `getCity`** — Without `useCallback`, a new function reference would be created every render, causing the `useEffect` in `City.jsx` (which depends on `getCity`) to re-run infinitely.

- **`convertToEmoji(countryCode)`** — Exported from `Form.jsx`. Uses a Unicode math trick: adds `127397` to each character code of the 2-letter country code (e.g., `PT`) to produce the regional indicator symbols that form a flag emoji (🇵🇹). Pure, no external library needed.

- **`ProtectedRoute` is imperative** — It uses `useEffect` + `useNavigate` to redirect rather than a declarative `<Navigate>` component. This avoids a React render warning when navigation happens outside router events.

- **`currentCity` optimization in `getCity`** — Before fetching, `getCity` checks `if (Number(id) === currentCity.id) return;`. This prevents a redundant API call if you click a city already loaded.

---

## 🔮 Ideas for Future Development

- [ ] 🔑 Replace fake auth with a real backend (Supabase, Firebase Auth, or custom JWT)
- [ ] 👤 User-specific city lists — currently all users share the same `cities.json`
- [ ] 🔍 City search & filter in the sidebar
- [ ] 🗂️ Sort cities by date, name, or country
- [ ] 📊 Travel stats page — total countries, most visited region, etc.
- [ ] 🌙 Dark / light theme toggle
- [ ] 📱 Mobile-responsive layout (the current layout is desktop-first)
- [ ] 🧪 Unit tests with Vitest + React Testing Library
- [ ] 🗺️ Custom map marker icons per country

---

<div align="center">

**Built while learning React with Jonas Schmedtmann's Ultimate React Course**

_March 2026 · WorldWise v0.0.0_

</div>
