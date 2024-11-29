import { ZodError } from 'zod';

class ErrorHandler {
  // Mapa de códigos de error y mensajes específicos
  private static nodemailerErrors: Record<string, string> = {
    EAUTH: 'Error de autenticación: Credenciales incorrectas para el servidor de correo.',
    ECONNECTION:
      'Error de conexión: No se pudo conectar al servidor de correo. Verifique la configuración de host y puerto.',
    ESMTP:
      'Error de protocolo SMTP: El servidor rechazó la solicitud de envío. Verifique la configuración del servidor.',
    EENVELOPE: 'Error de destinatario: La dirección de correo electrónico proporcionada no es válida.',
    ETIMEDOUT: 'Error de tiempo de espera: El servidor de correo no respondió a tiempo. Intente de nuevo más tarde.',
    ESOCKET: 'Error de socket: Tiempo de espera agotado al conectar con el servidor de correo.'
  };

  static validate(error: unknown): string {
    if (error instanceof ZodError) {
      const zError = JSON.parse(error.message)[0].message;
      return zError;
    }

    // Manejo de errores de nodemailer
    if (error instanceof Error && 'code' in error) {
      const nodemailerMessage = this.nodemailerErrors[error.code as string];
      if (nodemailerMessage) {
        return nodemailerMessage;
      }
    }

    // Otros errores desconocidos
    return error?.toString() || 'Error desconocido';
  }
}

export default ErrorHandler;
