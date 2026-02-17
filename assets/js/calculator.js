/* AGE CALCULATOR - JAVASCRIPT */

document.addEventListener('DOMContentLoaded', init);

function init() {
  setupTabs();
  setupCalculateButtons();
  setupFAQ();
  setupMobileNav();
  setDefaultDates();
}

function setDefaultDates() {
  // Set DOB to 25 years ago
  const today = new Date();
  const dob = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
  
  document.querySelectorAll('.dob-input').forEach(input => {
    input.value = formatDateInput(dob);
  });
  
  // Set "age on date" to today
  document.querySelectorAll('.target-date-input').forEach(input => {
    input.value = formatDateInput(today);
  });
  
  // Set second DOB for difference calc
  const dob2 = new Date(today.getFullYear() - 23, today.getMonth() + 3, today.getDate() + 15);
  const dob2Input = document.getElementById('dob2');
  if (dob2Input) dob2Input.value = formatDateInput(dob2);
}

function formatDateInput(date) {
  return date.toISOString().split('T')[0];
}

function setupTabs() {
  document.querySelectorAll('.calc-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;
      document.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.calc-panel').forEach(p => p.classList.remove('active'));
      document.getElementById('panel-' + tabId).classList.add('active');
    });
  });
}

function setupCalculateButtons() {
  document.getElementById('calc-basic-btn')?.addEventListener('click', calculateBasicAge);
  document.getElementById('calc-ondate-btn')?.addEventListener('click', calculateAgeOnDate);
  document.getElementById('calc-diff-btn')?.addEventListener('click', calculateAgeDifference);
  document.getElementById('calc-days-btn')?.addEventListener('click', calculateAgeInDays);
  document.getElementById('calc-life-btn')?.addEventListener('click', calculateLifeExpectancy);
  document.getElementById('calc-korean-btn')?.addEventListener('click', calculateKoreanAge);
  document.getElementById('calc-chrono-btn')?.addEventListener('click', calculateChronologicalAge);
}

// Calculate age between two dates
function calculateAge(birthDate, targetDate) {
  let years = targetDate.getFullYear() - birthDate.getFullYear();
  let months = targetDate.getMonth() - birthDate.getMonth();
  let days = targetDate.getDate() - birthDate.getDate();
  
  if (days < 0) {
    months--;
    const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
    days += prevMonth.getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return { years, months, days };
}

// Get total days between dates
function getTotalDays(startDate, endDate) {
  const diffTime = endDate - startDate;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// Get next birthday
function getNextBirthday(birthDate) {
  const today = new Date();
  let nextBday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  
  if (nextBday <= today) {
    nextBday.setFullYear(nextBday.getFullYear() + 1);
  }
  
  return nextBday;
}

// Get day of week
function getDayOfWeek(date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
}

// Get zodiac sign
function getZodiacSign(month, day) {
  const signs = [
    { name: 'Capricorn', symbol: '♑', end: [1, 19] },
    { name: 'Aquarius', symbol: '♒', end: [2, 18] },
    { name: 'Pisces', symbol: '♓', end: [3, 20] },
    { name: 'Aries', symbol: '♈', end: [4, 19] },
    { name: 'Taurus', symbol: '♉', end: [5, 20] },
    { name: 'Gemini', symbol: '♊', end: [6, 20] },
    { name: 'Cancer', symbol: '♋', end: [7, 22] },
    { name: 'Leo', symbol: '♌', end: [8, 22] },
    { name: 'Virgo', symbol: '♍', end: [9, 22] },
    { name: 'Libra', symbol: '♎', end: [10, 22] },
    { name: 'Scorpio', symbol: '♏', end: [11, 21] },
    { name: 'Sagittarius', symbol: '♐', end: [12, 21] },
    { name: 'Capricorn', symbol: '♑', end: [12, 31] }
  ];
  
  for (const sign of signs) {
    if (month < sign.end[0] || (month === sign.end[0] && day <= sign.end[1])) {
      return sign;
    }
  }
  return signs[0];
}

// Get Chinese zodiac
function getChineseZodiac(year) {
  const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
  const emojis = ['🐀', '🐂', '🐅', '🐇', '🐉', '🐍', '🐎', '🐐', '🐒', '🐓', '🐕', '🐖'];
  const index = (year - 1900) % 12;
  return { animal: animals[index], emoji: emojis[index] };
}

// Get generation
function getGeneration(year) {
  if (year >= 2013) return 'Generation Alpha';
  if (year >= 1997) return 'Generation Z';
  if (year >= 1981) return 'Millennial';
  if (year >= 1965) return 'Generation X';
  if (year >= 1946) return 'Baby Boomer';
  if (year >= 1928) return 'Silent Generation';
  return 'Greatest Generation';
}

// Format number with commas
function formatNumber(num) {
  return num.toLocaleString();
}

// TAB 1: BASIC AGE CALCULATOR
function calculateBasicAge() {
  const dobInput = document.getElementById('dob-basic');
  if (!dobInput || !dobInput.value) return;
  
  const dob = new Date(dobInput.value + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const age = calculateAge(dob, today);
  const totalDays = getTotalDays(dob, today);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = age.years * 12 + age.months;
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  
  const nextBday = getNextBirthday(dob);
  const daysUntilBday = getTotalDays(today, nextBday);
  const turningAge = age.years + 1;
  
  const zodiac = getZodiacSign(dob.getMonth() + 1, dob.getDate());
  const chinese = getChineseZodiac(dob.getFullYear());
  const generation = getGeneration(dob.getFullYear());
  const bornDay = getDayOfWeek(dob);
  
  // Display results
  document.getElementById('basic-age-years').textContent = age.years;
  document.getElementById('basic-age-full').textContent = `${age.years} years, ${age.months} months, ${age.days} days`;
  
  document.getElementById('basic-months').textContent = formatNumber(totalMonths);
  document.getElementById('basic-weeks').textContent = formatNumber(totalWeeks);
  document.getElementById('basic-days').textContent = formatNumber(totalDays);
  document.getElementById('basic-hours').textContent = formatNumber(totalHours);
  
  document.getElementById('basic-next-bday').textContent = daysUntilBday;
  document.getElementById('basic-turning').textContent = turningAge;
  
  document.getElementById('basic-zodiac').textContent = `${zodiac.symbol} ${zodiac.name}`;
  document.getElementById('basic-chinese').textContent = `${chinese.emoji} ${chinese.animal}`;
  document.getElementById('basic-generation').textContent = generation;
  document.getElementById('basic-born-day').textContent = bornDay;
  
  document.getElementById('basic-results').classList.add('visible');
}

// TAB 2: AGE ON SPECIFIC DATE
function calculateAgeOnDate() {
  const dobInput = document.getElementById('dob-ondate');
  const targetInput = document.getElementById('target-date');
  
  if (!dobInput?.value || !targetInput?.value) return;
  
  const dob = new Date(dobInput.value + 'T00:00:00');
  const target = new Date(targetInput.value + 'T00:00:00');
  
  const age = calculateAge(dob, target);
  const totalDays = getTotalDays(dob, target);
  
  document.getElementById('ondate-age-years').textContent = age.years;
  document.getElementById('ondate-age-full').textContent = `${age.years} years, ${age.months} months, ${age.days} days`;
  document.getElementById('ondate-total-days').textContent = formatNumber(totalDays) + ' days';
  
  document.getElementById('ondate-results').classList.add('visible');
}

// TAB 3: AGE DIFFERENCE
function calculateAgeDifference() {
  const dob1Input = document.getElementById('dob1');
  const dob2Input = document.getElementById('dob2');
  
  if (!dob1Input?.value || !dob2Input?.value) return;
  
  const dob1 = new Date(dob1Input.value + 'T00:00:00');
  const dob2 = new Date(dob2Input.value + 'T00:00:00');
  
  // Ensure dob1 is earlier
  const earlier = dob1 < dob2 ? dob1 : dob2;
  const later = dob1 < dob2 ? dob2 : dob1;
  
  const diff = calculateAge(earlier, later);
  const totalDays = getTotalDays(earlier, later);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = diff.years * 12 + diff.months;
  
  document.getElementById('diff-years').textContent = diff.years;
  document.getElementById('diff-full').textContent = `${diff.years} years, ${diff.months} months, ${diff.days} days`;
  
  document.getElementById('diff-months').textContent = formatNumber(totalMonths);
  document.getElementById('diff-weeks').textContent = formatNumber(totalWeeks);
  document.getElementById('diff-days').textContent = formatNumber(totalDays);
  
  document.getElementById('diff-results').classList.add('visible');
}

// TAB 4: AGE IN DAYS/HOURS
function calculateAgeInDays() {
  const dobInput = document.getElementById('dob-days');
  if (!dobInput?.value) return;
  
  const dob = new Date(dobInput.value + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const totalDays = getTotalDays(dob, today);
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;
  const totalWeeks = Math.floor(totalDays / 7);
  
  // Milestones
  const milestones = [1000, 5000, 10000, 15000, 20000, 25000, 30000];
  let nextMilestone = milestones.find(m => m > totalDays) || (Math.ceil(totalDays / 10000) + 1) * 10000;
  const daysToMilestone = nextMilestone - totalDays;
  const milestoneDate = new Date(today);
  milestoneDate.setDate(milestoneDate.getDate() + daysToMilestone);
  
  document.getElementById('days-total').textContent = formatNumber(totalDays);
  document.getElementById('days-hours').textContent = formatNumber(totalHours);
  document.getElementById('days-minutes').textContent = formatNumber(totalMinutes);
  document.getElementById('days-seconds').textContent = formatNumber(totalSeconds);
  document.getElementById('days-weeks').textContent = formatNumber(totalWeeks);
  
  document.getElementById('days-milestone').textContent = formatNumber(nextMilestone);
  document.getElementById('days-milestone-date').textContent = milestoneDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  document.getElementById('days-results').classList.add('visible');
}

// TAB 5: LIFE EXPECTANCY
function calculateLifeExpectancy() {
  const dobInput = document.getElementById('dob-life');
  const sexSelect = document.getElementById('life-sex');
  
  if (!dobInput?.value) return;
  
  const dob = new Date(dobInput.value + 'T00:00:00');
  const today = new Date();
  const age = calculateAge(dob, today);
  const sex = sexSelect?.value || 'female';
  
  // Average life expectancy (simplified global averages)
  const lifeExpectancy = sex === 'male' ? 76 : 81;
  const yearsRemaining = Math.max(0, lifeExpectancy - age.years);
  const percentLived = Math.min(100, (age.years / lifeExpectancy * 100));
  
  // Estimate weeks/days remaining
  const daysRemaining = yearsRemaining * 365;
  const weeksRemaining = Math.floor(daysRemaining / 7);
  
  document.getElementById('life-expectancy').textContent = lifeExpectancy;
  document.getElementById('life-years-remaining').textContent = yearsRemaining;
  document.getElementById('life-weeks-remaining').textContent = formatNumber(weeksRemaining);
  document.getElementById('life-percent').textContent = percentLived.toFixed(1) + '%';
  
  // Progress bar
  document.getElementById('life-progress').style.width = percentLived + '%';
  
  document.getElementById('life-results').classList.add('visible');
}

// TAB 6: KOREAN AGE
function calculateKoreanAge() {
  const dobInput = document.getElementById('dob-korean');
  if (!dobInput?.value) return;
  
  const dob = new Date(dobInput.value + 'T00:00:00');
  const today = new Date();
  
  // International age
  const intlAge = calculateAge(dob, today);
  
  // Korean age: birth year counts as 1, add 1 every New Year
  const koreanAge = today.getFullYear() - dob.getFullYear() + 1;
  
  // Lunar age (simplified - similar to Korean but based on lunar new year)
  // For simplicity, we'll approximate lunar age as Korean age
  const lunarAge = koreanAge;
  
  const ageDiff = koreanAge - intlAge.years;
  
  document.getElementById('korean-age').textContent = koreanAge;
  document.getElementById('korean-intl-age').textContent = intlAge.years;
  document.getElementById('korean-lunar-age').textContent = lunarAge;
  document.getElementById('korean-diff').textContent = '+' + ageDiff + ' years';
  
  document.getElementById('korean-results').classList.add('visible');
}

// TAB 7: CHRONOLOGICAL AGE (for assessments)
function calculateChronologicalAge() {
  const dobInput = document.getElementById('dob-chrono');
  const testInput = document.getElementById('test-date');
  
  if (!dobInput?.value || !testInput?.value) return;
  
  const dob = new Date(dobInput.value + 'T00:00:00');
  const testDate = new Date(testInput.value + 'T00:00:00');
  
  const age = calculateAge(dob, testDate);
  const totalMonths = age.years * 12 + age.months;
  const totalDays = getTotalDays(dob, testDate);
  
  // Decimal age (years with decimal)
  const decimalAge = totalDays / 365.25;
  
  document.getElementById('chrono-years').textContent = age.years;
  document.getElementById('chrono-months').textContent = age.months;
  document.getElementById('chrono-days').textContent = age.days;
  document.getElementById('chrono-total-months').textContent = totalMonths;
  document.getElementById('chrono-decimal').textContent = decimalAge.toFixed(2);
  document.getElementById('chrono-format').textContent = `${age.years}:${age.months}`;
  
  document.getElementById('chrono-results').classList.add('visible');
}

function setupFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

function setupMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.nav-mobile');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => mobileNav.classList.toggle('active'));
  }
}
