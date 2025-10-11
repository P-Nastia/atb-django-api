from PIL import Image
import io
import uuid
from django.conf import settings
from django.core.files.base import ContentFile
import requests

def compress_image(image_file, size=(800, 800), quality=85):
    image = Image.open(image_file).convert("RGB")

    # Direct resize 
    image_resized = image.resize(size, Image.LANCZOS)

    # Unique filename
    uid = uuid.uuid4().hex[:10]
    filename = f"{uid}.webp"

    # Save to memory
    output = io.BytesIO()
    image_resized.save(output, format="WEBP", quality=quality)
    output.seek(0)

    return ContentFile(output.getvalue()), filename

def verify_recaptcha(token):
    secret_key = settings.RECAPTCHA_SECRET_KEY
    url = "https://www.google.com/recaptcha/api/siteverify"
    payload = {
        "secret": secret_key,
        "response": token
    }
    response = requests.post(url, data=payload)
    result = response.json()

    print(result)

    return result