# Idan Homepage — Build Artifacts

## Local Development

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:5173`

## Build

```bash
npm run build
npm run preview
```

The production build will be in the `dist/` directory.

## Deploy

### Vercel

1. Push the project to a Git repository
2. Connect your repository to Vercel
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Ensure `public/assets` folder is included in the build

### Netlify

1. Push the project to a Git repository
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## Assets

Place hero images in `public/assets/`:
- `hero_2560x1440.jpg` (or .png)
- `hero_1920x1080.jpg` (optional, for smaller screens)
- `noise.png` (optional, for texture overlay)

## Notes

- The site uses React 18 with Vite
- Styling is done with Tailwind CSS
- CV data is loaded from `src/data/cv_parsed.json`
- Make sure to update the CV data after running the extraction script

