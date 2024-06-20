function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('examForm');
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const matricNumber = formData.get('matric_number');
    const phone = formData.get('phone');
    const adminEmail = 'mondaykingsley80@gmail.com';
    const subject = 'New Exam Submission';

    // Collect selected answers
    let answers = [];
    for (let i = 1; i <= 3; i++) { // Assuming there are 3 questions for demonstration
        const selectedAnswer = formData.get('q' + i);
        answers.push(`Q${i}: ${selectedAnswer}`);
    }

    // Prepare email body
    const body = `
        Candidate's Email: ${email}
        Name: ${name}
        Matric Number: ${matricNumber}
        Phone Number: ${phone}
        
        Selected Answers:
        ${answers.join('\n')}
    `;

    // Send email to admin
    window.location.href = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Show confirmation to student
    alert('Your exam has been submitted. You will receive your results shortly.');
}

