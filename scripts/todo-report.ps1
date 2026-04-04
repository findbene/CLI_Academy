param()

$ErrorActionPreference = "Stop"

$excludeNames = @(
  "blueprint_v2_extracted.txt",
  "blueprint_v2_full_extracted.txt"
)

$results = Get-ChildItem -Recurse -File | Where-Object { $excludeNames -notcontains $_.Name } | ForEach-Object {
  Select-String -Path $_.FullName -Pattern "TODO|FIXME|HACK" -SimpleMatch:$false -ErrorAction SilentlyContinue
}

if (-not $results) {
  Write-Host "No TODO/FIXME/HACK markers found."
  exit 0
}

$results |
  Select-Object Path, LineNumber, Line |
  Format-Table -AutoSize
