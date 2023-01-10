import React from 'react';
import './index.scss';
import {Close} from "@mui/icons-material";
import {Box, IconButton, styled} from "@mui/material";

// export type ModalTransitionType = 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven';

// interface Modal {
//     isOpen: boolean,
//     onClose: () => void
// }

const Wrapper = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5px'
}))

const ModalWithTransition
    = ({children, type, isOpen, onClose, title}) => {

    const modalContainerClick = () => {
        onClose();
    }

    return (
        <div className={isOpen ? 'modal-active' : ''}
             onMouseDown={modalContainerClick} >
            <div id="modal-container"
                 onMouseUp={(e => {
                     e.stopPropagation();
                 })}
                 className={isOpen && type ? type : ''}>
                <div className="modal-background">
                    <div className="modal"
                         onMouseUp={(e) =>
                             e.stopPropagation()}
                         onMouseDown={(e) =>
                             e.stopPropagation()}

                         onClick={(e) => {
                            e.stopPropagation();
                         }}>
                        <Wrapper>
                            <h4>{title}</h4>
                            <IconButton onClick={onClose}>
                                <Close />
                            </IconButton>
                        </Wrapper>
                        <hr style={{ marginBottom: '20px'}}/>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ModalWithTransition;