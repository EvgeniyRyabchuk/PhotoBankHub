import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import ModalWithTransition from "../ModalWithTransition";
import {useSelector} from "react-redux";
import {useAction} from "../../../hooks/useAction";
// import Creditcard from "../../Payment/Creditcard";
// import Index from "../ModalWithTransition";
// import {Grid} from "@mui/material";
// import {Card as CardType, PaymentDetail} from "../../../types/card";
// import {useAction} from "../../../hooks/useAction";
// import {useTypeSelector} from "../../../hooks/useTypedSelector";
// import CardManagment from "../../../pages/profile/Tabs/payment/CardManagment";
// import {TransactionService} from "../../../services/TransactionService";
// import {Order} from "../../../types/order";
// import {useNavigate} from "react-router-dom";

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

    useEffect(() => {
        if(transferCard) {
            setSelectedCard(transferCard);
        }
    }, [transferCard]);


    const navigate = useNavigate();

    console.log(selectedCard);

    const handleCardFormSubmit = async (card, paymentDetail) => {

        console.log(123);

        if(mode === 'pay' && paymentDetail) {
            const { summa, payAndSave, orderId } = paymentDetail;
            // paying
            if(summa) {
                card.number = card.number.replace(/\s/g, '');
                // const { data } = await TransactionService.pay(card, summa, orderId)

                if(payAndSave) {
                    setCards([...cards, card]);
                }

                // setLastTransaction(data);

                navigate('/messages/statuses/payment-success');
            }

        } else if(mode === 'create' || mode === 'update') {
            const lsCards = localStorage.getItem('cards');
            if(lsCards) {
                const cards = JSON.parse(lsCards);
                if(Array.isArray(cards)) {
                    let newCards = [];
                    if(mode === 'create') {
                        const cardExistList = cards.find(e => e.number === card.number);
                        if(cardExistList) { return; }

                        newCards = [...cards, card];
                    }
                    else if(mode === 'update') {
                        newCards = cards.map(e =>
                            e.id === card.id ? card : e
                        );
                    }
                    setCards(newCards);
                    return;
                }
            }
            setCards([card]);
        }
    }

    return (
        <ModalWithTransition isOpen={isOpen} type='two' onClose={onClose}>
            {{ /*

                       {
                withCards ?
                    <Grid container spacing={3} sx={{ height: '600px', overflowY: 'auto'}}>
                        <Grid item md={6}>
                            <Creditcard
                                mode='pay'
                                transferCard={selectedCard}
                                onSubmit={(card, paymentDetail?: PaymentDetail) => {
                                    handleCardFormSubmit(card, paymentDetail);
                                    onClose();
                                }}
                                order={order}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <CardManagment
                                viewMode='mini'
                                onCardSelected={(card) => {
                                    setSelectedCard(card)
                                }}
                            />
                        </Grid>
                    </Grid>
                    :
                <Creditcard
                    mode={mode}
                    onSubmit={(card, payAndSave) => {
                        handleCardFormSubmit(card, payAndSave);
                        onClose();
                    }}
                    transferCard={selectedCard}
                    order={null}
                />
            }


            */}}

        </ModalWithTransition>
    );
};

export default CreditCardModal;