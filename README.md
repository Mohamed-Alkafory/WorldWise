<div align="center">

# 🌍 WorldWise

### _"You travel the world. WorldWise keeps track of your adventures."_

[![React](https://img.shields.io/badge/React-18.2-%2361DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-4.4-%23646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-6.x-%23CA4245?style=for-the-badge&logo=reactrouter)](https://reactrouter.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-%23199900?style=for-the-badge&logo=leaflet)](https://leafletjs.com/)
[![JSON Server](https://img.shields.io/badge/JSON_Server-API-%23000?style=for-the-badge)](https://github.com/typicode/json-server)
[![Lazy Loading](https://img.shields.io/badge/Lazy_Loading-React.lazy%20%2B%20Suspense-%2361DAFB?style=for-the-badge&logo=react)](https://react.dev/reference/react/lazy)

**A travel tracker SPA that pins every city you've visited on a beautiful interactive world map.**  
Click a location → fill a quick form → your memory is saved forever. 🗺️

</div>

---

## 🚀 Quick Start

> **Two terminals required** — one for the API, one for React.

```bash
npm install          # 1. Install deps
npm run server       # 2. JSON Server → http://localhost:9000  (start FIRST)
npm run dev          # 3. React dev server → http://localhost:5173
```

**Login:** `jack@example.com` / `qwerty` (fake auth, hardcoded in `FakeAuthContext.jsx`)

---

## ✨ Features

|     | Feature           | Description                                                |
| --- | ----------------- | ---------------------------------------------------------- |
| 🗺️  | Interactive Map   | Leaflet + OpenStreetMap — scroll, zoom, click to add       |
| 📍  | Click-to-Add      | Click map → form pre-filled via reverse geocoding          |
| 🌐  | Reverse Geocoding | BigDataCloud API converts lat/lng → city & country         |
| 📅  | Date Picker       | `react-datepicker` to log exact visit dates                |
| 📝  | Personal Notes    | Write memories for each city                               |
| 🗑️  | Delete Cities     | One-click removal from list and database                   |
| 🌏  | Countries View    | Auto-derived unique countries from your city list          |
| 🔐  | Auth Protection   | `/app` dashboard gated — unauthenticated → redirected home |
| 📡  | Your Position     | "Get your position" centers map on real GPS coords         |
| ⚡  | Optimized State   | `useReducer` + `useCallback` for predictable re-renders    |
| 🚀  | Lazy Loading      | Pages code-split via `React.lazy()` + `Suspense`           |

---

## 🛠️ Tech Stack

| Tool                            | Version       | Role                                            |
| ------------------------------- | ------------- | ----------------------------------------------- |
| **React**                       | `18.2`        | Core UI — components, hooks, context            |
| **Vite**                        | `4.4`         | Dev server & production bundler                 |
| **React Router DOM**            | `6.x`         | Client-side routing, nested & protected routes  |
| **Leaflet** + **React-Leaflet** | `1.9` / `4.2` | Interactive map engine + React bindings         |
| **react-datepicker**            | `9.1`         | Date selection in the Add City form             |
| **JSON Server**                 | `1.0-beta`    | Fake REST API — reads/writes `data/cities.json` |

---

## 📁 Project Structure

```
worldwise/
├── index.html              # Vite entry point
├── vite.config.js          # Vite + React plugin config
├── data/cities.json        # JSON Server "database"
└── src/
    ├── main.jsx            # ReactDOM.createRoot entry
    ├── App.jsx             # Provider tree + lazy-loaded routes
    │
    ├── pages/              # Route-level components (all lazy-loaded)
    │   ├── Homepage.jsx    # Landing page with CTA
    │   ├── Product.jsx     # Static marketing page
    │   ├── Pricing.jsx     # Static pricing page
    │   ├── Login.jsx       # Login form → navigates to /app on success
    │   ├── AppLayout.jsx   # Dashboard shell: <Sidebar> + <Map>
    │   ├── ProtectedRoute.jsx  # Auth guard — redirects to / if not logged in
    │   └── Notfound.jsx    # 404 fallback for unmatched routes
    │
    ├── components/         # Reusable UI pieces
    │   ├── Map.jsx         # ★ Full-screen Leaflet map; ChangeCenter + DetectClick helpers
    │   ├── Sidebar.jsx     # Left panel: Logo → AppNav → <Outlet> → Footer
    │   ├── CityList.jsx    # City cards list with loading/empty states
    │   ├── CityItem.jsx    # Single city card — click to detail, × to delete
    │   ├── City.jsx        # Single city detail view (reads :id from URL)
    │   ├── CountryList.jsx # Unique countries derived from cities[]
    │   ├── Form.jsx        # ★ Add-city form; reverse geocodes URL lat/lng on mount
    │   ├── Button.jsx      # Generic button (type prop → "primary" | "back" | "position")
    │   ├── SpinnerFullPage.jsx  # Suspense fallback + data-loading indicator
    │   └── ...             # AppNav, PageNav, Logo, User, Flag, BackButton, Message, Footer
    │
    ├── contexts/
    │   ├── CitiesContext.jsx    # Cities CRUD state via useReducer; exposes useCities()
    │   └── FakeAuthContext.jsx  # Auth state via useReducer; exposes useAuth()
    │
    └── hooks/
        ├── useGeolocation.js   # Wraps navigator.geolocation → { isLoading, position, getPosition }
        └── useUrlPosition.js   # Reads ?lat=&lng= from URL → [lat, lng]
```

---

## 🧠 Architecture

### Provider Tree

```jsx
<AuthProvider>
  {" "}
  // isAuthenticated, user, login, logout
  <CitiesProvider>
    {" "}
    // cities[], isLoading, currentCity, CRUD actions
    <BrowserRouter>
      <Suspense fallback={<SpinnerFullPage />}>
        <Routes> ... </Routes>
      </Suspense>
    </BrowserRouter>
  </CitiesProvider>
</AuthProvider>
```

### Code Splitting & Lazy Loading

All six page components are dynamically imported — Vite emits a separate JS chunk per page:

```jsx
// Each page downloaded only when first navigated to
const Homepage = lazy(() => import("./pages/Homepage"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
// ... same for Product, Pricing, Login, Notfound
```

|                   | Before                  | After                            |
| ----------------- | ----------------------- | -------------------------------- |
| Initial download  | All pages in one bundle | Shell + current route only       |
| Page chunks       | None                    | One `.js` file per page          |
| Loading indicator | None                    | `<SpinnerFullPage>` via Suspense |

### Route Map

```
/             → <Homepage>        Public
/Product      → <Product>         Public
/Pricing      → <Pricing>         Public
/Login        → <Login>           Public
/app          → <ProtectedRoute> 🔒
  /app/cities         → <CityList>
  /app/cities/:id     → <City>
  /app/countries      → <CountryList>
  /app/form           → <Form>  (?lat=&lng= in URL)
*             → <Notfound>        404
```

### Click → Save Flow

```
Map click → DetectClick → navigate("/app/form?lat=…&lng=…")
  → Form mounts → useUrlPosition() reads coords
  → fetch BigDataCloud → auto-fills city + country
  → user picks date, adds note, submits
  → createCity() → POST localhost:9000/cities
  → navigate("/app/cities") → new marker + card appear
```

### State (`useReducer` actions)

**CitiesContext:** `loading` | `cities/loaded` | `city/loaded` | `city/created` | `city/deleted` | `rejected`  
**FakeAuthContext:** `login` → sets user + isAuthenticated | `logout` → clears both

---

## 🎣 Custom Hooks

| Hook               | Returns                                       | Used in               |
| ------------------ | --------------------------------------------- | --------------------- |
| `useGeolocation()` | `{ isLoading, position, error, getPosition }` | `Map.jsx`             |
| `useUrlPosition()` | `[lat, lng]` from `?lat=&lng=` query string   | `Form.jsx`, `Map.jsx` |

---

## 💾 City Data Shape

```json
{
  "cityName": "Lisbon",
  "country": "Portugal",
  "countryCode": "PT",
  "date": "2027-10-31T15:59:13.143Z",
  "notes": "My favorite city so far!",
  "position": { "lat": 38.73, "lng": -9.14 },
  "id": 73930385
}
```

---

## 🌐 External APIs

| Service       | URL                                                | When                        |
| ------------- | -------------------------------------------------- | --------------------------- |
| BigDataCloud  | `api.bigdatacloud.net/data/reverse-geocode-client` | Form mount (lat/lng in URL) |
| Flag CDN      | `flagcdn.com/24x18/{code}.png`                     | Every `<Flag>` render       |
| OpenStreetMap | `tile.openstreetmap.fr/hot/{z}/{x}/{y}.png`        | Leaflet tile layer          |
| JSON Server   | `localhost:9000/cities`                            | All city CRUD ops           |

---

## 📦 npm Scripts

```bash
npm run dev      # Vite dev server  → http://localhost:5173
npm run server   # JSON Server API  → http://localhost:9000
npm run build    # Production build → /dist
npm run preview  # Preview /dist locally
npm run lint     # ESLint (max 0 warnings)
```

---

## 🧩 Key Implementation Notes

- **Lazy loading** — Pages split at the route boundary; sub-components stay static (best perf/complexity trade-off). `<SpinnerFullPage>` is the Suspense fallback.
- **CSS Modules** — Every component has a `.module.css`. `.container` in one file never clashes with another.
- **`useCallback` on `getCity`** — Prevents infinite `useEffect` re-runs in `City.jsx` caused by changing function references.
- **`convertToEmoji(code)`** — Adds `127397` to each char code of the 2-letter ISO code to produce flag emoji. No library needed.
- **`ProtectedRoute`** — Uses `useEffect` + `useNavigate` (not `<Navigate>`) to avoid React render warnings on imperative navigation.
- **`getCity` cache check** — Skips fetch if `Number(id) === currentCity.id` is already loaded.

---

## 🔮 Roadmap

- [x] 🚀 ~~Code-split pages with `React.lazy()` + `Suspense`~~ ✅ Done
- [ ] 🔑 Real authentication (Supabase / Firebase / JWT)
- [ ] 👤 Per-user city lists
- [ ] 🔍 City search & filter
- [ ] 📊 Travel stats page
- [ ] 🌙 Dark / light theme toggle
- [ ] 📱 Mobile-responsive layout
- [ ] 🧪 Unit tests (Vitest + React Testing Library)

---

<div align="center">

**Built while learning React with Jonas Schmedtmann's Ultimate React Course**

_March 2026 · WorldWise v0.0.0_

</div>
