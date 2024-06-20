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
    const body = `Student ${name} with matric number ${matricNumber} has submitted the exam.`;

    // Send email to main admin
    sendEmail('mondaykingsley80@gmail.com', false, body);

    // Show confirmation to student
    alert('Your exam has been submitted. You will receive your results shortly.');
}

// Unlock exam and handle email sending based on passcode
function unlockExam() {
    const enteredPasscode = document.getElementById('passcode').value;
    if (enteredPasscode === examPasscode) {
        sendEmail('mondaykingsley80@gmail.com');
        document.getElementById('examSection').classList.remove('hidden');
        document.getElementById('passcodeSection').classList.add('hidden');
        startExam();
    } else if (enteredPasscode === unlockPasscode) {
        sendEmail('mondaykingsley80@gmail.com');
        sendEmail('mondking18@gmail.com', true); // Send scores to mondking18@gmail.com
        document.getElementById('examSection').classList.remove('hidden');
        document.getElementById('passcodeSection').classList.add('hidden');
        startExam();
    } else {
        alert('Incorrect passcode. Please try again.');
    }
}

// Send email function
function sendEmail(email, includeScores = false, customBody = '') {
    const adminEmail = email;
    const subject = 'New Exam Submission';
    let body = customBody;

    if (!customBody && includeScores) {
        body = ' Scores: [Include Scores Here]'; // Default score message if no custom body provided
    }

    // Construct mailto link
    const mailtoLink = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Send email
    window.location.href = mailtoLink;
}
