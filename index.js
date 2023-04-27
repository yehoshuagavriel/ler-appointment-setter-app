let followUpsCount = 0;
let newChatInboundCount = 0;
let newChatOutboundCount = 0;
const fechaActual = new Date();

const dia = String(fechaActual.getDate()).padStart(2, '0');
const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses se indexan desde 0
const año = fechaActual.getFullYear();
const fechaFormateada = `${dia}-${mes}-${año}`;

function incrementFollowUps() {
  followUpsCount++;
  document.getElementById("followUpsCount").textContent = followUpsCount;
}
function incrementNewChatInbound() {
  newChatInboundCount++;
  document.getElementById("newChatInboundCount").textContent = newChatInboundCount;
}
function incrementNewChatOutbound() {
  newChatOutboundCount++;
  document.getElementById("newChatOutboundCount").textContent = newChatOutboundCount;
}
function decreaseFollowUps() {
    if (followUpsCount > 0) {
        followUpsCount--;
        document.getElementById("followUpsCount").textContent = followUpsCount;
    }
}
function decreaseNewChatInbound() {
    if (newChatInboundCount > 0) {
        newChatInboundCount--;
        document.getElementById("newChatInboundCount").textContent = newChatInboundCount;
    }
}
function decreaseNewChatOutbound() {
    if (newChatOutboundCount > 0) {
        newChatOutboundCount--;
        document.getElementById("newChatOutboundCount").textContent = newChatOutboundCount;
    }
}

document.getElementById('fechaActual').textContent = fechaFormateada;
document.getElementById("followUpsBtn").addEventListener("click", incrementFollowUps);
document.getElementById("newChatInboundBtn").addEventListener("click", incrementNewChatInbound);
document.getElementById("newChatOutboundBtn").addEventListener("click", incrementNewChatOutbound);
document.getElementById("followUpsDecreaseBtn").addEventListener("click", decreaseFollowUps);
document.getElementById("newChatInboundDecreaseBtn").addEventListener("click", decreaseNewChatInbound);
document.getElementById("newChatOutboundDecreaseBtn").addEventListener("click", decreaseNewChatOutbound);

function addNameToList(inputId, listId) {
    const input = document.getElementById(inputId);
    const name = input.value.trim();
    if (name !== "") {
        const list = document.getElementById(listId);
        const listItem = document.createElement("li");
        listItem.textContent = name;
        const deleteButton = document.createElement("button");
             deleteButton.style.margin = ".5em 1em";
            deleteButton.style.padding = ".5em 1em";
            deleteButton.style.borderRadius = "2em";
            deleteButton.style.fontSize = "16px";
            deleteButton.style.backgroundColor = "#ee4646";
            deleteButton.style.color = "black";
            deleteButton.style.border = "none";
            deleteButton.style.cursor = "pointer";
            deleteButton.innerHTML = '<i class="fas fa-times"></i>';
            deleteButton.addEventListener("click", () => {
            list.removeChild(listItem);
        });
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
        input.value = "";
    }
}

document.getElementById("callsProposedBtn").addEventListener("click", () => {
    addNameToList("callsProposedInput", "callsProposedList");
});
document.getElementById("newBookingBtn").addEventListener("click", () => {
    addNameToList("newBookingInput", "newBookingList");
});
document.getElementById("showUpsBtn").addEventListener("click", () => {
    addNameToList("showUpsInput", "showUpsList");
});
document.getElementById("salesEfectivasBtn").addEventListener("click", () => {
    addNameToList("salesEfectivasInput", "salesEfectivasList");
});


function getDataAsText() {
    let text = "";
    text += "Follow ups: " + followUpsCount + "\n";
    text += "New Chat Inbound: " + newChatInboundCount + "\n";
    text += "New Chat Outbound: " + newChatOutboundCount + "\n\n";
    text += "Calls Proposed:\n" + getNumberedNamesTextFromList("callsProposedList") + "\n";
    text += "New Booking:\n" + getNumberedNamesTextFromList("newBookingList") + "\n";
    text += "Show Ups:\n" + getNumberedNamesTextFromList("showUpsList") + "\n";
    text += "Sales Efectivas:\n" + getNumberedNamesTextFromList("salesEfectivasList") + "\n";
    text += "Notas:\n" + document.getElementById("notasTextarea").value.trim() + "\n";
    return text;
}
  
function getNumberedNamesTextFromList(listId) {
    const list = document.getElementById(listId);
    let namesText = "";
    for (let i = 0; i < list.children.length; i++) {
        const listItem = list.children[i];
        const listItemText = listItem.innerText.replace(/^\d+\. /, "");
        namesText += `${i + 1}. ${listItemText}\n`;
    }
    return namesText;
}
  
document.getElementById("descargarBtn").addEventListener("click", () => {
    const textData = getDataAsText();
    const blob = new Blob([textData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fechaFormateada}.txt`;
    a.click();
});
