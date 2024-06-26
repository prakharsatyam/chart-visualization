# Data Visualization Full Stack Application

This is a full-stack application designed to visualize data using D3.js. The application fetches data from a backend and displays it in both bar charts and pie charts. Users can select different metrics to visualize the data.

## Features

- Fetch data from a backend API
- Visualize data using bar charts and pie charts
- Select different metrics to visualize
- Interactive charts with tooltips and animations

## Technologies Used

### Frontend

- React.js
- D3.js
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB (or any other database)

## Getting Started

### Prerequisites

- Node.js (version 14.x or higher)
- npm or yarn
- MongoDB (if using MongoDB as your database)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/prakharsatyam/chart-visualization.git 
cd chart-visualization
```
2. frontend setup
```
cd client 
npm install
npm run dev 
```
3. backend setup
```
cd server
npm install
npm run dev
```
4. .env setup
```
PORT=4000
MONGODB_URI=your_mongodb_connection_string
```