
interface MCPCall {
  tool: string;
  parameters: Record<string, any>;
}

interface MCPToolsHandler {
  extractMCPCalls: (text: string) => { calls: MCPCall[], cleanText: string };
  executeMCPCall: (call: MCPCall) => Promise<any>;
}

const mcpTools: MCPToolsHandler = {
  extractMCPCalls: (text: string) => {
    console.log('Extracting MCP calls from text:', text);
    let hasCalls = false;
    // if text contains <mcp:browser_js_env_call or <mcp:page_inner_html_base64
    if (text.includes('<mcp:browser_js_env_call') || text.includes('<mcp:page_inner_html_base64')) {
      hasCalls = true;
    }



    // Look for MCP tool calls in the format: <mcp:tool_name param1="value1" param2="value2" />
    const mcpRegex = /<mcp:(\w+)([^>]*)\/>/g;
    const calls: MCPCall[] = [];
    let cleanText = text;

    let match;
    while ((match = mcpRegex.exec(text)) !== null) {
      const toolName = match[1];
      const paramString = match[2];

      // Parse parameters from the attribute string
      const parameters: Record<string, any> = {};
      // Using a regex with the 's' flag to handle multi-line parameter values
      const paramRegex = /(\w+)="([\s\S]*?)"/g;
      let paramMatch;
      while ((paramMatch = paramRegex.exec(paramString)) !== null) {
        parameters[paramMatch[1]] = paramMatch[2];
      }

      calls.push({
        tool: toolName,
        parameters
      });

      // Remove the MCP call from the text
      cleanText = cleanText.replace(match[0], '🏗️').trim();
    }

    console.log('Extracted MCP calls:', calls);
    if (hasCalls && calls.length <= 0) {
      throw new Error('No MCP calls found');
    }

    return { calls, cleanText };
  },

  executeMCPCall: async (call: MCPCall) => {
    console.log('Executing MCP call:', call);

    /**
    tools:
      - name: browser_js_env_call
        description: Runs code in the browser's JavaScript environment.
        parameters:
          type: object
          properties:
            script:
              type: string
              description: The JavaScript code to run in the browser's environment.
              required: true
          required:
            - script
    
      - name: page_inner_html_base64
        description: Returns the inner HTML of the current page as a base64 encoded string.
        parameters:
          type: object
          properties: {}
          required: []
     */
    switch (call.tool) {
      case 'browser_js_env_call':
        return eval(call.parameters.script);

      case 'page_inner_html_base64':
        // FIXME trigger Chat sendMessage, that will automatically use the latest base64 page in the request
        return null;

      default:
        console.warn(`Unknown MCP tool: ${call.tool}`);
        return null;
    }
  }
};

const handlePageTranslation = async (params: Record<string, any>) => {
  const { language } = params;
  console.log(`Translating page to: ${language}`);

  // In a real implementation, this would trigger actual page translation
  // For now, we'll just log the action
  return { success: true, language };
};

const handleUIUpdate = async (params: Record<string, any>) => {
  const { element, property, value } = params;
  console.log(`Updating UI element ${element}, property ${property} to ${value}`);

  // In a real implementation, this would update UI elements
  return { success: true, element, property, value };
};

const handleDataFetch = async (params: Record<string, any>) => {
  const { url, method = 'GET' } = params;
  console.log(`Fetching data from: ${url} using ${method}`);

  try {
    const response = await fetch(url, { method });
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Data fetch failed:', error);
    return { success: false, error: (error as Error).message };
  }
};

export default mcpTools;
