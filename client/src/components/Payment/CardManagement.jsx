import React, {useEffect, useState} from 'react';
import CreditCardModal from "../modals/CreditCardModal/index";
// import {Card as CardType} from "../../../../types/card";
import CardIconSwitcher from "../icons/Payment/CardIconSwitcher";
import './payment.scss'

// @ts-ignore
import Card from 'react-credit-cards-2';
import {useAction} from "../../hooks/useAction";
import {useSelector} from "react-redux";
import {Button, styled} from "@mui/material";
import {getLast4Numbers} from "./card";
import CreditCardService from "../../services/CreditCardService";
import {Delete, Edit} from "@mui/icons-material";

const CardItem = styled('label')(({ theme, card, selectedCard }) => ({
    cursor: 'pointer',
    '& :hover': {
      backgroundColor: 'lightgrey',
    },
    '& > .dw': {
        border: selectedCard && card.number === selectedCard.number ? "1px solid black" : '',
        backgroundColor: selectedCard && card.number === selectedCard.number
            ? theme.palette.secondary.light : '',
    }
}));

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


    return (
        <div className="tef teb" style={{ display: viewMode === 'full' ? 'flex' : 'block'}}>
            <CreditCardModal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
                transferCard={selectedCard}
                mode={mode}
                order={null}
            />

            <div className="vs jj ttm vl card-list-left"
                 style={{ width: viewMode === 'mini' ? '100%' : '70%'}}
            >
                <div className="je jd jc ii">
                    <div className="ri _y">
                        <h1 className="gu teu text-slate-800 font-bold">Cards ✨</h1>
                    </div>
                    <button className="btn ho xi ye" onClick={addCard}>
                        <svg className="oo sl du bf ub" viewBox="0 0 16 16">
                            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                        </svg>
                        <button className="hidden trm nq">
                            Add Card
                        </button>
                    </button>
                </div>

                 Card List

                <div className="fb block al gt ou" >
                    { cards.map((card) =>
                            <CardItem
                                card={card}
                                selectedCard={selectedCard}
                                key={card.id}
                                onClick={() => {
                                    setSelectedCard(card);
                                    onCardSelected(card);
                                }}>

                                <div className="dw rounded border border-slate-200
                                     hover--border-slate-300 bv wi wu">
                                    <div className="sn ag items-center fo">
                                        <div className="ne tj _l _h
                                             flex items-center
                                              fy tt_ trl"
                                             style={{ display: 'flex' }}
                                        >
                                            <CardIconSwitcher
                                                issuer={card.issuer}
                                            />
                                            <div>
                                                <div className="text-sm gp text-slate-800">
                                                    Credit Card
                                                </div>
                                                <div className="go">**
                                                    {
                                                        getLast4Numbers(card)
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div className="ne tq _l _h gt qt ttq trh">
                                            <div className="text-sm gp text-slate-800 ld">
                                                {card.name}
                                            </div>
                                        </div>

                                        <div className="ne tq _l _d gr ttq trh">
                                            <div className="go inline-flex gp hc ys rounded-full gn vp vf">
                                                Active
                                            </div>
                                        </div>

                                        <div className="ne tj _l _p gr qt tt_ trc">
                                            <div style={{ display: 'flex', justifyContent: 'right'}} className="text-sm">
                                                <Button>
                                                    <Edit />
                                                </Button>
                                                <Button>
                                                    <Delete />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="g w cr cp _i rounded pointer-events-none" aria-hidden="true">
                                </div>

                            </CardItem>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default CardManagement;