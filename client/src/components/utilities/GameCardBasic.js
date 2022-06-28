import {useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import { setGame, getGames, deleteGame } from '../../features/library/librarySlice'
// import Spinner from '../components/spinner'
import { useState} from 'react'
import Modal from 'react-modal'
// Modal.setAppElement('')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '21'
  },
};

function GameCardBasic(game) {  
  
  const dispatch = useDispatch()
  // console.log(game.game)
  let subtitle
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const afterOpenModal = () => {
    subtitle.style.color='#f00'
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }
  return (
    <div className="gamecard-container" >
        <div className="gamecard-link" href={game.game.background_image}>
            <div className="gamecard-image-wrapper" onClick={openModal}>
              <img className="gamecard-image" src={game.game.background_image} alt=""  />
            </div>
            
            <div className="gamecard-info-container">
                <span className="gamecard-title">{game.game.name}</span>
                <ul className="gamecard-platforms">
                </ul>
            </div>
        </div>
      {modalIsOpen && <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>}
    </div>
  )
}

export default GameCardBasic