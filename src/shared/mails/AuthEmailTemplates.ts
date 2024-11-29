import { envs } from '@src/config';

class AuthEmailTemplates {
  static PasswordRecovery(userName: string): string {
    const template = `
      <div style="width: 80%; margin: 1rem auto; font-family: Arial, Helvetica, sans-serif;">
        <div>
          <p>Hola, ${userName}</p>
          <p>Hemos recibido una solicitud para la modificación de contraseña para su usuario de <strong>Empresa</strong>. Para modificar la contraseña de clic en el siguiente enlace. Le recordamos que el enlace tiene una vigencia de 30 minutos a partir de este momento.</p>
          <div style="text-align: center">
            <a href="${envs.ORIGIN + '/auth/password-change'}">Da clic aquí</a>
          </div>
          <br/>
          <p>Si usted no ha solicitado esta información, alguien lo habrá hecho por usted.</p>
          <p>Para cualquier duda estamos a su disposición a través del soporte de <strong>Empresa</strong></p>
          <p>Atentamente.</p>
          <strong>El equipo de Empresa</strong>
        </div>
      </div>
    `;

    return template;
  }
}

export default AuthEmailTemplates;
