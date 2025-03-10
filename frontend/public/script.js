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

// 2️⃣ Function to toggle history panel visibility
function toggleHistory() {
    const infoCard = document.getElementById("infoCard");
    // Check if history panel is already open
    const isHistoryOpen = infoCard.classList.contains("show-history");

    if (isHistoryOpen) {
        // If history is already open, close it
        infoCard.classList.remove("show-history");
        infoCard.classList.add("show-convo");
    } else {
        // Otherwise, open history and close conversation panel if it's open
        infoCard.classList.add("show-history");
        infoCard.classList.remove("show-contacts"); 
        infoCard.classList.remove("show-convo"); 

    }
    // adjustScrollability();
}


function toggleContacts() {
    const infoCard = document.getElementById("infoCard");
    const isContactsOpen = infoCard.classList.contains("show-contacts");

    if (isContactsOpen) {
        infoCard.classList.remove("show-contacts");
        infoCard.classList.add("show-convo"); // Restore last convo when closing contacts
    } else {
        infoCard.classList.add("show-contacts");
        infoCard.classList.remove("show-history"); // Hide history & last convo
        infoCard.classList.remove("show-convo"); 

    }
    // adjustScrollability();
}

// function adjustScrollability() {
//     const infoCard = document.getElementById("infoCard");
    
//     if (infoCard.classList.contains("show-history") || infoCard.classList.contains("show-contacts")) {
//         infoCard.style.overflowY = "auto"; // Enable scrolling
//     } else {
//         infoCard.style.overflowY = "hidden"; // Disable scrolling when nothing is open
//     }
// }