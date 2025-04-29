# AI Mood Journal

![AI Mood Journal](https://github.com/G1anpierre/NextJS-AI-langchain/raw/main/public/mood-journal-preview.png)

An intelligent journaling application built with Next.js 13, Langchain, and OpenAI that analyzes your mood and provides personalized insights.

## Features

- **AI-Powered Mood Analysis**: Automatically detects and tracks your mood based on journal entries
- **Personalized Insights**: Receives AI-generated feedback and recommendations
- **Mood Tracking**: Visualizes mood trends over time with beautiful charts
- **Journal History**: Easy access to past entries and analyses
- **User Authentication**: Secure login with NextAuth.js
- **Responsive Design**: Beautiful UI that works on all devices

## Tech Stack

- **Framework**: Next.js 13 with App Router and Server Components
- **AI Integration**: Langchain for AI orchestration, OpenAI for language processing
- **Database**: Prisma ORM with PostgreSQL
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Visualizations**: Chart.js for mood tracking graphs
- **Deployment**: Vercel

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/G1anpierre/NextJS-AI-langchain.git
   cd NextJS-AI-langchain
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```
   DATABASE_URL=your_postgresql_connection_string
   OPENAI_API_KEY=your_openai_api_key
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works

1. **Journal Entry**: Users write about their day in the journal interface
2. **AI Analysis**: Langchain processes the entry using OpenAI to analyze sentiment and mood
3. **Insight Generation**: The AI generates personalized insights and recommendations
4. **Visualization**: Mood data is stored and visualized in trend charts
5. **History**: All entries and analyses are saved for future reference

## Project Structure

- `/app`: Next.js App Router components and pages
- `/components`: Reusable UI components
- `/lib`: Utility functions and Langchain setup
- `/prisma`: Database schema and migrations
- `/public`: Static assets
- `/styles`: Global CSS and Tailwind configuration

## AI Workflow

The application uses a sophisticated AI pipeline:

1. **Text Processing**: Cleans and preprocesses journal entries
2. **Sentiment Analysis**: Determines the emotional tone of the writing
3. **Entity Extraction**: Identifies key events, people, and themes
4. **Pattern Recognition**: Tracks recurring themes across multiple entries
5. **Recommendation Engine**: Generates personalized suggestions based on mood patterns

## Deployment

The application is deployed on Vercel with the following configuration:

1. **PostgreSQL Database**: Managed by Vercel Postgres
2. **Environment Variables**: Securely stored in Vercel
3. **CI/CD**: Automatic deployments on commits to main branch

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.