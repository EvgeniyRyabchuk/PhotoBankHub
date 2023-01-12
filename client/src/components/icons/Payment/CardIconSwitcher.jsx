import React, {useMemo} from 'react';
import MasterCardIcon from "./MasterCardIcon";
import VisaCardIcon from "./VisaCardIcon";
import AmericanExpress from "./AmericanExpress";
import DefaultCard from "./DefaultCard";

const CardIconSwitcher = ({issuer}) => {

    return (
        <>
            {issuer === 'visa' && <VisaCardIcon />}
            {issuer === 'mastercard' && <MasterCardIcon />}
            {issuer === 'american-express' && <AmericanExpress />}

            {
                issuer !== 'visa' &&
                issuer !== 'mastercard' &&
                issuer !== 'american-express' &&
                 <DefaultCard />
            }

        </>
    );
};

export default CardIconSwitcher;