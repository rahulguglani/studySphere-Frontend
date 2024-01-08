import AddSubject from './AddSubject';
import AddResource from './AddResource';

const MyModal = (props) =>{
    return (
        <div>
            <div className="modal-wrapper" onClick={props.closeModal}></div>
            <div className="modal-container">
                
                {props.data === 'addSubject' && <AddSubject closeModal = {props.closeModal} rerender = {props.rerender}/>}
                {props.data === 'addResource' && <AddResource closeModal = {props.closeModal} rerender = {props.rerender} subjectId={props.arg}/>}
                {/* <h2>My modal</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, voluptate?</p> */}
                {/* <button onClick={props.closeModal}>Close</button> */}
            </div>
        </div>
    )
}

export default MyModal;
