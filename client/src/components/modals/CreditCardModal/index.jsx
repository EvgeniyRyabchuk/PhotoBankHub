import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import ModalWithTransition from "../ModalWithTransition";
import {useSelector} from "react-redux";
import {useAction} from "../../../hooks/useAction";
import {Grid} from "@mui/material";
import Creditcard from "../../Payment/Creditcard";
import CardManagement from "../../Payment/CardManagement";
import CreditCardService from "../../../services/CreditCardService";


// interface Modal {
//     isOpen: boolean,
//     onClose: () => void,
//     mode?: 'create' | 'update' | 'pay';
//     transferCard?: CardType | null | undefined;
//     order: Order | null;
// }

const CreditCardModal = ({
           isOpen,
           onClose,
           withCards = false,
           mode = 'create',
           transferCard,
           order
}) => {

    const { setCards } = useAction();

    const { cards } = useSelector(state => state.card);

    const { setLastTransaction } = useAction();

    const [selectedCard, setSelectedCard] = useState(transferCard);

    // useEffect(() => {
    //     if(transferCard) {
    //         setSelectedCard(transferCard);
    //     }
    // }, [transferCard]);

    const navigate = useNavigate();

    const handleCardFormSubmit = async (card, paymentDetail) => {
        card.number = card.number.replace(/\s/g, '');
        const expArr = card.expiry.split('/')
        card.expire_month = expArr[0];
        card.expire_year = expArr[1];

        if(mode === 'create')  {
            const { data } = await CreditCardService.addCard(card);
            setCards([...cards, card]);
        }
        else if(mode === 'update') {
            const { data } = await CreditCardService.updateCard(card);
            setCards([...cards, card]);
        }
    }

    return (
        <ModalWithTransition isOpen={isOpen} type='two' onClose={onClose}>
            <Creditcard
                mode={mode}
                onSubmit={(card, payAndSave) => {
                    handleCardFormSubmit(card, payAndSave);
                    onClose();
                }}
                transferCard={selectedCard}
                order={null}
            />
        </ModalWithTransition>
    );
};

export default CreditCardModal;