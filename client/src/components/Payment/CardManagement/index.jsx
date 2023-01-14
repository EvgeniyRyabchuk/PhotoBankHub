import React, {useEffect, useState} from 'react';
import CreditCardModal from "../../modals/CreditCardModal";
// import {Card as CardType} from "../../../../types/card";
import CardIconSwitcher from "../../icons/Payment/CardIconSwitcher";
// @ts-ignore
import Card from 'react-credit-cards-2';
import {useAction} from "../../../hooks/useAction";
import {useSelector} from "react-redux";
import {Box, Button, Grid, styled, Typography} from "@mui/material";
import {getLast4Numbers} from "../shared";
import CreditCardService from "../../../services/CreditCardService";
import {Add, Delete, Edit, PlusOne} from "@mui/icons-material";
import {CardItem, CardListWrapper, CardManagementHeader, CardManagementWrapper} from "./styled";


const CardManagement = ({ viewMode= 'full', onCardSelected}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState('create');
    // const [cards, setCards] = useState<CardType[]>([]);
    const [selectedCard, setSelectedCard] = useState(null);

    const { setCards } = useAction();
    const { cards } = useSelector(state => state.card);

    useEffect(() => {
        if(selectedCard) {
            const card = cards.find(c => c.id === selectedCard.id);
            if(card) {
                setSelectedCard(card);
            } else {
                setSelectedCard(null);
            }
        }
    }, [cards])

    const fetchCards = async () => {
        const { data } = await CreditCardService.getCards();
        setCards(data);
    }

    useEffect(() => {
        fetchCards();
    }, []);

    const addCard = () => {
        setIsOpen(true);
        setMode('create');
    }

    const deleteCard = () => {
        if(selectedCard) {
            const newCards = cards.filter(card => card.number !== selectedCard.number);
            setCards(newCards);
            setSelectedCard(null);
        }
    }

    const updateCard = () => {
        setMode('update');
        setIsOpen(true);
    }

    const onCardDeleteHandler = async (card) => {
        const { data } = await CreditCardService.deleteCard(card.id);

        const newCards = cards.filter(c => c.id !== card.id);
        setCards(newCards);

        if(selectedCard && selectedCard.id === card.id) {
            setSelectedCard(null);
        }
    }

    return (
        <CardManagementWrapper viewMode={viewMode} >
            <CardManagementHeader>
                <Typography variant='h4'>
                    Cards
                </Typography>
                <Button onClick={addCard}>
                    Add Card
                    <Add />
                </Button>
            </CardManagementHeader>

            <CardListWrapper>
                { cards.map((card) =>
                        <CardItem
                            card={card}
                            selectedCard={selectedCard}
                            key={card.id}
                            onClick={() => {
                                setSelectedCard(card);
                                onCardSelected(card);
                            }}>
                            <Grid container className='card-grid' sx={{ p: 1}}>
                                <Grid xs={9} sm={9} md={9} lg={9} xl={9}
                                      sx={{
                                          display: 'flex',
                                          justifyContent: 'start',
                                          alignItems: 'center'
                                      }}>
                                    <CardIconSwitcher
                                        issuer={card.issuer}
                                    />
                                    <Box sx={{ display: 'flex'}}>
                                        <div style={{ margin: '0 5px'}}>
                                            Credit Card
                                        </div>
                                        <div style={{ margin: '0 5px'}} >
                                            {getLast4Numbers(card)}
                                        </div>
                                    </Box>
                                    <div>
                                        <div>
                                            {card.name}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <div style={{ display: 'flex', justifyContent: 'right'}}>
                                        <Button>
                                            <Edit />
                                        </Button>
                                        <Button onClick={() => onCardDeleteHandler(card)}>
                                            <Delete />
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </CardItem>
                    )
                }
            </CardListWrapper>

            <CreditCardModal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
                transferCard={selectedCard}
                mode={mode}
                order={null}
            />
        </CardManagementWrapper>
    );
};

export default CardManagement;