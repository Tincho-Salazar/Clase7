import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Puedes agregar lógica de registro de errores aquí
        console.error('Error capturado:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Puedes personalizar el mensaje de error que se muestra al usuario
            return <h1>Hubo un error en la aplicación.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
