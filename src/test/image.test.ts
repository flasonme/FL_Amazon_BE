import request from 'supertest';
import { ImageRoute } from '@/routes';
import { ImageController } from '@/controllers';
import App from '@/app';

describe('ImageRoute', () => {
  const imageController = new ImageController();
  const imageRoute = new ImageRoute(imageController);

  const app = new App([imageRoute]);

  describe('POST /image/single', () => {
    it('should return 400 if file is not an image', async () => {
      const res = await request(app.getServer())
        .post('/image/single')
        .attach('image', './test/fixtures/not-an-image.txt')
        .expect(400);

      expect(res.body.message).toBe('File is not an image');
    });

    it('should return 200 and the resized image url', async () => {
      const res = await request(app.getServer())
        .post('/image/single')
        .attach('image', './test/fixtures/test.jpg')
        .expect(200);

      expect(res.body).toHaveProperty('url');
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
        .attach('image', './test/fixtures/not-an-image.txt')
        .expect(400);

      expect(res.text).toBe('Uploaded file is not an image');
    });

    it('should return 200 and an array of resized image urls', async () => {
      const res = await request(app.getServer())
        .post('/image/multiple')
        .attach('image', './test/fixtures/test.jpg')
        .attach('image', './test/fixtures/test.png')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(2);
      expect(res.body[0]).toHaveProperty('url');
      expect(res.body[1]).toHaveProperty('url');
    });
  });
});

