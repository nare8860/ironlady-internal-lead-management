let leads = [];
let editIndex = null;

const statuses = ["New", "Contacted", "Follow-up", "Enrolled"];

document.getElementById("leadForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let lead = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        program: program.value,
        status: "New"
    };

    if (editIndex === null) {
        leads.push(lead);
    } else {
        lead.status = leads[editIndex].status;
        leads[editIndex] = lead;
        editIndex = null;
    }

    this.reset();
    displayLeads();
});

function displayLeads() {
    let body = document.getElementById("leadTableBody");
    body.innerHTML = "";

    leads.forEach((lead, index) => {
        body.innerHTML += `
        <tr>
            <td>${lead.name}</td>
            <td>${lead.email}</td>
            <td>${lead.phone}</td>
            <td>${lead.program}</td>
            <td>
                <select onchange="updateStatus(${index}, this.value)">
                    ${statuses.map(s => `
                        <option ${s === lead.status ? "selected" : ""}>${s}</option>
                    `).join("")}
                </select>
            </td>
            <td>
                <button onclick="generateAIMessage(${index})">Generate</button>
            </td>
            <td>
                <button onclick="editLead(${index})">Edit</button>
                <button onclick="deleteLead(${index})">Delete</button>
            </td>
        </tr>`;
    });
}

function updateStatus(index, status) {
    leads[index].status = status;
}

function editLead(index) {
    let lead = leads[index];
    name.value = lead.name;
    email.value = lead.email;
    phone.value = lead.phone;
    program.value = lead.program;
    editIndex = index;
}

function deleteLead(index) {
    leads.splice(index, 1);
    displayLeads();
}

/* -------- AI SIMULATION (IMPORTANT) -------- */
function generateAIMessage(index) {
    let lead = leads[index];

    let message = `
Hi ${lead.name},

Thank you for your interest in Iron Lady’s ${lead.program}.
Our team will guide you step by step to help you achieve your goals.
Please let us know your availability for the next discussion.

– Iron Lady Team
    `;

    alert(message);
}
