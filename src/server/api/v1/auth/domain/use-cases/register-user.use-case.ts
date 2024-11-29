// import JwtAdapter from '@src/shared/adapters/jwt.adapter';
// import { RegisterUserDto } from '../dtos';
// import { AuthRepository } from '../repositories';

// interface UserToken {
//   token: string;
//   user: {
//     id: string;
//     name: string;
//     email: string;
//   };
// }

// type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

// interface RegisterUserUseCase {
//   execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
// }

// class RegisterUser implements RegisterUserUseCase {
//   constructor(
//     private readonly authRepository: AuthRepository,
//     private readonly signToken: SignToken = JwtAdapter.generateToken
//   ) {}
//   async execute(registerUserDto: RegisterUserDto): Promise<any> {
//     const user = await this.authRepository.register(registerUserDto);

//     const token = await this.signToken({ id: user.id }, '2h');
//     if (!token) throw CustomError.internalServer('Internal Server Error');

//     return {
//       token: token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email
//       }
//     };
//   }
// }

// export default RegisterUser;
