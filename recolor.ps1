Get-ChildItem -Path "." -Recurse -Include "*.js" | Where-Object { $_.FullName -notmatch "node_modules" } | ForEach-Object {
    $c = [System.IO.File]::ReadAllText($_.FullName, [System.Text.Encoding]::UTF8)
    $c = $c -replace '#0f1117','#080a0f'
    $c = $c -replace '#1a1d27','#111318'
    $c = $c -replace '#2d3148','#1e2235'
    $c = $c -replace '#12151f','#0a0c10'
    $c = $c -replace '#1f2340','#131628'
    $c = $c -replace '#161928','#0d0f16'
    [System.IO.File]::WriteAllText($_.FullName, $c, [System.Text.Encoding]::UTF8)
}
Write-Host "Done"
