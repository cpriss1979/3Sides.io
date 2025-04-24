// --------------------- SUPPORT LIST ---------------------
function saveSupport() {
  const name = document.getElementById("name").value.trim();
  const relationship = document.getElementById("relationship").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name && !relationship && !phone) return;

  const supportList = JSON.parse(localStorage.getItem("supportPeople")) || [];
  supportList.push({ name, relationship, phone });
  localStorage.setItem("supportPeople", JSON.stringify(supportList));

  document.getElementById("name").value = "";
  document.getElementById("relationship").value = "";
  document.getElementById("phone").value = "";

  displaySupport();
}

function deleteSupport(index) {
  const supportList = JSON.parse(localStorage.getItem("supportPeople")) || [];
  supportList.splice(index, 1);
  localStorage.setItem("supportPeople", JSON.stringify(supportList));
  displaySupport();
}

function displaySupport() {
  const list = JSON.parse(localStorage.getItem("supportPeople")) || [];
  const ul = document.getElementById("savedSupportList");
  ul.innerHTML = "";

  list.forEach((person, index) => {
    const li = document.createElement("li");
    li.className = "support-item";

    const span = document.createElement("span");
    span.textContent = `${person.name} (${person.relationship}) ${person.phone}`;

    const button = document.createElement("button");
    button.textContent = "❌";
    button.className = "delete-button";
    button.onclick = () => deleteSupport(index);

    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);
  });
}

function printSupportList() {
  const section = document.querySelector(".saved-section").outerHTML;
  const html = `
    <html>
    <head>
      <title>Print Support List</title>
      <style>
        body {
          font-family: Arial;
          padding: 2rem;
          background-color: #fffafc;
          color: #4a2c2a;
        }
        .support-item {
          background: #f4f0f5;
          padding: 1rem;
          border-radius: 1rem;
          border: 1px dashed #ce85a6;
          font-size: 1.2rem;
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
        }
      </style>
    </head>
    <body>
      ${section}
    </body>
    </html>
  `;

  const win = window.open('', '', 'width=800,height=600');
  win.document.write(html);
  win.document.close();
  win.onload = () => {
    win.print();
    win.close();
  };
}

// --------------------- WELLNESS PLAN ---------------------
function savePlan() {
  const plan = {
    wellnessLook: document.getElementById('wellnessLook').value,
    dailyHabits: document.getElementById('dailyHabits').value,
    triggerList: document.getElementById('triggerList').value,
    afterTriggered: document.getElementById('afterTriggered').value,
    warningSigns: document.getElementById('warningSigns').value,
    actionPlan: document.getElementById('actionPlan').value,
    anotherAction: document.getElementById('anotherAction').value
  };

  localStorage.setItem('wellnessPlan', JSON.stringify(plan));
  displaySavedPlan();
}

function displaySavedPlan() {
  const saved = JSON.parse(localStorage.getItem('wellnessPlan'));

  if (saved) {
    document.getElementById('wellnessLook').value = saved.wellnessLook || '';
    document.getElementById('dailyHabits').value = saved.dailyHabits || '';
    document.getElementById('triggerList').value = saved.triggerList || '';
    document.getElementById('afterTriggered').value = saved.afterTriggered || '';
    document.getElementById('warningSigns').value = saved.warningSigns || '';
    document.getElementById('actionPlan').value = saved.actionPlan || '';
    document.getElementById('anotherAction').value = saved.anotherAction || '';

    document.getElementById('displayWellnessLook').textContent = saved.wellnessLook || '';
    document.getElementById('displayDailyHabits').textContent = saved.dailyHabits || '';
    document.getElementById('displayTriggerList').textContent = saved.triggerList || '';
    document.getElementById('displayAfterTriggered').textContent = saved.afterTriggered || '';
    document.getElementById('displayWarningSigns').textContent = saved.warningSigns || '';
    document.getElementById('displayActionPlan').textContent = saved.actionPlan || '';
    document.getElementById('displayAnotherAction').textContent = saved.anotherAction || '';
  }
}

function resetPlan() {
  if (confirm("Are you sure you want to reset your wellness plan? This will delete all saved data.")) {
    localStorage.removeItem('wellnessPlan');
    document.getElementById('wellnessForm').reset();

    document.getElementById('displayWellnessLook').textContent = '';
    document.getElementById('displayDailyHabits').textContent = '';
    document.getElementById('displayTriggerList').textContent = '';
    document.getElementById('displayAfterTriggered').textContent = '';
    document.getElementById('displayWarningSigns').textContent = '';
    document.getElementById('displayActionPlan').textContent = '';
    document.getElementById('displayAnotherAction').textContent = '';
  }
}

function printPlan() {
  const savedPlanElement = document.getElementById("savedPlan");

  if (!savedPlanElement) {
    alert("No saved plan to print.");
    return;
  }

  const savedContent = savedPlanElement.outerHTML;

  const printWindow = window.open('', '', 'width=850,height=600');
  printWindow.document.write(`
    <html>
      <head>
        <title>Print My Wellness Plan</title>
        <style>
          body {
            font-family: Georgia;
            padding: 2rem;
            background: #fffafc;
            color: #2e2e3a;
          }
          h2, h3 {
            color: #b04bb3;
          }
          strong {
            color: #4a2c2a;
          }
          p {
            margin: 0.5rem 0;
            font-size: 1.1rem;
          }
          .saved-section {
            background-color: #fdf0f4;
            padding: 1rem;
            border-radius: 1rem;
            border: 2px dashed #ce85a6;
          }
        </style>
      </head>
      <body>
        ${savedContent}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.onload = () => {
    printWindow.print();
    printWindow.close();
  };
}

// Run both display functions when the page loads
window.onload = function () {
  displaySupport();
  displaySavedPlan();
};
