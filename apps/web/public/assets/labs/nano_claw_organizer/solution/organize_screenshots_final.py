import os
import shutil
import time

# --- Lab: NanoClaw Micro-Tasker (SOLUTION) ---
# This is the final working file you build at the end of the lab.

DESKTOP_PATH = os.path.expanduser("~/Desktop")
ORGANIZE_FOLDER = os.path.join(DESKTOP_PATH, "AI_Organized_Screenshots")

def init_nano_agent():
    print("🤖 NanoClaw Agent Initialized. Scanning Desktop...")
    
    if not os.path.exists(ORGANIZE_FOLDER):
        os.makedirs(ORGANIZE_FOLDER)
        print(f"[NanoClaw] Created new directory: {ORGANIZE_FOLDER}")

    count = 0
    for filename in os.listdir(DESKTOP_PATH):
        if filename.startswith("Screenshot") and filename.endswith(".png"):
            source = os.path.join(DESKTOP_PATH, filename)
            destination = os.path.join(ORGANIZE_FOLDER, filename)
            
            # Agent action
            shutil.move(source, destination)
            count += 1
            print(f"[NanoClaw] Task Complete: Moved {filename}")
            time.sleep(0.1) # Simulate agent cognitive delay

    print(f"🏁 Swarm Complete! Organized {count} items.")

if __name__ == "__main__":
    init_nano_agent()
