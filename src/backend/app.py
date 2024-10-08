from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    user_input = data.get('input', '')

    # Simple response generation (replace this with your actual chatbot logic)
    response = f"Thank you for your inquiry about '{user_input}'. As your Old English Village GP, I recommend a tincture of lavender and a fortnight's rest."
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
