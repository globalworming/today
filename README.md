> [!TIP]
> The password is not here.. or if it is then only by coincidence

# globalworming.today

A minimalistic single-page application for password authentication with integrated chat support.

## Features

- **Password Authentication**: Simple form with placeholder `/login` endpoint
- **Chat Support**: Integrated customer support chat with Gemini AI
- **Language Toggle**: Switch between German and English or any other language

## Chat Integration

The chat system includes:

- Automatic welcome message and problem reporting
- Integration with Gemini Flash API
- local MCP to call (what could go wrong)
- Rate limiting and error handling
- Language-aware responses

## Deployment

This application is designed to be hosted as a GitHub Page:

1. Build the application: `npm run build`
2. Deploy the `dist` folder to GitHub Pages
3. Configure any necessary redirects for the `/login` endpoint

## Development

```bash
npm install
npm run dev
```
