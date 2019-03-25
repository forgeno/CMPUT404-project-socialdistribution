cd ../

cd backend
git add -A
git commit -a -m "Redeploying Back End to Heroku"
git push heroku master

cd ../
cd frontend
git add -A
git commit -a -m "Redeploying Front End to Heroku"
git push heroku master


