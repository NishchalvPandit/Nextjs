# Next.js Learning Notes

## Topics Covered

### 1. What is Next.js?

* Next.js is a React framework used to build full-stack web applications.
* It provides features like routing, server-side rendering, API routes, optimization, and better performance.
* Built on top of React, making development faster and more structured.

---

### 2. SSR (Server-Side Rendering)

* SSR means HTML is generated on the server before being sent to the browser.
* Benefits:

  * Faster initial page load
  * Better SEO
  * Improved performance for dynamic content

---

### 3. Creating a Next.js Project

```bash
npx create-next-app@latest my-app
```

* `my-app` is the project name.
* Similar to Vite's project creation process.

---

### 4. App Router vs Pages Router

#### Pages Router

* Uses the `pages` folder.
* Older routing system.
* Limited layout management.

#### App Router

* Uses the `app` folder.
* Recommended for modern Next.js projects.
* Supports:

  * Nested layouts
  * Server Components
  * Loading UI
  * Error handling
  * Better folder organization

Example:

```bash
app/
 ├─ page.js
 ├─ layout.js
 ├─ loading.js
 └─ error.js
```

---

### 5. File-Based Routing

Routes are created automatically based on folder structure.

Example:

```bash
app/
 ├─ page.js          → /
 ├─ about/
 │   └─ page.js      → /about
 └─ contact/
     └─ page.js      → /contact
```

No need to configure routes manually.

---

### 6. Layouts

Used for shared UI across multiple pages.

Example:

```jsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
```

Benefits:

* Reusable Navbar
* Reusable Footer
* Consistent design

---

### 7. Important App Router Files

#### page.js

Creates a route/page.

#### layout.js

Shared UI between pages.

#### loading.js

Displays loading UI while content loads.

#### error.js

Displays custom error UI.

#### not-found.js

Displays custom 404 page.

#### route.js

Used for creating API endpoints.

---

### 8. Catch-All Routes

Example:

```bash
app/shop/[...slug]/page.js
```

Matches:

```bash
/shop/clothes
/shop/clothes/shirts
/shop/clothes/shirts/nike
```

The same page handles all these routes.

Example slug values:

```js
["clothes"]
["clothes", "shirts"]
["clothes", "shirts", "nike"]
```

---

### 9. Linting

Linting is the process of checking code for:

* Errors
* Bad practices
* Formatting issues

Popular tools:

* ESLint
* Biome

Benefits:

* Cleaner code
* Fewer bugs
* Consistent style

---

### 10. Next.js Development Server

Example output:

```bash
Local:   http://localhost:3000
Network: http://192.168.1.94:3000
```

#### Local

Accessible only on your own computer.

#### Network

Accessible by other devices on the same Wi-Fi network.

---

### 11. API Fetching Concepts

#### External API

Example:

* News API
* Weather API

Application fetches data from third-party services.

#### Backend API

Created by developers using:

* Node.js
* Express
* Django
* Laravel

Frontend communicates with backend APIs to retrieve or store data.

---

### 12. Project Idea Selected

#### News Website

Features:

* Display latest news
* Search news articles
* Category filtering
* Responsive design
* API integration

Concepts Practiced:

* App Router
* Routing
* Layouts
* API Fetching
* Components
* Loading States
* Error Handling

---

## Key Takeaways

* Next.js is a powerful React framework.
* App Router is the modern routing system.
* Routing is folder-based.
* Layouts make UI reusable.
* Loading and error states are built into the framework.
* APIs are essential for fetching dynamic data.
* Building projects is the best way to learn Next.js.


## Route Groups in Next.js

Route Groups allow developers to organize routes inside the `app` directory without affecting the URL structure. A route group is created by wrapping a folder name in parentheses.

### Syntax

```text
app/
├── (marketing)/
├── (dashboard)/
```

The folder names inside parentheses are ignored when generating URLs.

### Example

```text
app/
├── (marketing)/
│   ├── about/
│   │   └── page.jsx
│   └── contact/
│       └── page.jsx
│
├── (dashboard)/
│   ├── profile/
│   │   └── page.jsx
│   └── settings/
│       └── page.jsx
```

Generated URLs:

```text
/about
/contact
/profile
/settings
```

The route group names `(marketing)` and `(dashboard)` do not appear in the URL.

### Why Use Route Groups?

#### 1. Better Project Organization

Route groups help keep large applications organized by grouping related routes together.

```text
app/
├── (marketing)/
│   ├── about/
│   └── contact/
├── (store)/
│   ├── products/
│   ├── cart/
│   └── checkout/
```

#### 2. Different Layouts for Different Sections

Each route group can have its own layout.

```text
app/
├── (public)/
│   ├── layout.jsx
│   └── about/page.jsx
│
├── (dashboard)/
│   ├── layout.jsx
│   └── profile/page.jsx
```

This allows different parts of the application to share different navigation bars, sidebars, footers, or other UI components.

### Important Rule

Route groups cannot generate duplicate URLs.

```text
app/
├── (group1)/about/page.jsx
├── (group2)/about/page.jsx
```

Both routes would create:

```text
/about
```

This causes a routing conflict and Next.js will throw an error.

### Key Point

Route Groups are used for organization and layout management only. They help developers structure large applications while keeping URLs clean and user-friendly.


