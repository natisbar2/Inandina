function showModal(title, content, close_x, button){
    let modalHeader = `<div class="modal micromodal-slide" id="modal-1" aria-hidden="true"><div class="modal__overlay" tabindex="-1" data-micromodal-close>
      <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
          <header class="modal__header">
                  <h2 class="centerDiv">
                    ${title}
                  </h2>`;
              
    let modalFirstClose = `<button class="modal__close" aria-label="Close modal" data-custom-close="modal-1" ></button>`;
    let modalContent = `</header>
          <div class="modal-content-content">
              <div class="modal__content">
                <h3 align = "center">${content}</h3>
              </div>
          </div>`;
    let modalFooter = `<footer class="modal__footer">
                  <div class="centerDiv">
                  <button class="modal__btn" data-custom-close="modal-1"
                      aria-label="Close this dialog window" id="modalClose">Close</button>
                  </div>
              </footer>`;
    let modalCierre = `</div></div></div>`;
              
    // let a = document.getElementById("modal-1");
    text = modalHeader;
    if (close_x){
      text += modalFirstClose;
    }
    text += modalContent;
    if (button){
      text += modalFooter;
    }
    text += modalCierre;
    if(!document.getElementById("modal-1")){
      document.body.innerHTML += text;
    }
  }              
  
//   class="modal__title"