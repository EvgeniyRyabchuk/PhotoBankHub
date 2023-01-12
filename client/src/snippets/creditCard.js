

/*


     <div className="card-detail-right" style={{ width: viewMode === 'mini' ? '100%' : '30%'}}>
                    <div className="tel tep hp ttp tth l ttr co ttd ttv border-slate-200 tte te_">
                        <div className="vl vs ttm">
                            <div className="ul na ttn">
                                <div className="text-slate-800 gh gn rh">
                                    { selectedCard ? 'Physical Metal Card Summary' : 'No Selected Card'}
                                </div>
                                <Card
                                    number={selectedCard?.number ?? ''}
                                    name={selectedCard?.name ?? ''}
                                    expiry={selectedCard?.expiry ?? ''}
                                    cvc={selectedCard?.cvc ?? ''}
                                    focused={'name'}
                                    callback={() => {}}
                                />
                                { selectedCard &&
                                    <>
                                        <div className="rk">
                                            <div className="text-sm gh text-slate-800 rt">Details</div>
                                            <ul>
                                                <li className="flex items-center fe vo cs border-slate-200">
                                                    <div className="text-sm">Card Name</div>
                                                    <div className="text-sm gp text-slate-800 nq">
                                                        Physical Metal Card
                                                    </div>
                                                </li>
                                                <li className="flex items-center fe vo cs border-slate-200">
                                                    <div className="text-sm">Status</div>
                                                    <div className="flex items-center lm">
                                                        <div className="w-2 h-2 rounded-full hd mr-2"></div>
                                                        <div className="text-sm gp text-slate-800">Active</div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="flex items-center fl rk">
                                            <div className="ok">
                                                <button
                                                    onClick={() => updateCard()}
                                                    className="btn ou border-slate-200
                                         hover--border-slate-300 g_">
                                                    <svg className="oo sl du text-slate-500 ub"
                                                         viewBox="0 0 16 16">
                                                        <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z"></path>
                                                    </svg>
                                                    <span className="nq">Edit Card</span>
                                                </button>
                                            </div>
                                            <div className="ok">
                                                <button
                                                    onClick={() => deleteCard()}
                                                    className="btn ou border-slate-200 hover--border-slate-300 yl">

                                                    <svg className="oo sl du ub" viewBox="0 0 16 16">
                                                        <path d="M14.574 5.67a13.292 13.292 0 0 1 1.298 1.842 1 1 0 0 1 0 .98C15.743 8.716 12.706 14 8 14a6.391 6.391 0 0 1-1.557-.2l1.815-1.815C10.97 11.82 13.06 9.13 13.82 8c-.163-.243-.39-.56-.669-.907l1.424-1.424ZM.294 15.706a.999.999 0 0 1-.002-1.413l2.53-2.529C1.171 10.291.197 8.615.127 8.49a.998.998 0 0 1-.002-.975C.251 7.29 3.246 2 8 2c1.331 0 2.515.431 3.548 1.038L14.293.293a.999.999 0 1 1 1.414 1.414l-14 14a.997.997 0 0 1-1.414 0ZM2.18 8a12.603 12.603 0 0 0 2.06 2.347l1.833-1.834A1.925 1.925 0 0 1 6 8a2 2 0 0 1 2-2c.178 0 .348.03.512.074l1.566-1.566C9.438 4.201 8.742 4 8 4 5.146 4 2.958 6.835 2.181 8Z"></path>
                                                    </svg>
                                                    <span className="nq">
                                                        Delete
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>



 */