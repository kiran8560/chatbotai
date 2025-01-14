import openai  # Make sure openai is imported
import time
import pyttsx3  # Converts text output to voice
import speech_recognition as sr  # Converts voice commands to text
import webbrowser

from apikey import api_data

Model = "gpt-3.5-turbo"  # or use "gpt-4" if you have access
openai.api_key = api_data  # Set your API key

def Reply(question):
    try:
        completion = openai.Completion.create(  # Using the correct method for version >= 1.0.0
            model=Model,  # Use the model defined earlier
            prompt=question,
            max_tokens=200
        )
        answer = completion['choices'][0]['text']  # Adjusted to match response structure
        return answer
    except openai.error.RateLimitError as e:  # Handle rate limit error correctly
        print(f"Rate limit exceeded. Retrying in 30 seconds...")
        time.sleep(30)  # Retry after 30 seconds
        return Reply(question)  # Recursively retry 
    except Exception as e:
        print(f"An error occurred: {e}")
        return "Sorry, I encountered an error."

# Text to speech
engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[0].id)

def speak(text):
    engine.say(text)
    engine.runAndWait()

def takeCommand():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print('Listening .......')
        r.pause_threshold = 1  # Wait for 1 second before considering the end of a phrase
        audio = r.listen(source)
    try:
        print('Recognizing ....')
        query = r.recognize_google(audio, language='en-in')
        print(f"User Said: {query}\n")
    except Exception as e:
        print("Say that again .....")
        return "None"
    return query

if __name__ == '__main__':
    speak("Hello, How are you?")
    while True:
        query = takeCommand().lower()
        if query == 'none':
            continue

        ans = Reply(query)
        print(ans)
        speak(ans)

        # Specific Browser Related Tasks 
        if "open youtube" in query:
            webbrowser.open('https://www.youtube.com')
        if "open google" in query:
            webbrowser.open('https://www.google.com')
        if "bye" in query:
            speak("Goodbye!")
            break
