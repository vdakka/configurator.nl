# /public/fonts

Place the licensed Mont font files here:

- `Mont-Regular.woff2`
- `Mont-Bold.woff2`
- `Mont-Black.woff2`

Then update `app/globals.css` to declare `@font-face` rules pointing at these files. Until that's done, the site falls back to Google Fonts Montserrat (loaded via `next/font/google` in `app/layout.tsx`), which is visually close.
