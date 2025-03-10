// 1️⃣ Start Webcam Stream as Background
async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.getElementById('videoBackground');
        video.srcObject = stream;
    } catch (err) {
        console.error("Error accessing webcam: ", err);
    }
}

startWebcam();

// 2️⃣ Mock function to simulate SQLite data fetching
function updateInfoCard(personData) {
    document.getElementById("personName").innerText = `Name: ${personData.name}`;
    document.getElementById("personRelation").innerText = `Relation: ${personData.relation}`;
    document.getElementById("lastMet").innerText = `Last met: ${personData.lastMet}`;
    
    let conversationList = document.getElementById("conversationList");
    conversationList.innerHTML = ""; // Clear old data
    personData.conversation.forEach(point => {
        let li = document.createElement("li");
        li.innerText = point;
        conversationList.appendChild(li);
    });
}

// 3️⃣ Simulating person detection
function mockPersonDetected() {
    const mockData = {
        name: "Keith",
        relation: "Friend",
        lastMet: "Yesterday",
        conversation: [
            "Point blah blah blah",
            "Point blah blah blah",
            "Point blah blah blah",
            "Point blah blah blah"
        ]
    };
    updateInfoCard(mockData);
}

// Simulate detection every 5 seconds
setInterval(mockPersonDetected, 5000);

// 4️⃣ Placeholder functions for buttons
function viewHistory() {
    alert("View History Clicked!");
}

function viewContacts() {
    alert("View Contacts Clicked!");
}
