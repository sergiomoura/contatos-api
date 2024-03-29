import { AddContactUseCase } from '@/usecases/AddContactUseCase';
import { CreateUserUseCase } from '@/usecases/CreateUserUseCase';
import { ListContactsUseCase } from '@/usecases/ListContactsUseCase';
import { Errors } from '@/errors/Errors';
import { describe, expect, test } from 'vitest';
import { MemoryRepository } from '@/adapters/MemoryRepository/MemoryRepository';
import { type ContactInDTO } from '@/dtos/Contact.indto';

describe(
  'AddContactUseCase Specification',
  async () => {

    const validName = 'Jonh Doe';
    const validEmail = 'jonhdoe@test.com';
    const validPassword = '123456';
    const validContactEmail = 'test@test.com';
    const validContactPhone = '999999999';
    const validContactName = 'Test Silva';
    const invalidUserId = '0';
    
    const repository = new MemoryRepository();
    const createUserUseCase = new CreateUserUseCase(repository);
    const user = await createUserUseCase.execute({ name: validName, email: validEmail, password: validPassword });
    
    const contactDto: ContactInDTO = {
      name: validContactName,
      emails: [{ address: validContactEmail }],
      phoneNumbers: [{ number: validContactPhone }]
    };
    
    const addContactUseCase = new AddContactUseCase(repository);
    const getContactsUseCase = new ListContactsUseCase(repository);
    
    test('Should add a contact to the user', async () => {

      const contact = await addContactUseCase.execute(user.id, contactDto);
      const expectedContacts = await getContactsUseCase.execute(user.id);
      expect(expectedContacts).toEqual([contact]);
    
    });

    test('Should throw an error', async () => {

      const expectation = expect(async () => { await addContactUseCase.execute(invalidUserId, contactDto); });
      await expectation.rejects.toThrowError(Errors.unexistentUserError);
    
    });
  
  }
);
