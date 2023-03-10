import request from 'supertest';
import {ImageRoute} from '@/routes';
import App from '@/app';
import {mongoose} from "@typegoose/typegoose";

describe('ImageRoute', () => {

    const imageRoute = new ImageRoute();
    mongoose.connect = jest.fn();

    const app = new App([imageRoute]);

    describe('POST /image/single', () => {
        it('should return 400 if file is not an image', async () => {
            console.log(__dirname)
            const res = await request(app.getServer())
                .post(`${imageRoute.path}/single`)
                .attach('image', `C:/Users/xflas/OneDrive/Documents/Freelance/amazone-BE/src/test/data/not-an-image.txt`, {contentType: 'text/plain'})
            expect(res.body.message).toBe('Only .png, .gif and .jpeg format allowed!');
        });
    ``
        it('should return 200 and the resized image url', async () => {
            const res = await request(app.getServer())
                .post('/image/single')
                .attach('image', 'C:/Users/xflas/OneDrive/Documents/Freelance/amazone-BE/src/test/data/test.jpg')
                .expect(200);

            expect(res.body.url).toBeDefined();
        });
    });



    describe('POST /image/multiple', () => {
        it('should return 400 if no files were uploaded', async () => {
            const res = await request(app.getServer())
                .post('/image/multiple')
                .expect(400);

            expect(res.text).toBe('No files were uploaded');
        });

        it('should return 400 if uploaded file is not an image', async () => {
            const res = await request(app.getServer())
                .post('/image/multiple')
                .attach('image', './test/data/not-an-image.txt')
                .expect(400);

            expect(res.text).toBe('Uploaded file is not an image');
        });

        it('should return 200 and an array of resized image urls', async () => {
            const res = await request(app.getServer())
                .post('/image/multiple')
                .attach('image', './test/data/test.jpg')
                .attach('image', './test/data/test.png')
                .expect(200);

            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body).toHaveLength(2);
            expect(res.body[0]).toHaveProperty('url');
            expect(res.body[1]).toHaveProperty('url');
        });
    });
});

