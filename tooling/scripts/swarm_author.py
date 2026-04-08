import os
import aiohttp
import asyncio
import re
import json

CONTENT_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "content", "paths")
ENV_FILE = os.path.join(os.path.dirname(__file__), "..", "..", ".env")

def get_api_key():
    if not os.path.exists(ENV_FILE):
        return None
    with open(ENV_FILE, "r") as f:
        for line in f:
            if line.startswith("GOOGLE_API_KEY="):
                return line.strip().split("=", 1)[1].strip()
    return None

async def generate_lesson_content(session, key, file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    if "*TBD*" not in content:
        return

    # Extract metadata using regex
    title_match = re.search(r'title:\s*"([^"]+)"', content)
    deliverable_match = re.search(r'deliverable="([^"]+)"', content)
    preload_match = re.search(r'tutorPreload:\s*"([^"]+)"', content)

    title = title_match.group(1) if title_match else "Unknown Lesson"
    deliverable = deliverable_match.group(1) if deliverable_match else "Unknown"
    preload = preload_match.group(1) if preload_match else "Unknown"

    prompt = f"""You are authoring a lesson for CLI Academy. Your audience is beginners, so maintain an empathetic, safety-first tone.
Lesson Title: {title}
The user must accomplish this Deliverable: {deliverable}
The AI Tutor will be looking for this context: {preload}

Please write the "## Objective" and "## Walkthrough" sections for this lesson.
The Walkthrough should include step-by-step instructions. If teaching a command, explain why it's safe.
Return ONLY valid markdown starting with "## Objective". Do not wrap in ```markdown blocks. Do not include frontmatter or `<VerificationBlock>`. Keep it concise but effective (around 150-300 words).
"""

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={key}"
    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "systemInstruction": {"parts": [{"text": "You are a specialized course author for CLI Academy. You only output exactly what is requested."}]}
    }

    try:
        async with session.post(url, headers=headers, json=payload) as resp:
            resp.raise_for_status()
            data = await resp.json()
            generated_text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
            
            # Clean up potential markdown formatting code blocks if Gemini includes them
            if generated_text.startswith("```markdown"):
                generated_text = generated_text[11:]
            if generated_text.startswith("```"):
                generated_text = generated_text[3:]
            if generated_text.endswith("```"):
                generated_text = generated_text[:-3]
            generated_text = generated_text.strip()
            
            # Replace TBDs
            pattern = r"## Objective\s*\*TBD\*\s*## Walkthrough\s*\*TBD\*"
            new_content = re.sub(pattern, generated_text, content)
            
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"[SUCCESS] Authored: {title}")
    except Exception as e:
        print(f"[ERROR] Failed on {title}: {str(e)}")

async def main():
    key = get_api_key()
    if not key:
        print("Could not find GEMINI_API_KEY in .env")
        return

    print("Found Gemini API key. Gathering lessons...")
    tasks = []
    
    # We use a semaphore to limit concurrency
    sem = asyncio.Semaphore(5)

    async def sem_task(session, key, file_path):
        async with sem:
            await generate_lesson_content(session, key, file_path)

    async with aiohttp.ClientSession() as session:
        for root, _, files in os.walk(CONTENT_DIR):
            for file in files:
                if file.endswith(".mdx"):
                    path = os.path.join(root, file)
                    tasks.append(sem_task(session, key, path))
        
        print(f"Executing swarm of {len(tasks)} agents concurrently...")
        await asyncio.gather(*tasks)
        print("Swarm mission complete.")

if __name__ == "__main__":
    asyncio.run(main())
