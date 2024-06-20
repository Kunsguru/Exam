function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('examForm');
    const formData = new FormData(form);
    const answers = [];
    for (let i = 1; i <= 100; i++) {
        answers.push(formData.get('q' + i));
    }
    const score = calculateScore(answers);
    const name = formData.get('name');
    const matricNumber = formData.get('matric_number');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const adminEmail1 = 'mondaykingsley80@gmail.com';
    const adminEmail2 = 'mondking18@gmail.com';
    const subject1 = 'New Exam Submission (Without Answers)';
    const subject2 = 'New Exam Submission (With Answers)';
    
    // Body for email without answers
    const body1 = `Student ${name} with matric number ${matricNumber} has submitted the exam.\nScore: ${score}/100`;
    
    // Body for email with answers
    const body2 = `Student ${name} with matric number ${matricNumber} has submitted the exam.\nScore: ${score}/100\n\nAnswers:\n`;
    for (let i = 0; i < correctAnswers.length; i++) {
        body2 += `Question ${i + 1}: ${correctAnswers[i]}\n`;
    }

    // Send email to admin 1 (without answers)
    window.location.href = `mailto:${adminEmail1}?subject=${encodeURIComponent(subject1)}&body=${encodeURIComponent(body1)}`;
    
    // Send email to admin 2 (with answers)
    window.location.href = `mailto:${adminEmail2}?subject=${encodeURIComponent(subject2)}&body=${encodeURIComponent(body2)}`;

    // Show confirmation to student
    alert('Your exam has been submitted. You will receive your results shortly.');
}

















