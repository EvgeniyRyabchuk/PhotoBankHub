import {Box, styled} from "@mui/material";


const CardItem = styled(Box)(({ theme, card, selectedCard }) => ({
    cursor: 'pointer',
    '& > .card-grid:hover': {
        backgroundColor: 'lightgrey',
    },
    '& > .card-grid': {
        backgroundColor: selectedCard && card.number === selectedCard.number || card.isMain == true
            ? theme.palette.grey.A400 : '',
    }
}));

const CardManagementWrapper = styled(Box)(({ theme, viewMode, cardListMinHeight}) => ({
    minWidth: '350px',
    height: cardListMinHeight ?? '321px',
    maxHeight: '321px',
    display: viewMode === 'full' ? 'flex' : 'block'
}));

const CardManagementHeader = styled(Box)(({ theme, viewMode}) => ({
    height: '12%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '24px 8px'
}));

const CardListWrapper = styled(Box)(({ theme, cardListMinHeight}) => ({
    height: cardListMinHeight ?? 'calc(88% - 48px)',
    overflowY: 'auto'
}));


export {
    CardItem,
    CardManagementWrapper,
    CardManagementHeader,
    CardListWrapper
}