echo "Seting up Heroku for backend deployment"
echo "Logging into Heroku"
heroku login

echo "web: cd project_404_T5 && gunicorn project_404_T5.wsgi" >> Procfile

cd ../
cd backend
git init
heroku  create --buildpack heroku/python
echo "Checking for the remote if it was properly built"
git remote -v
git add  -A
git commit -m "Initial commit for heroku"
git push heroku master

cd ../
cd frontend
echo "web: node server.js" >> Procfile
git init
heroku create --buildpack heroku/nodejs
git remote -v
git add -A
git commit -m "Initial frontend commit for heroku"
git push heroku master

