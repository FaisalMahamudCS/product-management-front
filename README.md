## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploying Your Next.js App

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

#### Steps to Deploy on Vercel

1. **Sign Up / Login**: Go to [Vercel](https://vercel.com) and sign up for an account or log in if you already have one.
2. **Import Project**: Click on the "New Project" button and import your Next.js project from your Git repository.
3. **Configure Project**: Follow the prompts to configure your project. Vercel will automatically detect that you are using Next.js.
4. **Deploy**: Click "Deploy" and wait for the deployment process to complete. Once done, you will get a live URL for your project.

For more details, check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

### Deploy on Netlify

You can also deploy your Next.js app on Netlify.

#### Steps to Deploy on Netlify

1. **Sign Up / Login**: Go to [Netlify](https://www.netlify.com) and sign up for an account or log in if you already have one.
2. **New Site from Git**: Click on "New site from Git" and connect your Git repository.
3. **Build Settings**: Configure the build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.next`
4. **Deploy**: Click "Deploy site" and wait for the deployment process to complete. Once done, you will get a live URL for your project.

For more details, check out the [Netlify Next.js documentation](https://docs.netlify.com/configure-builds/common-configurations/next-js/).

### Deploy on AWS Amplify

1. **Sign Up / Login**: Go to [AWS Amplify](https://aws.amazon.com/amplify/) and sign up for an account or log in if you already have one.
2. **Connect App**: Click on "Get Started" under "Deploy" and connect your Git repository.
3. **Build Settings**: Amplify will automatically detect your build settings. If not, configure the build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.next`
4. **Deploy**: Click "Save and Deploy" and wait for the deployment process to complete. Once done, you will get a live URL for your project.

### Deploy on GitHub Pages

1. **Build Project**: Run the build command to generate the static files:
   ```bash
   npm run build
   ```
2. **Install GitHub Pages**: Install the `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   ```
3. **Add Deploy Script**: Add the following script to your `package.json`:
   ```json
   "scripts": {
     "deploy": "gh-pages -d out"
   }
   ```
4. **Deploy**: Run the deploy script:
   ```bash
   npm run deploy
   ```

For more details, check out the [GitHub Pages documentation](https://docs.github.com/en/pages).

## Running Your Next.js App with Docker

You can also run your Next.js app using Docker.

### Dockerfile

Create a `Dockerfile` in the root of your project with the following content:

```Dockerfile
# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
```

### Building and Running the Docker Image

To build and run the Docker image, follow these steps:

1. **Build the Docker Image**: Run the following command in the directory containing the Dockerfile:

   ```sh
   docker build -t ecommerce-frontend .
   ```

   This command builds the Docker image and tags it as `my-nextjs-app`.

2. **Run the Docker Container**: Run the following command to start a container from the Docker image:

   ```sh
   docker run -p 3000:3000 my-nextjs-app
   ```

   This command runs the Docker container and maps port 3000 on your host to port 3000 in the container.

3. **Access the Application**: Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see your Next.js application running in the Docker container.

## Feedback and Contributions

Your feedback and contributions are welcome! Feel free to open issues and pull requests on the [GitHub repository](https://github.com/vercel/next.js).