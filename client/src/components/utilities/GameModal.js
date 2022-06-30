import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.7)',
  zIndex: 1000
}

function GameModal({open, children, onClose, game}) {
  if(!open){
    return null
  }

  console.log(game)
  return ReactDom.createPortal(
    <>
    <div style={OVERLAY_STYLES}></div>
    <div style={MODAL_STYLES} className="modal-container">
      <button className="modal-close-btn" onClick={onClose}>X</button>
      <img className="modal-image" src={game.game.background_image} alt="game image" />
      {children}{children}
    </div>
  
    </>,
    document.getElementById('portal')
    )
}

export default GameModal