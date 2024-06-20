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
        
        const answers = {
            q1: formData.get('q1'),
            q2: formData.get('q2'),
            q3: formData.get('q3'),
            // Add more questions here based on the structure in the HTML
        };

        const adminEmail = 'mondaykingsley80@gmail.com';
        const subject = 'New Exam Submission';
        let body = `Student ${name} with matric number ${matricNumber} has submitted the exam.\n\n`;
        
        // Append answers to the body
        body += 'Answers:\n';
        for (const [question, answer] of Object.entries(answers)) {
            body += `Question ${question}: ${answer}\n`;
        }

        // Send email to admin
        window.location.href = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Show confirmation to student
        alert('Your exam has been submitted. You will receive your results shortly.');
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


