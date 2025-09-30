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