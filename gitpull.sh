# gitpush.sh
echo "Pulling to remote"
echo "git add ."
git add .
echo "git add -u"
git add -u
message="Pulling at $(date)"
echo "git commit -m ${message}"
git commit -m "${message}"
echo "git push origin master --force"
git pull --rebase
echo "git pull complete"