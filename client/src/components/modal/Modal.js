import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay" />
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <span className="devs-title">The Developers</span>
        <div className="devs">
        <div>
            <h2><a href="https://fridapulido.dev/">Frida Pulido</a></h2>
          <div className="social">
              <a href="https://angel.co/frida-pulido"><i className="fab fa-angellist fa-2x"></i></a>
              <a href="https://github.com/FridaPolished"><i className="fab fa-github-square fa-2x"></i></a> 
              <a href="https://www.linkedin.com/in/frida-pulido/"><i className="fab fa-linkedin fa-2x"></i> </a>
          </div>     
        </div>
        <div>
            <h2><a href="nllevin.com">Noah Levin</a></h2>
            <div className="social">
              <a href="https://angel.co/noah-levin-2"><i className="fab fa-angellist fa-2x"></i></a>
              <a href="https://github.com/nllevin"><i className="fab fa-github-square fa-2x"></i></a> 
              <a href="https://www.linkedin.com/in/noah-levin"><i className="fab fa-linkedin fa-2x"></i></a>
            </div>   
        </div>
        <div>
            <h2><a href="www.marvinma.dev">Marvin Ma</a></h2>
          <div className="social">
              <a href="https://angel.co/marvin-ma-2"><i className="fab fa-angellist fa-2x"></i></a>
              <a href="https://github.com/yma010"><i className="fab fa-github-square fa-2x"></i></a> 
              <a href="https://www.linkedin.com/in/marvin-ma"> <i className="fab fa-linkedin fa-2x"></i></a>
          </div>
        </div>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;