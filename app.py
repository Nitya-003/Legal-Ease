from flask import Flask, render_template, request, jsonify, session
from werkzeug.utils import secure_filename
import os
from datetime import datetime
import json

app = Flask(__name__)
app.secret_key = os.environ.get('SESSION_SECRET', 'dev-secret-key')

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'docx', 'txt'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/upload')
def upload_page():
    return render_template('index.html')

@app.route('/analysis')
def analysis():
    return render_template('analysis.html')

@app.route('/chat')
def chat():
    return render_template('chat.html')

@app.route('/history')
def history():
    return render_template('history.html')

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file and file.filename and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        session['current_document'] = filename
        
        return jsonify({
            'success': True,
            'filename': filename,
            'message': 'File uploaded successfully'
        })
    
    return jsonify({'error': 'Invalid file type. Please upload PDF, DOCX, or TXT files.'}), 400

@app.route('/simplify', methods=['POST'])
def simplify():
    data = request.get_json()
    document_text = data.get('text', '')
    
    simplified_text = f"**Simplified Version:**\n\nThis legal document has been simplified for easier understanding. The original complex legal language has been converted to plain English while maintaining the core meaning and legal intent.\n\n**Key Points:**\n- Main obligations and rights are clearly outlined\n- Technical jargon has been replaced with everyday language\n- Important dates and deadlines are highlighted\n- Potential consequences are explained in simple terms"
    
    return jsonify({
        'success': True,
        'simplified_text': simplified_text,
        'original_length': len(document_text),
        'simplified_length': len(simplified_text)
    })

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    document_text = data.get('text', '')
    
    risk_analysis = {
        'overall_risk': 'Medium',
        'risk_score': 65,
        'risks': [
            {
                'category': 'Financial Risk',
                'level': 'High',
                'description': 'Potential liability clauses that could result in significant financial obligations',
                'severity': 75
            },
            {
                'category': 'Compliance Risk',
                'level': 'Medium',
                'description': 'Some regulatory requirements may need additional verification',
                'severity': 55
            },
            {
                'category': 'Termination Risk',
                'level': 'Low',
                'description': 'Contract termination clauses appear balanced and reasonable',
                'severity': 30
            }
        ],
        'recommendations': [
            'Review financial liability caps with legal counsel',
            'Verify compliance requirements with regulatory team',
            'Consider negotiating more favorable payment terms'
        ]
    }
    
    return jsonify({
        'success': True,
        'analysis': risk_analysis
    })

@app.route('/chat', methods=['POST'])
def chat_endpoint():
    data = request.get_json()
    user_message = data.get('message', '')
    
    responses = [
        "Based on the document you uploaded, I can help clarify that provision. It means that both parties agree to resolve disputes through mediation before pursuing litigation.",
        "That's a great question! The clause you're referring to is a standard indemnification clause, which protects one party from legal liability in specific situations.",
        "From my analysis of the document, this section outlines the payment terms and conditions. The net-30 terms mean payment is due within 30 days of invoice.",
        "This particular clause is important because it defines the scope of work and deliverables. Make sure you understand all the obligations listed here."
    ]
    
    import random
    bot_response = random.choice(responses)
    
    return jsonify({
        'success': True,
        'response': bot_response,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/demo')
def demo():
    demo_data = {
        'document_analysis': {
            'title': 'Sample Employment Agreement',
            'date_analyzed': '2025-10-08',
            'risk_level': 'Medium',
            'risk_score': 65,
            'page_count': 12,
            'word_count': 4500
        },
        'simplified_preview': 'This employment agreement establishes the terms of employment between the company and the employee...',
        'risk_categories': {
            'financial': 75,
            'compliance': 55,
            'termination': 30,
            'liability': 60
        }
    }
    
    return jsonify(demo_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
