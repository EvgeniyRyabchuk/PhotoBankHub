import React from 'react';
import StatusWrapper from "../index";
import ComingSoonImage from '../../../assets/images/misc-coming-soon.png';
import {useNavigate} from "react-router-dom";


const ComingSoon = () => {
    const navigate = useNavigate();


    return (
        <StatusWrapper>
            <div className="MuiBox-root css-1h4ae0y">
                <div className="MuiBox-root css-19vd9r8">
                    <div className="MuiBox-root css-1bxwoxr">
                        <h4
                        className="MuiTypography-root MuiTypography-h4 css-1svogxx">
                        We are launching soon
                    </h4>
                        <p
                        className="MuiTypography-root MuiTypography-body1 css-1toajlr">
                        We're creating something awesome.
                        Please subscribe to get notified when it's ready!
                        </p>
                    </div>
                    <form className="MuiBox-root css-gmuwbf" noValidate="" autoComplete="off">
                        <div className="MuiFormControl-root MuiTextField-root css-lrg42a">
                            <div
                                className="MuiInputBase-root MuiOutlinedInput-root
                                MuiInputBase-colorPrimary MuiInputBase-formControl
                                 MuiInputBase-sizeSmall css-ee8h2k">
                                <input aria-invalid="false" id=":r0:"
                                       placeholder="Enter your email"
                                       type="email"
                                       className="MuiInputBase-input MuiOutlinedInput-input
                                       MuiInputBase-inputSizeSmall css-qxqyiu"
                                       value="" />
                                    <fieldset aria-hidden="true"
                                              className="MuiOutlinedInput-notchedOutline  css-igs3ac">
                                        <legend className="css-ihdtdm">
                                            <span className="notranslate">​</span>
                                        </legend>
                                    </fieldset>
                                </div>
                        </div>
                        <button
                            className="MuiButtonBase-root MuiButton-root
                            MuiButton-contained MuiButton-containedPrimary
                            MuiButton-sizeMedium MuiButton-containedSizeMedium
                            MuiButton-root MuiButton-contained MuiButton-containedPrimary
                             MuiButton-sizeMedium MuiButton-containedSizeMedium css-10wm5t2"
                            tabIndex="0" type="submit">
                                Notify
                                <span className="MuiTouchRipple-root css-w0pj6f"></span>
                        </button>
                    </form>
                </div>
                <img
                    height="500"
                    alt="coming-soon-illustration"
                    src={ComingSoonImage}
                    className="css-cud2wc"
                />
                </div>
        </StatusWrapper>
    );
};

export default ComingSoon;