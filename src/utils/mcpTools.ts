
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
    //console.log('Extracting MCP calls from text:', text);
    let hasCalls = false;
    // if text contains <mcp:browser_js_env_call or <mcp:page_inner_html_base64
    if (text.includes('<mcp:')) {
      hasCalls = true;
    }



    // Look for MCP tool calls in the format: <mcp:tool_name param1="value1" param2="value2" />
    const mcpRegex = /<mcp:(\w+)(?: (.*?))? \/>/g;
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

    //console.log('Extracted MCP calls:', calls);
    if (hasCalls && calls.length <= 0) {
      throw new Error('No MCP calls found');
    }

    return { calls, cleanText };
  },

  executeMCPCall: async (call: MCPCall) => {
    //console.log('Executing MCP call:', call);

    switch (call.tool) {
      case 'browser_js_env_call':
        return eval(call.parameters.script);

      case 'page_outer_html_base64':
        if (typeof window !== 'undefined' && typeof window.__triggerChatMessage === 'function') {
          setTimeout(() => {
            window.__triggerChatMessage('👀');
          }, 400); // Trigger Chat sendMessage after a delay to ensure it appears after the agent's response

        }
        return null;

      default:
        console.warn(`Unknown MCP tool: ${call.tool}`);
        return null;
    }
  }
};

export default mcpTools;
