import React from 'react';

export default function DeleteConfirmationDialog({ open, onClose, onConfirm }) {
    return (
        <div className={`modal ${open ? 'show' : ''}`} style={{ display: open ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmation de suppression</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>Supprimer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
