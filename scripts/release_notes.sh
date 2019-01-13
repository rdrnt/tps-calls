releaseNotesFile=release_notes.md

currentTag="$(git describe --abbrev=0 --tags)"

echo "# $currentTag\n\n$(cat $releaseNotesFile)" > $releaseNotesFile

vim release_notes.md