<script>
    const examPasscode = 'exam2024'; // Define the passcode here

    function startExam() {
        let duration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
        setTimeout(submitExam, duration);
    }

    function submitExam() {
        document.getElementById('examForm').submit();
    }

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
        let body = `Student ${name} with matric number ${matricNumber} has submitted the exam.\n\n`;

        // Append answers to email body
        body += 'Exam Answers:\n';
        body += getAnswers(formData);

        // Send email to admin
        window.location.href = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Show confirmation to student
        alert('Your exam has been submitted. You will receive your results shortly.');
    }

    function getAnswers(formData) {
        let answers = '';
        for (let i = 1; i <= 100; i++) { // Assuming there are 100 questions
            const question = `q${i}`;
            const answer = formData.get(question);
            if (answer) {
                answers += `Question ${i}: ${answer}\n`;
            }
        }
        return answers;
    }

    function unlockExam() {
        const enteredPasscode = document.getElementById('passcode').value;
        if (enteredPasscode === examPasscode) {
            document.getElementById('examSection').classList.remove('hidden');
            document.getElementById('passcodeSection').classList.add('hidden');
            startExam();
        } else {
            alert('Incorrect passcode. Please try again.');
        }
    }
</script>

