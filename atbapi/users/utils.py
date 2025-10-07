from PIL import Image
import io
import uuid
from django.core.files.base import ContentFile


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