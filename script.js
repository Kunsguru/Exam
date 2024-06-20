
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
    const pickedAnswer = formData.get('picked_answer');
    const correctScore = formData.get('correct_score');

    // Email body for Monday Kingsley (admin)
    const bodyAdmin = `Student ${name} with matric number ${matricNumber} (${email}) has submitted the exam.`;

    // Send email to Monday Kingsley
    sendEmail('mondaykingsley80@gmail.com', false, bodyAdmin, email);

    // Send picked answer and correct score to Mond King (mondking18@gmail.com)
    sendScoresToMondKing(name, email, pickedAnswer, correctScore);

    // Show confirmation to student
    alert('Your exam has been submitted. You will receive your results shortly.');

    // Clear form fields after submission (optional)
    form.reset();
}

// Function to send picked answer and correct score to Mond King
function sendScoresToMondKing(name, email, pickedAnswer, correctScore) {
    const adminEmail = 'mondking18@gmail.com';
    const subject = 'Student Exam Results';

    // Email body for Mond King (masked to student)
    const bodyMondKing = `Student ${name} (${email}) picked answer: ${pickedAnswer}, correct score: ${correctScore}.`;

    // Send email to Mond King
    sendEmail(adminEmail, true, bodyMondKing);
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
        body = `Picked answer: ${pickedAnswer}, Correct score: ${correctScore}`; // Include scores in the email body
    }

    // If fromEmail is provided, set the 'from' parameter in mailto link
    let mailtoLink = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (fromEmail) {
        mailtoLink += `&from=${encodeURIComponent(fromEmail)}`;
    }

    // Send email
    window.location.href = mailtoLink;
}

