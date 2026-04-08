const fs = require('fs');
const path = require('path');

const blueprintPath = 'run_parse.md';

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function parseBlueprint(content) {
  const lines = content.split('\n');
  
  let currentPath = null;
  let currentChapter = null;
  let currentLesson = null;
  
  const paths = [];

  // Very naive parser
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('### Path ')) {
      const match = line.match(/### Path (\d+)\.\s+(.*)/);
      if (match) {
        currentPath = {
          number: parseInt(match[1]),
          title: match[2].trim(),
          chapters: [],
          slug: `${match[1].padStart(2, '0')}-${slugify(match[2].split(':')[0])}`
        };
        paths.push(currentPath);
        currentChapter = null;
        currentLesson = null;
      }
    } else if (line.startsWith('#### Chapter ')) {
      if (!currentPath) continue;
      const match = line.match(/#### Chapter ([\d\.]+) — (.*)/);
      if (match) {
        currentChapter = {
          number: match[1],
          title: match[2].trim(),
          lessons: [],
          slug: `chapter-${match[1].replace(/\./g, '-')}-${slugify(match[2])}`
        };
        currentPath.chapters.push(currentChapter);
        currentLesson = null;
      }
    } else if (line.startsWith('**Lesson ')) {
      if (!currentChapter) continue;
      const match = line.match(/\*\*Lesson ([\d\.]+) — (.*)\*\*/);
      if (match) {
        currentLesson = {
          number: match[1],
          title: match[2],
          slug: `lesson-${match[1].replace(/\./g, '-')}-${slugify(match[2])}`,
          deliverable: '',
          touches: '',
          media: '',
          verify: '',
          pitfalls: '',
          tutorPreload: ''
        };
        currentChapter.lessons.push(currentLesson);
      }
    } else if (currentLesson && line.startsWith('- **')) {
      if (line.includes('Deliverable:**')) currentLesson.deliverable = line.split('Deliverable:**')[1].trim();
      else if (line.includes('Touches:**')) currentLesson.touches = line.split('Touches:**')[1].trim();
      else if (line.includes('Media required:**')) currentLesson.media = line.split('Media required:**')[1].trim();
      else if (line.includes('Verify:**')) currentLesson.verify = line.split('Verify:**')[1].trim();
      else if (line.includes('Common pitfalls / troubleshooting:**')) currentLesson.pitfalls = line.split('Common pitfalls / troubleshooting:**')[1].trim();
      else if (line.includes('Tutor preload:**')) currentLesson.tutorPreload = line.split('Tutor preload:**')[1].trim();
    }
  }

  return paths;
}

const blueprintText = fs.readFileSync('C:/Users/findb/Downloads/cli_academy_curriculum_blueprint (1).md', 'utf-8');
const parsed = parseBlueprint(blueprintText);

// Auto-generate directories and mdx
const outDir = path.join(__dirname, '..', 'content', 'paths_new');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, {recursive: true});
}

let fileCount = 0;

for (const p of parsed) {
  const pathDir = path.join(outDir, p.slug);
  if (!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir, {recursive: true});
  }
  
  for (const c of p.chapters) {
    const chapterDir = path.join(pathDir, c.slug);
    if (!fs.existsSync(chapterDir)) {
      fs.mkdirSync(chapterDir, {recursive: true});
    }

    for (const l of c.lessons) {
      const mdxPath = path.join(chapterDir, l.slug + '.mdx');
      const content = `---
title: "${l.title}"
lessonNumber: "${l.number}"
chapterNumber: "${c.number}"
pathNumber: "${p.number}"
tutorPreload: "${l.tutorPreload.replace(/"/g, '\\"')}"
verifyType: "terminal_output"
---

# ${l.title}

## Objective
*TBD*

## Walkthrough
*TBD*

<VerificationBlock 
  deliverable="${l.deliverable.replace(/"/g, '\\"')}"
  verifyCheck="${l.verify.replace(/"/g, '\\"')}"
/>
`;
      fs.writeFileSync(mdxPath, content, 'utf-8');
      fileCount++;
    }
  }
}

console.log(`Generated ${parsed.length} paths and ${fileCount} lessons.`);
