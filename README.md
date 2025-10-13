# Simple django api
## Activate venv
```
py -m venv .venv
.venv\Scripts\activate.bat
python.exe -m pip install --upgrade pip

py -m pip install django

django-admin startproject atbapi

cd atbapi
py manage.py runserver 8099
```

## Install Postgres
```
pip install psycopg2-binary
py manage.py migrate
```

## Create user api
```
py manage.py startapp users

pip install djangorestframework
pip install markdown
pip install django-filter 

py manage.py startapp api
```
## Install requirements
```
pip install -r requirements.txt
```
## Install react vite
```
npm create vite@latest
```
## Install CORS
```
pip install django-cors-headers
```

## Adding google authentication
```
pip install google-auth
```