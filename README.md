# truechem Membership Site

Member access portal for truechem - featuring full navigation, smooth page transitions, and cohesive branding with truechem.io.

## Features

- **Landing Page**: Hero with "Recovery & Performance" headline, benefits grid, truechem standard, pricing toggle, FAQ
- **Signup Flow**: Two-column form with plan selection and order summary
- **Welcome Page**: Confirmation with next steps
- **Dashboard**: Product catalog, quick links, newsletter preview
- **Account Settings**: Profile, membership management, payment method
- **COA Library**: Batch lookup and certificate downloads
- **Resources**: Newsletter archive and educational guides
- **Legal Pages**: Terms, Privacy, Contact

## Design System

- **Fonts**: Inter (headlines), JetBrains Mono (body/UI)
- **Colors**: Black (#000) background, zinc accents, green-500 for active states
- **Logo**: SVG vial icon with "truechem" wordmark (bold "true" + regular "chem")

## Tech Stack

- Next.js 14
- React 18
- Tailwind CSS
- Lucide React icons

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deploy to Vercel

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
gh repo create truechem-membership --public --push
```

2. Import to Vercel:
   - Go to vercel.com/new
   - Import the GitHub repository
   - Deploy (auto-detected as Next.js)

## Project Structure

```
├── pages/
│   ├── _app.js          # App wrapper
│   └── index.js         # All pages (client-side routing)
├── styles/
│   └── globals.css      # Tailwind + custom styles
├── public/
│   ├── logo-icon.png    # Dark vial icon
│   └── logo-icon-white.png # White vial icon
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── README.md
```

## Brand Alignment

This membership site matches truechem.io branding:
- Same Inter font for headlines
- Same JetBrains Mono for technical text
- Same vial icon logo
- Same "true" bold + "chem" regular wordmark style
- Inverted color scheme (dark background for exclusive membership feel)

---

© 2025 truechem
