import { CircularProgress } from '@mui/material';

export const LoadingState = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <CircularProgress />
            <span className="ml-4">Carregando...</span>
        </div>
    );
};