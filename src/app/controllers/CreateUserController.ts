import { type Request } from '@/types/Request';
import { type Controller } from '@/types/Controller';
import { type CreateUserUseCase } from '@/app/usecases/CreateUserUseCase';
import { type Response } from '@/types/Response';
import { HttpErrorMessages } from '@/app/HttpErrorMessages';

interface CreateUserBody {
  name: string
  email: string
  password: string
}

export class CreateUserController implements Controller {

  constructor (private readonly creatUserUseCase: CreateUserUseCase) {}
  async handle (request: Request): Promise<Response> {

    // TODO: validar corpo da requisição contra um schema para garantir os campos de usuário
    const { name, email, password } = <CreateUserBody>request.body;
    try {

      const user = await this.creatUserUseCase.execute(name, email, password);
      const res: Response = {
        status: 200,
        body: user
      };

      return res;
    
    } catch (error) {

      const res: Response = {
        status: 409,
        body: HttpErrorMessages.userAlreadyExist
      };
      return res;
    
    }
  
  }

}
