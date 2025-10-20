from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Shahram Khan profile data
shahram_info = {
    "name": "Shahram Khan",
    "email": "heyshahramjoyya@gmail.com",
    "education": "BS in Artificial Intelligence from The Islamia University of Bahawalpur",
    "experience": "4 years total, 3 years in Project/Product Management, 1 year in Technical Management, managed 100+ projects including taxi booking apps, restaurant apps, landlord applications, car rental apps, social apps, music players, and AI chatbot personal project.",
    "projects": "Personal AI-powered chatbot, Taxi booking apps, Restaurant apps, Landlord apps, Car rental apps, Social apps, Music players.",
    "tools": "Jira, ClickUp, Trello, Asana, Custom CRMs",
    "team": "Managed developers, ML engineers, designers, and automation specialists",
    "risk_management": "Early risk detection, risk logs, contingency planning, team check-ins",
    "certifications": "Planning Agile/Scrum certification soon",
    "salary": "Current: PKR 110,000, Expected: PKR 130,000",
    "availability": "November 1st, 2025"
}

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask():
    user_question = request.json.get("question", "").lower()

    # Simple keyword matching
    if "experience" in user_question:
        answer = shahram_info["experience"]
    elif "project" in user_question or "projects" in user_question:
        answer = shahram_info["projects"]
    elif "education" in user_question or "study" in user_question:
        answer = shahram_info["education"]
    elif "email" in user_question:
        answer = shahram_info["email"]
    elif "team" in user_question or "manage" in user_question:
        answer = shahram_info["team"]
    elif "tools" in user_question:
        answer = shahram_info["tools"]
    elif "risk" in user_question:
        answer = shahram_info["risk_management"]
    elif "certification" in user_question:
        answer = shahram_info["certifications"]
    elif "salary" in user_question:
        answer = shahram_info["salary"]
    elif "availability" in user_question or "join" in user_question:
        answer = shahram_info["availability"]
    else:
        answer = "I can tell you about Shahram Khan’s personal details, professional experience, projects, and more. Please ask a question!"

    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)
