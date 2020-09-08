import React, {useState} from "react";
import { Modal, Button, FormControl } from "react-bootstrap";

const AddModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> 

      <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>New Element</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                
                <FormControl
                  id="topic"
                  type="text"
                  placeholder="About what do you want to?"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.props.add}>
                  Add
                </Button>
              </Modal.Footer>
            </Modal>
    </>
  );
}

export default AddModal;