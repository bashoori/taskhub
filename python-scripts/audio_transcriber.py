# tools/audio-transcriber/transcriber.py

# pip install openai-whisper ffmpeg-python

import whisper

model = whisper.load_model("base")
audio_path = "onlinebiz.mp3"  # you’ll upload this file into the same folder

print("Transcribing audio... please wait.")
result = model.transcribe(audio_path, language='en')

with open("transcription.txt", "w", encoding="utf-8") as f:
    f.write(result["text"])

print("\n✅ Transcription complete! Saved as transcription.txt")
