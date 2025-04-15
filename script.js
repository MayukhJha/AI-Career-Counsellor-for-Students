document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.question');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const form = document.getElementById('quizForm');
    const resultBox = document.getElementById('result');
    const quizSection = document.getElementById('quizSection');
    const resultSection = document.getElementById('resultSection');

    let currentQuestion = 0;
    let currentCareer = '';

    // Career path data mapping
    const careerData = {
      'Engineering': {
        name: 'Software Engineer',
        description: 'You have strong analytical and technical skills that are perfect for software engineering. Your logical approach to problem-solving and interest in technical challenges make you well-suited for building innovative software solutions and technologies.',
        steps: [
          'Take computer science or programming courses in high school',
          'Learn programming languages like Python, JavaScript, or Java',
          'Pursue a degree in Computer Science or Software Engineering',
          'Build a portfolio of coding projects',
          'Apply for internships at tech companies'
        ]
      },
      'Design': {
        name: 'UX/UI Designer',
        description: 'You have a creative mind with strong visual skills. Your ability to think creatively while understanding user needs makes you an excellent candidate for UX/UI design, where you can craft engaging digital experiences.',
        steps: [
          'Study design principles and user psychology',
          'Learn design tools like Figma or Adobe XD',
          'Create a portfolio of design projects',
          'Take courses in user experience and interface design',
          'Gain experience through internships or freelance work'
        ]
      },
      'Media & Communication': {
        name: 'Content Creator',
        description: 'You have excellent communication skills and a talent for storytelling. Your creativity and ability to express ideas make you well-suited for creating engaging content across different platforms and media formats.',
        steps: [
          'Develop strong writing and communication skills',
          'Learn content creation tools and platforms',
          'Build a portfolio of creative work',
          'Consider a degree in Communications, Journalism, or Media Studies',
          'Start with small projects to build experience'
        ]
      },
      'Business & Management': {
        name: 'Business Analyst',
        description: 'You have strong organizational skills and leadership potential. Your ability to understand systems and manage people positions you well for business analysis, where you can help organizations improve their operations and strategies.',
        steps: [
          'Develop analytical and critical thinking skills',
          'Study business fundamentals and economics',
          'Learn data analysis tools and techniques',
          'Pursue a degree in Business, Economics, or related field',
          'Gain experience through internships in business settings'
        ]
      }
    };

    function showQuestion(index) {
      questions.forEach(q => q.classList.remove('active'));
      questions[index].classList.add('active');
      prevBtn.style.display = index > 0 ? 'inline-block' : 'none';
      nextBtn.style.display = index < questions.length - 1 ? 'inline-block' : 'none';
      submitBtn.style.display = index === questions.length - 1 ? 'inline-block' : 'none';
    }

    function validateCurrentQuestion() {
      const q = questions[currentQuestion];
      const checked = q.querySelector('input[type="radio"]:checked');
      return !!checked;
    }

    nextBtn.addEventListener('click', () => {
      if (!validateCurrentQuestion()) {
        alert('Please select an option before proceeding.');
        return;
      }
      currentQuestion++;
      showQuestion(currentQuestion);
    });

    prevBtn.addEventListener('click', () => {
      currentQuestion--;
      showQuestion(currentQuestion);
    });

    // Click event for the submit button
    submitBtn.addEventListener('click', function() {
      if (!validateCurrentQuestion()) {
        alert('Please select an option.');
        return;
      }

      const answers = {};
      const formData = new FormData(form);
      for (let [key, value] of formData.entries()) {
        answers[key] = value;
      }

      const score = { 'Engineering': 0, 'Design': 0, 'Media & Communication': 0, 'Business & Management': 0 };
      Object.values(answers).forEach(answer => score[answer]++);

      let bestFit = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
      currentCareer = bestFit;
      
      // Show brief result
      resultBox.style.display = 'block';
      resultBox.innerHTML = `<h3>You may be suited for a career in <strong>${bestFit}</strong>!</h3>
                            <p>Loading detailed results...</p>`;
      resultBox.scrollIntoView({ behavior: 'smooth' });
      
      // Show detailed results after a brief delay
      setTimeout(() => {
        showDetailedResults(bestFit);
      }, 1500);
    });

    function showDetailedResults(careerType) {
      // Hide quiz section and show result section
      quizSection.style.display = 'none';
      resultSection.style.display = 'block';
      
      const career = careerData[careerType];
      currentCareer = careerType;
      
      // Set career name
      document.getElementById('careerName').textContent = career.name;
      
      // Set career description
      document.getElementById('careerDescription').textContent = career.description;
      
      // Clear and populate steps
      const stepsList = document.getElementById('careerSteps');
      stepsList.innerHTML = '';
      
      // Add each step as a list item
      career.steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        stepsList.appendChild(li);
      });
    }

    window.restartQuiz = function() {
      // Reset form
      form.reset();
      currentQuestion = 0;
      showQuestion(currentQuestion);
      
      // Hide result section and show quiz section
      resultSection.style.display = 'none';
      quizSection.style.display = 'block';
      resultBox.style.display = 'none';
    };

    showQuestion(currentQuestion);
  });