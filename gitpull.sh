# gitpush.sh
echo "Pulling from remote"
echo "git add ."
git add .
echo "git add -u"
git add -u
message="Pulling at $(date)"
echo "git commit -m ${message}"
git commit -m "${message}"
echo "git pull --rebase master"
git pull --rebase origin master
echo "git pull complete"