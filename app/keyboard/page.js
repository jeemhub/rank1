'use client'
import { useState } from 'react';
import { Modal, Button, Grid } from '@nextui-org/react';

export default function KeyboardPage() {
  const [visible, setVisible] = useState(false);
  const [currentKey, setCurrentKey] = useState(null);

  const keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  const openModal = (key) => {
    setCurrentKey(key);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setCurrentKey(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-3 gap-4">
        {keys.map((key) => (
          <div key={key}>
            <Button
              shadow
              color="primary"
              auto
              onClick={() => openModal(key)}
              className="w-20 h-20 text-xl"
            >
              {key}
            </Button>
          </div>
        ))}
      </div>

      <Modal closeButton aria-labelledby="modal-title" open={visible} onClose={closeModal}>
        <Modal.Header>
          <h1 className="text-2xl">Key {currentKey}</h1>
        </Modal.Header>
        <Modal.Body>
          <p>This is the content for key {currentKey}.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
