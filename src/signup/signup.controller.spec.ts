import { Test, TestingModule } from '@nestjs/testing';
import { SignUpController } from './signUpController';

describe('SignUp Controller', () => {
  let controller: SignUpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignUpController],
    }).compile();

    controller = module.get<SignUpController>(SignUpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
