import { ZeroClaw } from '@openclaw/zeroclaw';
import fs from 'fs';
import path from 'path';

async function run() {
  console.log("🤖 Booting File Agent ZeroClaw...");

  const agent = new ZeroClaw({
    model: 'claude-3-haiku-20240307',
    system: "You are a helpful assistant that can list files in a directory.",
    tools: [
      {
        name: 'list_files',
        description: 'Lists files in the provided directory path.',
        parameters: {
          type: 'object',
          properties: {
            directory_path: {
              type: 'string',
              description: 'The path of the directory to explore.'
            }
          },
          required: ['directory_path']
        },
        execute: async (args) => {
          try {
            const files = fs.readdirSync(path.resolve(args.directory_path));
            return {
              status: "success",
              files: files
            };
          } catch (e) {
            return { status: "error", message: e.message };
          }
        }
      }
    ]
  });

  const response = await agent.prompt("List the files in the current directory ('.').");
  
  console.log("\nAgent Response:");
  console.log(response.text);
}

run().catch(console.error);
