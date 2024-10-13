import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      maxWidth: '80%',  
      maxHeight: '80%',  
      overflow: 'auto',  
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

Modal.setAppElement('#root');

export default function DeleteConfirmationDialogForage({ open, onClose, onConfirm }) {
 
  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Confirmation de suppression"
    >
      <div className="modal-header">
        <h5 className="modal-title">Confirmation de suppression</h5>
        <button type="button" className="close" onClick={onClose}>
          <span>&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <p>Êtes-vous sûr de vouloir supprimer ce fourrage ?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
        <button type="button" className="btn btn-danger" onClick={onConfirm}>Supprimer</button>
      </div>
    </Modal>
  );
}
