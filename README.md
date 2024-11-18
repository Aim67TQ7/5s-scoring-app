# 5S Scoring Application

A mobile-friendly application for conducting 5S workplace organization assessments using photo analysis powered by the Anthropic API.

## Overview

This application helps organizations implement and maintain 5S workplace organization principles by:
- Capturing and analyzing workplace photos
- Providing automated scoring based on 5S principles
- Generating detailed reports and improvement suggestions
- Tracking progress over time

## Features

- 📱 Mobile-friendly interface
- 📸 Photo capture and analysis
- 🤖 AI-powered assessment using Anthropic API
- 📊 Scoring and reporting
- 📈 Progress tracking
- 🔄 Historical comparisons

## Tech Stack

- Frontend: React + TypeScript + Vite
- Styling: TailwindCSS
- Backend: Node.js
- Database: PostgreSQL
- AI: Anthropic API for image analysis

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd 5s-scoring-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with the following variables:
   ```
   DATABASE_URL=your_database_url
   ANTHROPIC_API_KEY=your_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
