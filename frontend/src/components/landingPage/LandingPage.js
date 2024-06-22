import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Typography, Box, TextField, Grid } from '@mui/material';
import './LandingPage.css';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            isLogin: true,
            showForgotPassword: false,
            usernameOrEmail: '',
            password: ''
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
    }

    handleOpenModal() {
        this.setState({ openModal: true });
    }

    handleCloseModal() {
        this.setState({
            openModal: false,
            isLogin: true,
            showForgotPassword: false,
            usernameOrEmail: '',
            password: ''
        });
    }

    toggleForm() {
        this.setState((prevState) => ({
            isLogin: !prevState.isLogin,
            showForgotPassword: false,
            usernameOrEmail: '',
            password: ''
        }));
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleLoginSubmit(event) {
        event.preventDefault();
        console.log('Logging in with:', this.state.usernameOrEmail, this.state.password);
        this.setState({
            openModal: false,
            usernameOrEmail: '',
            password: ''
        });
    }

    handleForgotPassword(event) {
        event.preventDefault();
        console.log('Forgot password for:', this.state.usernameOrEmail);
        this.setState({
            openModal: false,
            usernameOrEmail: '',
            password: ''
        });
    }

    render() {
        const { openModal, isLogin, showForgotPassword } = this.state;

        return (
            <div className="landingPage">
                <nav className="top-nav">
                    <Link to="/" className="game-name">My Game</Link>
                </nav>
                <Box className="content">
                    <Typography variant="h2" component="h2">Welcome to My Game</Typography>
                    <Typography variant="body1" paragraph>
                        Some crime game I am working on
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleOpenModal}
                        className="button"
                        textTransform="none"
                    >
                        Get Started!
                    </Button>
                </Box>
                <Modal open={openModal} onClose={this.handleCloseModal} className="modal">
                    <Box className="modal-content">
                        <div className="modal-header">
                        </div>
                        {showForgotPassword ? (
                            <>
                                <Typography variant="h5">Forgot Password</Typography>
                                <form style={{ width: '100%' }} onSubmit={this.handleForgotPassword}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Username or Email*"
                                                variant="outlined"
                                                size="small"
                                                margin="normal"
                                                name="usernameOrEmail"
                                                value={this.state.usernameOrEmail}
                                                onChange={this.handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                            >
                                                Submit
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                color="primary"
                                                onClick={this.handleCloseModal}
                                            >
                                                Cancel
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                                <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                                    <Link
                                        to="#"
                                        onClick={() => this.setState({ showForgotPassword: false })}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Back to Login
                                    </Link>
                                </Typography>
                            </>
                        ) : (
                            <>
                                <Typography variant="h5">{isLogin ? 'Log In' : 'Sign Up'}</Typography>
                                <form style={{ width: '100%' }} onSubmit={this.handleLoginSubmit}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Username or Email*"
                                                variant="outlined"
                                                size="small"
                                                margin="normal"
                                                name="usernameOrEmail"
                                                value={this.state.usernameOrEmail}
                                                onChange={this.handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Password*"
                                                variant="outlined"
                                                size="small"
                                                type="password"
                                                margin="normal"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                            >
                                                {isLogin ? 'Login' : 'Sign up'}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                color="primary"
                                                onClick={this.handleCloseModal}
                                            >
                                                Cancel
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                                <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                                    <Link
                                        to="#"
                                        onClick={() => this.setState({ showForgotPassword: true })}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Forgot password?
                                    </Link>
                                    <br />
                                    {isLogin ? (
                                        <>
                                            New to the game?{' '}
                                            <Button onClick={this.toggleForm} color="primary" style={{ textTransform: 'none' }}>
                                                Sign up
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            Already have an account?{' '}
                                            <Button onClick={this.toggleForm} color="primary" style={{ textTransform: 'none' }}>
                                                Log in
                                            </Button>
                                        </>
                                    )}
                                </Typography>
                            </>
                        )}
                    </Box>
                </Modal>
            </div>
        );
    }
}

export default LandingPage;
