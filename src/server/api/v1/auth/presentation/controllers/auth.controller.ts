import { envs, expirationTimes } from '@src/config';
import { CustomError, ErrorHandler } from '@src/shared/errors';
import { ResponseHandler } from '@src/shared/utils';
import { Request, Response } from 'express';

import { LoginDto, PasswordChangeDto } from '../../domain/dtos';
import { AuthRepository } from '../../domain/repositories';
import { Login, Logout, PasswordChange, PasswordReset, RefreshToken } from '../../domain/use-cases';

class AuthController {
  private readonly authRepository: AuthRepository;

  // Dependency injection
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;

    this.login = this.login.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.logout = this.logout.bind(this);
    this.passwordReset = this.passwordReset.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
  }

  async login(req: Request, res: Response) {
    const [error, loginDto] = LoginDto.create(req.body);

    if (error) return ResponseHandler.send(res, 400, error);

    // const ipAddress = req.ip; // Get the client's IP
    const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress; // Get the client's IP
    const deviceInfo = req.headers['user-agent'] || 'unknown device'; // Get device information

    new Login(this.authRepository)
      .execute(loginDto!, ipAddress!, deviceInfo)
      .then(({ refreshToken, user }) => {
        res.cookie('refresh-token', refreshToken, {
          httpOnly: true, // Ensures that the cookie is not accessible from the client side
          // secure: envs.NODE_ENV === 'production', //Will only be sent over HTTPS in production
          // sameSite: 'strict', // Protects against CSRF attacks
          expires: new Date(Date.now() + expirationTimes['30_DAYS']) // 30 days
        });

        ResponseHandler.send(res, 200, 'Usuario logueado', { refreshToken, user });
      })
      .catch((error) => {
        if (error instanceof CustomError) return ResponseHandler.send(res, error.statusCode, error.message);
        ResponseHandler.send(res, 500, ErrorHandler.validate(error));
      });
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.params.refresh_token;
    const userId = BigInt(req.params.user_id);

    new RefreshToken(this.authRepository)
      .execute({ user_id: userId, refresh_token: refreshToken })
      .then((newAccessToken) => ResponseHandler.send(res, 200, 'Token refreshed', { accessToken: newAccessToken }))
      .catch((error) => {
        if (error instanceof CustomError) return ResponseHandler.send(res, error.statusCode, error.message);
        ResponseHandler.send(res, 500, ErrorHandler.validate(error));
      });
  }

  async logout(req: Request, res: Response) {
    const userId = BigInt(req.params.user_id);
    // const ipAddress = req.ip; // Get the client's IP
    const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress; // Get the client's IP
    const deviceInfo = req.headers['user-agent'] || 'unknown device'; // Get device information

    new Logout(this.authRepository)
      .execute({ user_id: userId, ip_address: ipAddress!, device_info: deviceInfo })
      .then(() => {
        res.clearCookie('refresh-token');
        ResponseHandler.send(res, 200, 'Sesión finalizada');
      })
      .catch((error) => {
        if (error instanceof CustomError) return ResponseHandler.send(res, error.statusCode, error.message);
        ResponseHandler.send(res, 500, ErrorHandler.validate(error));
      });
  }

  async passwordReset(req: Request, res: Response) {
    const { email } = req.body;
    new PasswordReset(this.authRepository)
      .execute(email)
      .then(({ passwordChangeToken }) => {
        res.cookie('password-change-token', passwordChangeToken, {
          httpOnly: true, // Ensures that the cookie is not accessible from the client side
          secure: envs.NODE_ENV === 'production', //Will only be sent over HTTPS in production
          sameSite: 'strict', // Protects against CSRF attacks
          expires: new Date(Date.now() + expirationTimes['15_MINUTES']) // 15 minutes
        });

        ResponseHandler.send(res, 200, 'Correo electrónico enviado');
      })
      .catch((error) => {
        if (error instanceof CustomError) return ResponseHandler.send(res, error.statusCode, error.message);
        ResponseHandler.send(res, 500, ErrorHandler.validate(error));
      });
  }

  async passwordChange(req: Request, res: Response) {
    const passwordChangeToken = req.cookies?.['password-change-token'];
    const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress; // Get the client's IP
    const deviceInfo = req.headers['user-agent'] || 'unknown device'; // Get device information

    const [error, passwordChangeDto] = PasswordChangeDto.create(req.body);
    if (error) return ResponseHandler.send(res, 400, error);
    if (!passwordChangeToken) return ResponseHandler.send(res, 401, 'No hay ninguna solicitud de cambio de contraseña');

    new PasswordChange(this.authRepository)
      .execute(passwordChangeDto!, passwordChangeToken, ipAddress!, deviceInfo)
      .then(({ refreshToken, user }) => {
        res.clearCookie('password-change-token');

        res.cookie('refresh-token', refreshToken, {
          httpOnly: true, // Ensures that the cookie is not accessible from the client side
          secure: envs.NODE_ENV === 'production', //Will only be sent over HTTPS in production
          sameSite: 'strict', // Protects against CSRF attacks
          expires: new Date(Date.now() + expirationTimes['30_DAYS']) // 30 days
        });

        ResponseHandler.send(res, 200, 'Usuario logueado', { refreshToken, user });
      })
      .catch((error) => {
        if (error instanceof CustomError) return ResponseHandler.send(res, error.statusCode, error.message);
        ResponseHandler.send(res, 500, ErrorHandler.validate(error));
      });
  }

  protected(_req: Request, res: Response) {
    res.json('ruta protegida');
  }

  // registerUser = (req: Request, res: Response) => {
  //   const [error, registerUserDto] = RegisterUserDto.create(req.body);
  //   if (error) return res.status(400).json({ error });

  //   new RegisterUser(this.authRepository)
  //     .execute(registerUserDto!)
  //     .then((data) => res.json(data))
  //     .catch((error) => this.handleError(error, res));
  // };
}

export default AuthController;
