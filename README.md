
# globalworming.today

A minimalistic single-page application for password authentication with integrated chat support.

## Features

- **Password Authentication**: Simple form with placeholder `/login` endpoint
- **Error Handling**: URL query parameter based error display
- **Chat Support**: Integrated customer support chat with Gemini AI
- **Language Toggle**: Switch between German and English
- **Responsive Design**: Mobile-friendly interface

## Error Codes

The application handles these error query parameters:

- `invalid_password` - Invalid password error
- `rate_limit_exceeded` - Too many login attempts  
- `unknown_error` - Generic error message

Example: `/?error=invalid_password`

## Chat Integration

The chat system includes:

- Automatic welcome message and problem reporting
- Integration with Gemini Flash API
- MCP (Model Context Protocol) support placeholder
- Rate limiting and error handling
- Language-aware responses

## Language Support

- German (default): `de`
- English: `en`

Language switching sends automatic messages to the chat agent to request translation.

## Testing

Gherkin feature files are included in the `/features` directory covering:

- Password form functionality
- Hint link behavior  
- Chat interactions
- Language toggle features

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

## Production Configuration

For production deployment:

1. Replace the mock Gemini API call with actual API integration
2. Implement the MCP processing logic
3. Set up proper error handling and logging
4. Configure the `/login` endpoint backend

```
