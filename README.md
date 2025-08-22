# TopUpKu (Split Files) – Vite + React + Tailwind

## Run locally
```bash
npm install
npm run dev
# or pnpm/yarn
```

## Build for production (static)
```bash
npm run build
npm run preview  # test the /dist locally
```

## Deploy options

### 1) Vercel
- New Project → Import from Git or drag & drop folder
- Framework: **Vite**
- Build Command: `vite build` (auto)
- Output Directory: `dist`
- Node: 18+

### 2) Netlify
- New site from Git
- Build Command: `vite build`
- Publish Directory: `dist`
- Node: 18+

### 3) Static hosting (cPanel/Nginx/Apache)
- Jalankan `npm run build`
- Upload seluruh isi folder **dist/** ke public_html (atau root server)
