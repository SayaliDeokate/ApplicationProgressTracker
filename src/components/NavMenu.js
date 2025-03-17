import React, { Component } from 'react';
import { Navbar, NavItem, NavLink, NavbarText } from 'reactstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            isToolTipOpen: false,
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    toggleToolTipOpen = () => {
        this.setState({ isToolTipOpen: !this.state.isToolTipOpen })
    }


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div>
                    <Navbar className="navbar">
                        <NavLink className="navlink" active tag={Link} to="/home">
                           Home
                        </NavLink>
                        <NavLink className="navlink" active tag={Link} to="/ProgressStatus">
                            Progress Statuses
                        </NavLink>
                        <NavLink className="navlink" active tag={Link} to="/Application">
                            Applications
                        </NavLink>
                        <NavbarText className="navbar-text"> Hello there!</NavbarText>
                </Navbar>
            </div>
            </nav>
        );
    }
}
