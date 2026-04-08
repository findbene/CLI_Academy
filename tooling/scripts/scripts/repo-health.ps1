param()

$ErrorActionPreference = "Stop"

$requiredFiles = @(
  "README.md",
  "CLAUDE.md",
  "TASKS.md",
  "DECISIONS.md",
  ".env.example",
  "docs/ZERO_TO_CLAUDE_MASTER_BLUEPRINT.md",
  "docs/PRD.md",
  "docs/TRD.md",
  "docs/AGENT_SWARM.md",
  "docs/LAUNCH_PLAN.md",
  ".agents/product-marketing-context.md"
)

$requiredDirs = @(
  "app",
  "backend",
  "agents",
  "content",
  "infrastructure",
  "docs",
  "scripts",
  ".agents"
)

$excludeNames = @(
  "blueprint_v2_extracted.txt",
  "blueprint_v2_full_extracted.txt"
)

$missing = @()

foreach ($dir in $requiredDirs) {
  if (-not (Test-Path -LiteralPath $dir)) {
    $missing += "Missing directory: $dir"
  }
}

foreach ($file in $requiredFiles) {
  if (-not (Test-Path -LiteralPath $file)) {
    $missing += "Missing file: $file"
  }
}

$todoCount = 0
Get-ChildItem -Recurse -File | Where-Object { $excludeNames -notcontains $_.Name } | ForEach-Object {
  $matches = Select-String -Path $_.FullName -Pattern "TODO|FIXME|HACK" -SimpleMatch:$false -ErrorAction SilentlyContinue
  if ($matches) {
    $todoCount += $matches.Count
  }
}

Write-Host "CLI Academy repo health"
Write-Host ""

if ($missing.Count -gt 0) {
  Write-Host "Missing items:" -ForegroundColor Yellow
  $missing | ForEach-Object { Write-Host " - $_" }
} else {
  Write-Host "All required docs and directories are present." -ForegroundColor Green
}

Write-Host ""
Write-Host "TODO/FIXME/HACK count: $todoCount"

if ($missing.Count -gt 0) {
  exit 1
}
