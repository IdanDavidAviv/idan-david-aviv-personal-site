# Personal Website Build Plan

This project contains the build artifacts and tools for creating Idan David-Aviv's personal homepage.

## Project Structure

```
.
├── tools/              # Python scripts for CV extraction
├── data/               # Extracted CV data and symbol mappings
├── prompts/            # Image generation prompts
├── website/            # React + Tailwind website project
└── logs/               # Build logs and execution history
```

## Quick Start

### 1. Extract CV Data

If you have a CV DOCX file:

```bash
pip install python-docx dateparser
python tools/extract_cv.py "path/to/Idan CV.docx" data/cv_parsed.json
```

### 2. Generate Hero Images

Use the prompts in `prompts/image_prompts.json` with your preferred image generation API (DALL·E, Stable Diffusion, Midjourney, etc.).

Required images:
- `hero_2560x1440.jpg` - Main hero image
- `hero_1920x1080.jpg` - Fallback for smaller screens
- `wallpaper_3840x2160.webp` - High-res wallpaper (optional)

Place generated images in `website/public/assets/`

### 3. Run the Website

```bash
cd website
npm install
npm run dev
```

### 4. Build for Production

```bash
cd website
npm run build
```

## Image Generation Instructions

If you don't have access to an image generation API, use the prompts in `prompts/image_prompts.json` with:

- **DALL·E**: Use the full prompt description
- **Stable Diffusion**: Use the description + symbols + constraints
- **Midjourney**: Format as `/imagine prompt: [description] [symbols] [constraints]`

## Image Composition

If you have Image A (original) and Image B (generated with symbols), use ImageMagick:

```bash
convert ImageA.png ImageB.png -compose Screen -composite -colorspace RGB -modulate 100,100,100 -sharpen 0x0.5 hero_out.png
```

Or use Photoshop/GIMP with:
- Image B as overlay layer
- Blend mode: Screen or Linear Dodge
- Preserve path from Image A using masks

## Deployment

See `website/README.md` for detailed deployment instructions.

## Status

- ✅ Project structure created
- ✅ CV extraction script ready
- ✅ Website framework built
- ⏳ Awaiting CV DOCX file for extraction
- ⏳ Awaiting hero image generation
- ⏳ Awaiting Image A for composition

