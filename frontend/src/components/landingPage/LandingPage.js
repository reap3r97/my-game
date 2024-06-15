import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Typography, Box, TextField, Grid } from '@mui/material';
import './LandingPage.css';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ openModal: true });
    }

    handleCloseModal() {
        this.setState({ openModal: false });
    }

    render() {
        const { openModal } = this.state;

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
                    >
                        Get Started!
                    </Button>
                </Box>
                <Modal open={openModal} onClose={this.handleCloseModal} className="modal">
                    <Box className="modal-content">
                        <Typography variant="h5">Login or Signup</Typography>
                        <form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Username"
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        variant="outlined"
                                        size="small"
                                        type="password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="primary"
                                        type="button"
                                        onClick={this.handleCloseModal}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Modal>
            </div>
        );
    }
}

export default LandingPage;
