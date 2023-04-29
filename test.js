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
  }
  
  // Llamar a la función init cuando se carga la página
  window.addEventListener('DOMContentLoaded', init);
  