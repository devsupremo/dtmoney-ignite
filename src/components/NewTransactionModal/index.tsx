import Modal from 'react-modal';
import { Container } from './styles';

interface NewTransactionModalProps{
  isOpen: boolean;
  onRequestClose: () => void;
}

export default function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
  return (
    <Modal
          isOpen={isOpen} 
          onRequestClose={onRequestClose}
          overlayClassName="react-modal-overlay"
          className="react-modal-content"
    >
          <Container>
          <h2>Cadastrar transação</h2>
          <input placeholder="Titulo"/>

          <input type="number" placeholder="Valor" />

          <input placeholder="Categoria" /> 

          <button type="submit" />
          </Container>
    </Modal>
  )
}
