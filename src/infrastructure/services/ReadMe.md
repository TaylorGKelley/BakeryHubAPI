# Purpose

This folder should host files responsible for encapsulating external services or integrations.

i.e. - Composer classes responsible for importing external dependencies and injecting them into usable functions.

```typescript
// This function imports the database, injecting it to the UserRepository,
// injecting this and the passwordHasher into the useCase, which is injected into the controller.
export function createUserComposer() {
	const repository: IUsersRepository = new UserRepository(prismaClient);
	const passwordHasher: IPasswordHasher = new PasswordHasher();
	const useCase: ICreateUserUseCase = new CreateUserUseCase(
		repository,
		passwordHasher
	);
	const controller: IController = new CreateUserController(useCase);
	return controller;
}
```
