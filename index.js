function init() {
    // Verificar si los valores ya existen en el localStorage
    if (localStorage.getItem('followUpsCount')) {
      // Si existen, obtener los valores del localStorage
      followUpsCount = parseInt(localStorage.getItem('followUpsCount'));
      newChatInboundCount = parseInt(localStorage.getItem('newChatInboundCount'));
      newChatOutboundCount = parseInt(localStorage.getItem('newChatOutboundCount'));
    } else {
      // Si no existen, establecer los valores iniciales
      followUpsCount = 0;
      newChatInboundCount = 0;
      newChatOutboundCount = 0;
    }
  
    // Actualizar los contadores en la página
    document.getElementById("followUpsCount").textContent = followUpsCount;
    document.getElementById("newChatInboundCount").textContent = newChatInboundCount;
    document.getElementById("newChatOutboundCount").textContent = newChatOutboundCount;
  
    // Restaurar los datos de las listas desde el localStorage
    restoreListData("callsProposedList");
    restoreListData("newBookingList");
    restoreListData("showUpsList");
    restoreListData("salesEfectivasList");
    restoreListData("notesList");
  }
  
  // Llamar a la función init cuando se carga la página
  window.addEventListener('DOMContentLoaded', init);
  
function saveDataToLocalStorage() {
    localStorage.setItem('followUpsCount', followUpsCount);
    localStorage.setItem('newChatInboundCount', newChatInboundCount);
    localStorage.setItem('newChatOutboundCount', newChatOutboundCount);
}
  

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
  saveDataToLocalStorage();
}
function incrementNewChatInbound() {
  newChatInboundCount++;
  document.getElementById("newChatInboundCount").textContent = newChatInboundCount;
  saveDataToLocalStorage();
}
function incrementNewChatOutbound() {
  newChatOutboundCount++;
  document.getElementById("newChatOutboundCount").textContent = newChatOutboundCount;
  saveDataToLocalStorage();
}
function decreaseFollowUps() {
    if (followUpsCount > 0) {
        followUpsCount--;
        document.getElementById("followUpsCount").textContent = followUpsCount;
        saveDataToLocalStorage();
    }
}
function decreaseNewChatInbound() {
    if (newChatInboundCount > 0) {
        newChatInboundCount--;
        document.getElementById("newChatInboundCount").textContent = newChatInboundCount;
        saveDataToLocalStorage();
    }
}
function decreaseNewChatOutbound() {
    if (newChatOutboundCount > 0) {
        newChatOutboundCount--;
        document.getElementById("newChatOutboundCount").textContent = newChatOutboundCount;
        saveDataToLocalStorage();
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
            saveListData(listId);
        });
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
        input.value = "";

        // Guardar los datos actualizados en el localStorage
        saveListData(listId);
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
document.getElementById("notesBtn").addEventListener("click", () => {
  addNameToList("notesInput", "notesList");
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
    text += "Notas:\n" + getNumberedNamesTextFromList("notesList") + "\n";
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

function saveListData(listId) {
    const list = document.getElementById(listId);
    const listData = Array.from(list.children).map((listItem) => listItem.textContent);
    localStorage.setItem(listId, JSON.stringify(listData));
}

function restoreListData(listId) {
    const listData = localStorage.getItem(listId);
    if (listData) {
      const list = document.getElementById(listId);
      const parsedListData = JSON.parse(listData);
      for (let i = 0; i < parsedListData.length; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = parsedListData[i];
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
  
        // Agregar evento de eliminación al botón
        deleteButton.addEventListener("click", () => {
          list.removeChild(listItem);
          saveListData(listId);
        });
  
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
      }
    }
  }
  

function resetData() {
    // Restablecer los valores de los contadores
    followUpsCount = 0;
    newChatInboundCount = 0;
    newChatOutboundCount = 0;
  
    // Actualizar los contadores en la página
    document.getElementById("followUpsCount").textContent = followUpsCount;
    document.getElementById("newChatInboundCount").textContent = newChatInboundCount;
    document.getElementById("newChatOutboundCount").textContent = newChatOutboundCount;
  
    // Borrar los datos de las listas en el localStorage
    localStorage.removeItem("callsProposedList");
    localStorage.removeItem("newBookingList");
    localStorage.removeItem("showUpsList");
    localStorage.removeItem("salesEfectivasList");
    localStorage.removeItem("notesList");
  
    // Limpiar las listas en el DOM
    document.getElementById("callsProposedList").innerHTML = "";
    document.getElementById("newBookingList").innerHTML = "";
    document.getElementById("showUpsList").innerHTML = "";
    document.getElementById("salesEfectivasList").innerHTML = "";
    document.getElementById("notesList").innerHTML = "";
} 

document.getElementById("resetBtn").addEventListener("click", resetData);

  