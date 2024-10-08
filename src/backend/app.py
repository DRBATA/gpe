from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import uuid

app = Flask(__name__)
CORS(app)

class Conversation:
    def __init__(self):
        self.state = "initial"
        self.current_topic = None
        self.severity = None

# Dictionary to store conversation states
conversations = {}

# Updated dictionary of possible inquiries, responses, and follow-up questions
responses = {
    "initial": {
        r"hello|hi|hey": "Welcome to the Old English Village GP. How may I assist you today?",
        r"headache|migraine": {
            "response": "I see you're experiencing head pain. Can you describe the severity on a scale of 1 to 10?",
            "next_state": "headache_severity"
        },
        r"cold|flu|fever": {
            "response": "I'm sorry to hear you're feeling unwell. Do you have a fever?",
            "next_state": "cold_flu_fever"
        },
        r"stomach|digestion|nausea": {
            "response": "Stomach troubles can be quite bothersome. Is the discomfort constant or does it come and go?",
            "next_state": "stomach_details"
        },
        r"anxiety|stress|nerves": {
            "response": "I understand you're feeling anxious or stressed. Have you experienced any physical symptoms like rapid heartbeat or sweating?",
            "next_state": "anxiety_details"
        },
        r"insomnia|sleep": {
            "response": "Difficulty sleeping can be quite troubling. How long have you been experiencing sleep issues?",
            "next_state": "sleep_duration"
        },
        r"pain|ache|sore": {
            "response": "I'm sorry to hear you're in pain. Can you point to where it hurts the most?",
            "next_state": "pain_location"
        }
    },
    "headache_severity": {
        r"(\d+)": {
            "response": lambda severity: f"I see, a severity of {severity}. For mild headaches (1-3), I recommend rest and hydration. For moderate (4-7), try a cool compress and a tincture of willow bark. For severe headaches (8-10), please seek immediate medical attention.",
            "next_state": "initial"
        }
    },
    "cold_flu_fever": {
        r"yes|yeah|yep": {
            "response": "For fever and flu-like symptoms, I prescribe bed rest, plenty of fluids, and a broth of chicken, garlic, and thyme. A hot toddy of honey, lemon, and a splash of whiskey before bed may also provide relief. If symptoms worsen or persist beyond a few days, please seek further medical attention.",
            "next_state": "initial"
        },
        r"no|nope": {
            "response": "Even without a fever, it's important to rest and stay hydrated. Try a tea of elderberry and echinacea to boost your immune system. If symptoms persist or worsen, please consult me again.",
            "next_state": "initial"
        }
    },
    "stomach_details": {
        r"constant": {
            "response": "For constant stomach discomfort, I recommend a diet of simple, easily digestible foods. Try a tea of ginger and peppermint to soothe your stomach. If the pain is severe or persists, please seek immediate medical attention.",
            "next_state": "initial"
        },
        r"comes and goes": {
            "response": "Intermittent stomach issues could be related to diet or stress. Keep a food diary to identify triggers. In the meantime, try a tincture of gentian root before meals to aid digestion.",
            "next_state": "initial"
        }
    },
    "anxiety_details": {
        r"yes|yeah|yep": {
            "response": "Physical symptoms often accompany anxiety. I recommend deep breathing exercises and a tincture of valerian root. Also, consider a daily walk in nature and limiting caffeine intake.",
            "next_state": "initial"
        },
        r"no|nope": {
            "response": "Even without physical symptoms, anxiety can be challenging. Try meditation or gentle yoga. A tea of chamomile and lavender before bed may help calm your mind.",
            "next_state": "initial"
        }
    },
    "sleep_duration": {
        r"(\d+)\s*(day|week|month)": {
            "response": lambda duration, unit: f"I see you've been having trouble sleeping for {duration} {unit}(s). Establish a calming bedtime routine, avoid screens before bed, and try a warm milk with honey and nutmeg. If the issue persists beyond a fortnight, we may need to explore other remedies.",
            "next_state": "initial"
        }
    },
    "pain_location": {
        r"(head|arm|leg|back|chest)": {
            "response": lambda location: f"I understand you're experiencing pain in your {location}. For most aches, I prescribe a warm compress of herbs (rosemary, thyme, and sage) and gentle stretching. If the pain is in your chest, please seek immediate medical attention as it could be serious.",
            "next_state": "initial"
        }
    }
}

def find_best_match(user_input, state):
    user_input = user_input.lower()
    for pattern, response in responses[state].items():
        match = re.search(pattern, user_input)
        if match:
            return response, match
    return None, None

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    user_input = data.get('input', '')
    session_id = data.get('session_id')

    if not session_id or session_id not in conversations:
        session_id = str(uuid.uuid4())
        conversations[session_id] = Conversation()

    conversation = conversations[session_id]
    response_data, match = find_best_match(user_input, conversation.state)

    if response_data:
        if isinstance(response_data, str):
            response = response_data
            conversation.state = "initial"
        else:
            if callable(response_data["response"]):
                response = response_data["response"](*match.groups())
            else:
                response = response_data["response"]
            conversation.state = response_data["next_state"]
    else:
        response = "I'm not quite sure how to help with that specific issue. As a general recommendation, I suggest a tincture of lavender and a fortnight's rest. If your symptoms persist or worsen, please seek further medical attention."
        conversation.state = "initial"

    return jsonify({'response': response, 'session_id': session_id})

if __name__ == '__main__':
    app.run(debug=True)
