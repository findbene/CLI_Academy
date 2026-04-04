import os

ROOT_DIR = r"c:\CLI-Academy"
IGNORE_DIRS = {".git", ".next", "node_modules", "logs", "tmp", "__pycache__", "browser"}
IGNORE_EXTS = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".svg", ".lock"}

REPLACEMENTS = [
    ("CLI Academy", "CLI Academy"),
    ("cli academy", "cli academy"),
    ("CLI Academy", "CLI Academy"),
    ("cliacademy.app", "cliacademy.app"),
    ("CLI-Academy", "CLI-Academy"),
    ("CLI Academy", "CLI Academy"),
    ("cli-academy", "cli-academy")
]

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return

    new_content = content
    for old_str, new_str in REPLACEMENTS:
        new_content = new_content.replace(old_str, new_str)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk(ROOT_DIR):
    dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
    for file in files:
        if any(file.endswith(ext) for ext in IGNORE_EXTS):
            continue
        process_file(os.path.join(root, file))

print("Done")
