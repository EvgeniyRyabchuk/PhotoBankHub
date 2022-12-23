
/*

<div className='header'>
    Header

    <ul>
        <li>
            <NavLink to='/'a>
                Home
            </NavLink>
        </li>
        <li>
            <NavLink to='/plans'>
                Plans
            </NavLink>
        </li>

        { !isAuth &&
            <>
                <li>
                    <NavLink to='/login'>
                        LogIn
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/register'>
                        Register
                    </NavLink>
                </li>
            </>
        }

        { isAuth &&
            <>
                <li>
                    <NavLink to='/profile'>
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/login");
                            logout();
                        }}
                    >
                        Logout
                    </NavLink>
                </li>
            </>
        }

    </ul>
</div>

 */

