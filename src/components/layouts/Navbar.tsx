import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts';
import { AppBar, Box, Button, Toolbar } from '@mui/material';



export const Navbar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { handleLogout } = useAuthContext();
    const navigate = useNavigate();
    return (

        <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>

            <AppBar >
                <Toolbar>
                    <Button
                        onClick={() => navigate('/')}
                        color='inherit'
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Início
                    </Button>

                    <Button
                     onClick={() => navigate('/jogar')}
                        color='inherit'
                        sx={{ fontSize: 18, flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Jogar
                    </Button>

                    <Button
                        onClick={() => navigate('/')}
                        color='inherit'
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Conta
                    </Button>

                    <Button
                        onClick={() => handleLogout()}
                        color='inherit'
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Sair
                    </Button>
                </Toolbar>
            </AppBar>


            {children}

        </Box>
    );
};
