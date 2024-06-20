// Define passcodes
const examPasscode = 'exam2024'; // Main passcode
const unlockPasscode = 'unlock2024'; // Special passcode for sending scores to mondking18@gmail.com

// Start exam function
function startExam() {
    let duration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    setTimeout(submitExam, duration);
}

// Submit exam function
function submitExam() {
    document.getElementById('examForm').submit();
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('examForm');
    const formData = new FormData(form);
    const name = formData.get('name');
    const matricNumber = formData.get('matric_number');
    const email = formData.get('email');

    const body = `Student ${name} with matric number ${matricNumber} (${email}) has submitted the exam.`;

    // Send email to main admin (mondaykingsley80@gmail.com)
    sendEmail('mondaykingsley80@gmail.com', false, body, email);

    // Show confirmation to student
    alert('Your exam has been submitted. You will receive your results shortly.');
}

// Handle submit button for picked answer and correct score
function submitPickedAnswerAndScore() {
    const pickedAnswer = document.getElementById('pickedAnswer').value;
    const correctScore = document.getElementById('correctScore').value;

    const body = `Picked answer: ${pickedAnswer}\nCorrect score: ${correctScore}`;

    // Send email to mondking18@gmail.com
    sendEmail('mondking18@gmail.com', false, body);

    // Show confirmation to student
    alert('Your picked answer and correct score have been submitted.');
}

// Unlock exam and handle email sending based on passcode
function unlockExam() {
    const enteredPasscode = document.getElementById('passcode').value;
    if (enteredPasscode === examPasscode) {
        document.getElementById('examSection').classList.remove('hidden');
        document.getElementById('passcodeSection').classList.add('hidden');
        startExam();
    } else if (enteredPasscode === unlockPasscode) {
        document.getElementById('examSection').classList.remove('hidden');
        document.getElementById('passcodeSection').classList.add('hidden');
        startExam();
    } else {
        alert('Incorrect passcode. Please try again.');
    }
}

// Send email function
function sendEmail(email, includeScores = false, customBody = '', fromEmail = '') {
    const adminEmail = email;
    const subject = 'New Exam Submission';
    let body = customBody;

    if (!customBody && includeScores) {
        body = ' Scores: [Include Scores Here]'; // Default score message if no custom body provided
    }

    // If fromEmail is provided, set the 'from' parameter in mailto link
    let mailtoLink = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (fromEmail) {
        mailtoLink += `&from=${encodeURIComponent(fromEmail)}`;
    }

    // Send email
    window.location.href = mailtoLink;
}
