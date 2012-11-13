# gitpush.sh
echo "Pushing to remote"
echo "git add ."
git add .
echo "git add -u"
git add -u
message="Updated at $(date)"
echo "git commit -m ${message}"
git commit -m "${message}"
echo "git push origin master --force"
git push origin master --force
echo "git push complete"