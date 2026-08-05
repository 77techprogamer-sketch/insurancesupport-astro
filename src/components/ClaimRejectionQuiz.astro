---
// src/components/ClaimRejectionQuiz.astro
// This component will handle the interactive quiz logic.
import { Astro } from 'astro/runtime';
---

<div id="claimRejectionQuiz" class="max-w-xl mx-auto bg-white rounded-lg shadow-xl p-8 mb-12 border border-blue-100">
  <h2 class="text-3xl font-bold text-slate-900 text-center mb-6">Claim Rejection Quiz</h2>
  <p class="text-slate-600 text-center mb-8">Answer a few quick questions to assess your claim appeal potential.</p>

  <form id="quizForm" class="space-y-6">
    <!-- Question 1 -->
    <div>
      <label for="insurer" class="block text-lg font-semibold text-slate-800 mb-2">1. Which insurer rejected your claim?</label>
      <select id="insurer" name="insurer" required class="w-full p-3 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
        <option value="">Select Insurer</option>
        <option value="LIC">LIC</option>
        <option value="HDFC Life">HDFC Life</option>
        <option value="ICICI Prudential">ICICI Prudential</option>
        <option value="Star Health">Star Health</option>
        <option value="Bajaj Allianz">Bajaj Allianz</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <!-- Question 2 -->
    <div>
      <label for="policyType" class="block text-lg font-semibold text-slate-800 mb-2">2. What type of policy was it?</label>
      <select id="policyType" name="policyType" required class="w-full p-3 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
        <option value="">Select Policy Type</option>
        <option value="Life Insurance">Life Insurance</option>
        <option value="Health Insurance">Health Insurance</option>
        <option value="Term Insurance">Term Insurance</option>
        <option value="Motor Insurance">Motor Insurance</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <!-- Question 3 -->
    <div>
      <label for="rejectionReason" class="block text-lg font-semibold text-slate-800 mb-2">3. What was the rejection reason given?</label>
      <select id="rejectionReason" name="rejectionReason" required class="w-full p-3 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
        <option value="">Select Reason</option>
        <option value="Non-disclosure">Non-disclosure of Material Facts</option>
        <option value="Lapse">Policy Lapsed</option>
        <option value="Exclusion">Policy Exclusion</option>
        <option value="Waiting Period">Waiting Period Not Completed</option>
        <option value="Documentation">Incomplete/Incorrect Documentation</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <!-- Question 4 -->
    <div>
      <label for="claimAmount" class="block text-lg font-semibold text-slate-800 mb-2">4. What was the claim amount?</label>
      <select id="claimAmount" name="claimAmount" required class="w-full p-3 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
        <option value="">Select Amount</option>
        <option value="1-5L">₹1 Lakh - ₹5 Lakh</option>
        <option value="5-20L">₹5 Lakh - ₹20 Lakh</option>
        <option value="20L+">₹20 Lakh or More</option>
      </select>
    </div>

    <!-- Question 5 -->
    <div>
      <label for="rejectionDate" class="block text-lg font-semibold text-slate-800 mb-2">5. When was the claim rejected?</label>
      <select id="rejectionDate" name="rejectionDate" required class="w-full p-3 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
        <option value="">Select Timeframe</option>
        <option value="<30 days">Less than 30 days ago</option>
        <option value="30-90 days">30-90 days ago</option>
        <option value=">90 days">More than 90 days ago</option>
      </select>
    </div>

    <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">
      Assess My Claim Potential
    </button>
  </form>

  <div id="quizResult" class="hidden mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
    <h3 class="text-2xl font-bold text-blue-800 mb-3">Your Claim Appeal Potential: <span id="potentialScore" class="text-blue-600"></span></h3>
    <p id="potentialMessage" class="text-blue-700 mb-6"></p>
    <a id="whatsappCta" href="#" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.25 17.25H6.75A2.25 2.25 0 014.5 15V6.75a2.25 2.25 0 012.25-2.25h10.5a2.25 2.25 0 012.25 2.25v8.25a2.25 2.25 0 01-2.25 2.25zM17.25 8.25H6.75M13.5 12H6.75M10.5 15H6.75"/></svg>
      Get Expert Help on WhatsApp
    </a>
  </div>
</div>

<script define:vars={{ initialQuestions: Astro.props.initialQuestions }}>
  document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quizForm');
    const quizResult = document.getElementById('quizResult');
    const potentialScore = document.getElementById('potentialScore');
    const potentialMessage = document.getElementById('potentialMessage');
    const whatsappCta = document.getElementById('whatsappCta');

    quizForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(quizForm);
      const insurer = formData.get('insurer');
      const policyType = formData.get('policyType');
      const rejectionReason = formData.get('rejectionReason');
      const claimAmount = formData.get('claimAmount');
      const rejectionDate = formData.get('rejectionDate');

      let score = 0;
      let message = "";

      // Scoring Logic
      if (rejectionReason === 'Non-disclosure') score += 20;
      if (rejectionReason === 'Lapse') score += 10;
      if (rejectionReason === 'Exclusion') score += 30;
      if (rejectionReason === 'Waiting Period') score += 25;
      if (rejectionReason === 'Documentation') score += 40;
      if (rejectionReason === 'Other') score += 15;

      if (policyType === 'Life Insurance' || policyType === 'Health Insurance') score += 15;
      if (policyType === 'Term Insurance') score += 20;
      if (policyType === 'Motor Insurance') score += 5;

      if (claimAmount === '20L+') score += 20;
      else if (claimAmount === '5-20L') score += 15;
      else if (claimAmount === '1-5L') score += 10;

      if (rejectionDate === '<30 days') score += 30;
      else if (rejectionDate === '30-90 days') score += 20;
      else if (rejectionDate === '>90 days') score += 10;

      // Adjust message based on score
      if (score >= 80) {
        message = "High potential for successful appeal! Your case has strong grounds for review.";
      } else if (score >= 50) {
        message = "Good potential. With expert guidance, your chances of appeal are promising.";
      } else {
        message = "Moderate potential. While challenging, we can still review your case for any hidden opportunities.";
      }

      potentialScore.textContent = `${score}%`;
      potentialMessage.textContent = message;

      const whatsappMessage = `Hi Hari, I just took the Claim Rejection Quiz. My claim from ${insurer} for a ${policyType} was rejected due to ${rejectionReason}. The amount was ${claimAmount} and it was rejected ${rejectionDate}. My appeal potential is ${score}%. Can you help?`;
      whatsappCta.href = `https://wa.me/919986634506?text=${encodeURIComponent(whatsappMessage)}`;
      
      quizResult.classList.remove('hidden');
      quizResult.scrollIntoView({ behavior: 'smooth' });
    });
  });
</script>