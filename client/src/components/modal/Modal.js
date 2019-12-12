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
        <span className="devs-title">The developers</span>
        <div className="devs">
        <div>
          <h2>Frida Pulido</h2>
          <div className="social">
            <i className="fab fa-angellist"></i>
            <a href="https://angel.co/frida-pulido">Angelist</a>
          </div>
          <div className="social">
            <i className="fab fa-github-square"></i>
            <a href="https://github.com/FridaPolished">Github</a> 
          </div>
          <div className="social">
            <i className="fab fa-linkedin"></i> 
            <a href="https://www.linkedin.com/in/frida-pulido/">Linkedin</a>
          </div>
          <a href="https://fridapulido.dev/">Portfolio</a>
        </div>
        <div>
          <h2>Noah Levin</h2>
            <div className="social">
              <i className="fab fa-angellist"></i>
              <a href="https://angel.co/noah-levin-2">Angelist</a>
            </div>
            <div className="social">
              <i className="fab fa-github-square"></i>
              <a href="https://github.com/nllevin">Github</a> 
            </div>
            <div className="social">
              <i className="fab fa-linkedin"></i> 
              <a href="https://www.linkedin.com/in/noah-levin">Linkedin</a>
            </div> 
          <a href="nllevin.com">Portfolio</a>
        </div>
        <div>
          <h2>Marvin Ma</h2>
          <div className="social">
            <i className="fab fa-angellist"></i>
            <a href="https://angel.co/marvin-ma-2">Angelist</a>
          </div>
          <div className="social">
            <i className="fab fa-github-square"></i>
            <a href="https://github.com/yma010">Github</a> 
          </div>
          <div className="social">
            <i className="fab fa-linkedin"></i> 
            <a href="https://www.linkedin.com/in/marvin-ma">Linkedin</a>
          </div>
          <a href="www.marvinma.dev">Portfolio</a>
        </div>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;