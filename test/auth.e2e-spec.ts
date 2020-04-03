import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as crypto from 'crypto';

function randomBytes (length: number) {
    return new Promise<string>(resolve => {
        crypto.randomBytes(length, ((err, buf) => {
            resolve(buf.toString('hex'));
        }))
    })
}

let app: INestApplication;

let agent;
let username: string;

describe('Sign up test', () => {
    it('Should return user with profile_id', async () => {
        const newUserStub = {
            username,
            email: username + '@gmail.com',
            password: 'password123qwe',
            group: 'teacher',
        };
        const res = await agent
           .post('/signup')
           .send(newUserStub);

        expect(res.status).toBe(HttpStatus.CREATED);
        expect(res.body).toHaveProperty('id');
    });
});

describe('Sign in test', () => {
    it('Should login', async () => {
        const credentialInfo = {
            username,
            password: 'password123qwe'
        };
        const res = await agent
            .post('/login')
            .send(credentialInfo);
        expect(res.status).toBe(HttpStatus.CREATED);
        expect(res.body).toHaveProperty('username');
    });
});

describe('Profile test', () => {
    it ('Should get user profile', async () => {
        const res = await agent.get('/profile?me=true');
        expect(res.status).toBe(HttpStatus.OK);
        expect(res.body[0]).toHaveProperty('user_id');
    });
});

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    agent = request.agent(app.getHttpServer());
    username = (await randomBytes(40)).substr(0, 40);
});

afterAll(async () => {
   await app.close();
});
