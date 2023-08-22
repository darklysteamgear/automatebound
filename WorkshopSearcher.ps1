# =============================================================================
# Generate MOD ID list from a Steam Mod Collection URL
# Created by Archimedez
# Last Modified 2020-01-31
# Version 1.1
# Usage:
# 1) Create a file named: ModIDlist.ps1
# 2) Paste this code into the file
# 3) Edit the $WorkshopCollectionURL value between the '', replacing it with the URL of your mod collection
# 4) Optional: Edit the $ModList value between the '', replacing it with the path of your choice
# 5) Right-Click the file (ModIDlist.ps1), and Click Run With PowerShell
# =============================================================================
# Configurable Options Below
# =============================================================================

# Set the URL of your MOD Collection
$WorkshopCollectionURL = 'http://steamcommunity.com/sharedfiles/filedetails/?id=1696861640'

# Set Output Path and Filename of text file which will contain the MOD ID list
# Note: The MOD ID list will also be displayed on screen
$ModList = 'D:\EvilPenguinServer\mods_list.txt'
$ModDesc = 'D:\EvilPenguinServer\mods_desc.txt'
# Shouldn't need this, but if you do or need to add additional keys/values, its here....
$headers = @{"Host" = "steamcommunity.com"}

# =============================================================================
# Change Nothing Below
# =============================================================================
CLS
$getPageRaw = Invoke-WebRequest -Uri $WorkshopCollectionURL -UseBasicParsing
$CollectionPage = New-Object -Com "HTMLFile"
try {
    # This works in PowerShell with Office installed
    $CollectionPage.IHTMLDocument2_write($getPageRaw.RawContent)
}
catch {
    # This works when Office is not installed    
    $src = [System.Text.Encoding]::Unicode.GetBytes($getPageRaw.RawContent)
    $CollectionPage.write($src)
}
$ModURLprefix = 'https://steamcommunity.com/sharedfiles/filedetails/?id='
$MODIDs = (($CollectionPage.Links | Where-Object {$_.innerHTML -like "*workshopItemTitle*"} ).href | Where-Object {$_ -like "$ModURLprefix*"} ).replace("$ModURLprefix","")
$DESC = ($CollectionPage.Links | Where-Object {$_.innerHTML -like "*workshopItemTitle*"} ).innerText
If (Test-Path -Path $ModList) {del $ModList}
$MODIDs | Out-File -FilePath $ModList
$DESC | Out-File -FilePath $ModDesc
Write-Host "Your MOD ID list is below, and in a file at: $ModList"
$MODIDs
Write-Host "Your MOD DESCRIPTION list is below, and in a file at: $ModDesc"
$DESC