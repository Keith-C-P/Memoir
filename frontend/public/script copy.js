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

    // document.getElementById("infoCard").classList.add("show-convo");
    // document.getElementById("infoCard").classList.remove("show-history", "show-contacts");
}

// 3️⃣ Simulating person detection
// function mockPersonDetected() {
    
// }


window.onload = function () {
    updateInfoCard(_001); // call after DOM is ready
};


// Simulate detection every 5 seconds
// setInterval(mockPersonDetected, 5000);

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

function openChat(personData) {
    updateInfoCard(personData);
    document.querySelector(".person-photo img").src = personData.photo;
    const infoCard = document.getElementById("infoCard");
    infoCard.classList.add("show-convo");
    infoCard.classList.remove("show-history");
    infoCard.classList.remove("show-contacts");

}




// function adjustScrollability() {
//     const infoCard = document.getElementById("infoCard");
    
//     if (infoCard.classList.contains("show-history") || infoCard.classList.contains("show-contacts")) {
//         infoCard.style.overflowY = "auto"; // Enable scrolling
//     } else {
//         infoCard.style.overflowY = "hidden"; // Disable scrolling when nothing is open
//     }
// }


const _001 = {
    name: "Keith",
    relation: "Friend",
    lastMet: "Yesterday",
    photo: "./assets/cat.jpeg",
    conversation: [
        "My name is Keith",
        "Im a dude",
        "Point blah blah blah",
        "Point blah blah blah"
    ]
};

const _002 = {
    name: "Alice",
    relation: "Colleague",
    lastMet: "Last week",
    photo: "./assets/alice.jpeg",
    conversation: [
        "Im alice",
        "Point blah blah blah",
        "Point blah blah blah",
        "Point blah blah blah"
    ]

}

const _003 = {
    name: "John",
    relation: "Brother",
    lastMet: "Today",
    photo: "./assets/john.jpeg",
    conversation: [
        "Im John",
        "Point blah blah blah",
        "Point blah blah blah",
        "Point blah blah blah"
    ]

}