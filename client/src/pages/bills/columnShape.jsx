import {H6, Small, Tiny} from "../../assets/typography";
import {FlexBox, JustifyBox} from "../../assets/shared/styles";
import moment from "moment";
import {Box, Button, Typography} from "@mui/material";
import {Download} from "@mui/icons-material";
import CardIconSwitcher from "../../components/icons/Payment/CardIconSwitcher";

const BillsListColumnShape = [
    {
        accessor: 'issuer',
        maxWidth: 0,
        Cell: () => <></>
    },
    {
        accessor: 'last_card_number',
        maxWidth: 0,
        Cell: () => <></>
    },
    {
        Header: ({ value }) => (<div style={{ textAlign: 'center'}}>ID</div>),
        accessor: 'id',
        minWidth: 50,
        Cell: ({ value }) => (<div style={{ textAlign: 'center'}}>{value}</div>),
    },
    {
        Header: ({ value }) => (<div style={{ textAlign: 'center'}}>Amount</div>),
        accessor: 'plan',
        minWidth: 50,
        Cell: ({ value }) =>
            (<div style={{ textAlign: 'center'}}>
                ${value.amount}
            </div>),
    },
    {
        Header: ({ value }) => (<div style={{ textAlign: 'center'}}>Status</div>),
        accessor: "bill_status",
        minWidth: 200,
        Cell: ({ rows, value }) => (
            <>
                <Small
                    sx={{
                        borderRadius: 10,
                        padding: ".2rem 1rem",
                        color: "background.paper",
                        backgroundColor: `${value.bgColor}`,
                    }}
                >
                    {value.name}
                </Small>

            </>
        ),
    },
    {
        Header: ({ value }) => (<div style={{ textAlign: 'center'}}>Date</div>),
        accessor: "updated_at",
        minWidth: 150,
        Cell: ({ value, row }) => (
            <>
                {
                    row.values.bill_status.name !== 'New' &&
                    <Small
                        sx={{
                            borderRadius: 10,
                            padding: ".2rem 1rem",
                            color: "background.paper",
                            backgroundColor: "#B233CF",
                        }}
                    >
                        {moment(value).format('yyyy-mm-DD')}
                    </Small>
                }
            </>
        ),
    },
    {
        id: 'payment',
        minWidth: 200,
        Header: ({ value }) => (<div style={{ textAlign: 'center'}}>Payment Method</div>),
        Cell: ({ row }) => (
            <JustifyBox>
                {
                    row.values.bill_status.name !== 'New' ?
                    <>
                        <CardIconSwitcher issuer={row.values.issuer} />
                        <Box>
                            <div style={{ margin: '0 5px'}}>
                                {row.values.issuer ?? 'unknown'}
                            </div>
                            <div style={{ margin: '0 5px'}} >
                                **** {row.values.last_card_number}
                            </div>
                        </Box>
                    </> :
                    <Box>
                    </Box>
                }

            </JustifyBox>
        )
    },
    {
        Header: "Actions",
        id: "actions",
        minWidth: 100,
        maxWidth: 100,
        Cell: ({ row }) => (
            <div>
                <Button onClick={async (e) => {
                    console.log(row.values)
                }}>
                    PDF
                    <Download />
                </Button>
            </div>
        )
    },
];

export default BillsListColumnShape;

