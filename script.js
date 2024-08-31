// DASS-21 Questions
const questions = [
    "I found it hard to wind down",                  // 1 (Stress)
    "I was aware of dryness of my mouth",            // 2 (Anxiety)
    "I couldn’t seem to experience any positive feeling at all", // 3 (Depression)
    "I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness in the absence of physical exertion)", // 4 (Anxiety)
    "I found it difficult to work up the initiative to do things", // 5 (Depression)
    "I tended to over-react to situations",          // 6 (Stress)
    "I experienced trembling (e.g., in the hands)",  // 7 (Anxiety)
    "I felt that I was using a lot of nervous energy", // 8 (Stress)
    "I was worried about situations in which I might panic and make a fool of myself", // 9 (Anxiety)
    "I felt that I had nothing to look forward to",  // 10 (Depression)
    "I found myself getting agitated",               // 11 (Stress)
    "I found it difficult to relax",                 // 12 (Stress)
    "I felt down-hearted and blue",                  // 13 (Depression)
    "I was intolerant of anything that kept me from getting on with what I was doing", // 14 (Stress)
    "I felt I was close to panic",                   // 15 (Anxiety)
    "I was unable to become enthusiastic about anything", // 16 (Depression)
    "I felt I wasn’t worth much as a person",        // 17 (Depression)
    "I felt that I was rather touchy",               // 18 (Stress)
    "I was aware of the action of my heart in the absence of physical exertion (e.g., sense of heart rate increase, heart missing a beat)", // 19 (Anxiety)
    "I felt scared without any good reason",         // 20 (Anxiety)
    "I felt that life was meaningless"               // 21 (Depression)
];

// Indices of questions corresponding to each category
const stressQuestions = [1, 6, 8, 11, 12, 14, 18];
const anxietyQuestions = [2, 4, 7, 9, 15, 19, 20];
const depressionQuestions = [3, 5, 10, 13, 16, 17, 21];

// Render questions on page load
window.onload = function() {
    const questionsDiv = document.getElementById('questions');
    questions.forEach((question, index) => {
        const questionHTML = `
            <div class="question">
                <label for="q${index + 1}">${index + 1}. ${question}</label>
                <select id="q${index + 1}" name="q${index + 1}">
                    <option value="" disabled selected>Select</option>
                    <option value="0">Never</option>
                    <option value="1">Sometimes</option>
                    <option value="2">Often</option>
                    <option value="3">Almost Always</option>
                </select>
            </div>
        `;
        questionsDiv.innerHTML += questionHTML;
    });
};

// Calculate results for each category
function calculateResults() {
    let stressScore = 0;
    let anxietyScore = 0;
    let depressionScore = 0;
    let incomplete = false;

    for (let i = 1; i <= questions.length; i++) {
        const response = document.getElementById(`q${i}`).value;
        if (response === "") {
            incomplete = true;
            break;
        }

        const score = parseInt(response);
        if (stressQuestions.includes(i)) {
            stressScore += score;
        } else if (anxietyQuestions.includes(i)) {
            anxietyScore += score;
        } else if (depressionQuestions.includes(i)) {
            depressionScore += score;
        }
    }
    
    if (incomplete) {
        alert("Please answer all questions before submitting.");
    } else {
        displayResult(stressScore, anxietyScore, depressionScore);
    }
}

// Display result with classification and levels in a table
function displayResult(stressScore, anxietyScore, depressionScore) {
    const stressLevel = getStressLevel(stressScore);
    const anxietyLevel = getAnxietyLevel(anxietyScore);
    const depressionLevel = getDepressionLevel(depressionScore);

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <table>
            <tr>
                <th>Category</th>
                <th>Score</th>
                <th>Level</th>
            </tr>
            <tr>
                <td>Stress</td>
                <td>${stressScore}</td>
                <td>${stressLevel}</td>
            </tr>
            <tr>
                <td>Anxiety</td>
                <td>${anxietyScore}</td>
                <td>${anxietyLevel}</td>
            </tr>
            <tr>
                <td>Depression</td>
                <td>${depressionScore}</td>
                <td>${depressionLevel}</td>
            </tr>
        </table>
    `;
}

// Determine stress level based on score
function getStressLevel(score) {
    if (score <= 7) return 'Normal';
    if (score <= 9) return 'Mild';
    if (score <= 12) return 'Moderate';
    if (score <= 16) return 'Severe';
    return 'Extremely Severe';
}

// Determine anxiety level based on score
function getAnxietyLevel(score) {
    if (score <= 7) return 'Normal';
    if (score <= 9) return 'Mild';
    if (score <= 12) return 'Moderate';
    if (score <= 16) return 'Severe';
    return 'Extremely Severe';
}

// Determine depression level based on score
function getDepressionLevel(score) {
    if (score <= 9) return 'Normal';
    if (score <= 13) return 'Mild';
    if (score <= 20) return 'Moderate';
    if (score <= 27) return 'Severe';
    return 'Extremely Severe';
}
