const fileInput = document.getElementById('fileInput');
const uploadArea = document.getElementById('uploadArea');
const filePreview = document.getElementById('filePreview');
const loadingState = document.getElementById('loadingState');

let uploadedFile = null;

fileInput.addEventListener('change', handleFileSelect);

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--primary-teal)';
});

uploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--border-color)';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--border-color)';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files;
        handleFileSelect({ target: fileInput });
    }
});

function handleFileSelect(e) {
    const file = e.target.files[0];
    
    if (!file) return;
    
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (!allowedTypes.includes(file.type)) {
        showToast('Invalid file type. Please upload PDF, DOCX, or TXT files.', 'danger');
        return;
    }
    
    if (file.size > 16 * 1024 * 1024) {
        showToast('File size exceeds 16MB limit.', 'danger');
        return;
    }
    
    uploadedFile = file;
    displayFilePreview(file);
    uploadFileToServer(file);
}

function displayFilePreview(file) {
    document.getElementById('fileName').textContent = file.name;
    document.getElementById('fileSize').textContent = formatFileSize(file.size);
    
    uploadArea.classList.add('d-none');
    filePreview.classList.remove('d-none');
    
    lucide.createIcons();
}

function removeFile() {
    uploadedFile = null;
    fileInput.value = '';
    
    uploadArea.classList.remove('d-none');
    filePreview.classList.add('d-none');
}

function uploadFileToServer(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    fetch('/api/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showToast('File uploaded successfully!', 'success');
        } else {
            showToast(data.error || 'Upload failed', 'danger');
        }
    })
    .catch(error => {
        console.error('Upload error:', error);
        showToast('Upload failed. Please try again.', 'danger');
    });
}

function simplifyDocument() {
    if (!uploadedFile) return;
    
    showLoading('Simplifying your document with AI...');
    
    fetch('/simplify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: 'Sample document text' })
    })
    .then(response => response.json())
    .then(data => {
        hideLoading();
        if (data.success) {
            showToast('Document simplified successfully!', 'success');
            setTimeout(() => {
                window.location.href = '/analysis';
            }, 1000);
        }
    })
    .catch(error => {
        hideLoading();
        console.error('Simplify error:', error);
        showToast('Simplification failed. Please try again.', 'danger');
    });
}

function analyzeDocument() {
    if (!uploadedFile) return;
    
    showLoading('Analyzing document risks with AI...');
    
    fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: 'Sample document text' })
    })
    .then(response => response.json())
    .then(data => {
        hideLoading();
        if (data.success) {
            showToast('Analysis complete!', 'success');
            setTimeout(() => {
                window.location.href = '/analysis';
            }, 1000);
        }
    })
    .catch(error => {
        hideLoading();
        console.error('Analysis error:', error);
        showToast('Analysis failed. Please try again.', 'danger');
    });
}

function showLoading(message) {
    document.getElementById('loadingText').textContent = message;
    filePreview.classList.add('d-none');
    loadingState.classList.remove('d-none');
}

function hideLoading() {
    loadingState.classList.add('d-none');
    filePreview.classList.remove('d-none');
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
