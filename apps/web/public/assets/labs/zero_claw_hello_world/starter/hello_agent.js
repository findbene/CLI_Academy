import { ZeroClaw } from '@openclaw/zeroclaw';

async function run() {
  console.log("🤖 Booting ZeroClaw...");

  const agent = new ZeroClaw({
    model: 'claude-3-haiku-20240307',
    system: "You are a friendly, enthusiastic agent welcoming a user to CLI Academy."
  });

  const response = await agent.prompt("Say a short hello and introduce yourself!");
  
  console.log("\nAgent says:");
  console.log(response.text);
}

run().catch(console.error);
