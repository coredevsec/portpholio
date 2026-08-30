## Korede Ogundana Portfolio

An interactive portfolio website for Korede Ogundana, featuring a responsive layout, CSS 3D interactions, project showcases, certificate pages, theme switching, and an EmailJS contact form.

Live website: <https://koredev.vercel.app>

## Features

- Responsive portfolio sections for About, Work, Experience, Skills, Credentials, and Contact
- Interactive 3D robot hero and tilt effects
- Dedicated certificate viewer pages for PNG and JPG certificates
- Project image, video, and external-link support
- Light and dark themes
- Contact form powered by EmailJS

## Tech stack

- React 19
- TypeScript
- Vite
- TanStack Router and TanStack Start
- Tailwind CSS
- EmailJS
- Zod

## Requirements

- Node.js 20 or newer
- npm

Check your versions:

```sh
node --version
npm --version
```

## Run locally

1. Open a terminal in the project folder.
2. Install dependencies:

	```sh
	npm install
	```

3. Create a `.env` file in the project root:

	```env
	VITE_EMAILJS_SERVICE_ID=your_service_id
	VITE_EMAILJS_TEMPLATE_ID=your_template_id
	VITE_EMAILJS_PUBLIC_KEY=your_public_key
	```

4. Start the development server:

	```sh
	npm run dev
	```

5. Open the local URL shown in the terminal.

## Useful commands

```sh
npm run dev       # Start the development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
npm run lint      # Check the code with ESLint
npm run format    # Format project files
```

## Update portfolio content

Most portfolio text and links are managed in [src/content/profile.ts](src/content/profile.ts).

### Add a project image

1. Add the image to `src/assets/`.
2. Import it in `src/content/profile.ts`:

	```ts
	import projectCover from "@/assets/my-project.jpg";
	```

3. Use it in the matching project:

	```ts
	media: {
	  image: projectCover,
	  alt: "Screenshot of my project",
	  caption: "Project demonstration",
	},
	```

### Add a certificate image

1. Add PNG or JPG files to `public/certificates/`.
2. Add their public paths to the certificate entry:

	```ts
	{
	  name: "Health, Safety and Environment (HSE Levels 1, 2 & 3)",
	  issuer: "Onshore and Offshore Safety Institute",
	  year: "2025",
	  slug: "hse-levels-1-2-3",
	  images: [
		 "/certificates/hse-level-1.jpg",
		 "/certificates/hse-level-2.jpg",
		 "/certificates/hse-level-3.jpg",
	  ],
	},
	```

	The **View certificate** button opens `/certificates/hse-levels-1-2-3` and displays all images on one page.

### Add a certificate PDF

Place the PDF in `public/`, then set its path with `href`:

```ts
href: "/my-certificate.pdf",
```

You can use both `images` and `href` on the same certificate. The image gallery opens on the dedicated page, while `href` provides an optional link to the original PDF.

## Environment variables on a hosting service

`.env` is for local development and should not be uploaded to GitHub. When deploying through a hosting provider, add these variables in that provider's project settings:

```text
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
```

The EmailJS public key is intended for browser use, but never put private service credentials, passwords, or API secrets in the frontend or in GitHub.

## Project structure

```text
src/
  assets/       Project images and imported media
  components/   Reusable UI and interactive components
  content/      Portfolio text, projects, credentials, and links
  routes/       Portfolio, message, logo, and certificate pages
public/
	certificates/ Public certificate images
```
