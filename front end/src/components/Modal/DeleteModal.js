import React from "react";

import { Button, Modal } from "react-bootstrap";

export default function DeleteModal(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          <h4 className={"titleContainer"} style={{paddingLeft: 0}}>
            Deletar do Sistema
          </h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>
          Tem certeza que deseja deletar este objeto?
        </h5>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onCancel}>Cancelar</Button>
        <Button onClick={() => props.onConfirm(props.infos.id)}>Deletar</Button>
      </Modal.Footer>
    </Modal>
  );
}