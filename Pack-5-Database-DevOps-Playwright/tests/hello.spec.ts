import { test, expect } from '@playwright/test';
test('hello endpoint', async ({ request })=>{
  const name = 'dev';
  const res = await request.get(`/hello?name=${name}`);
  expect(res.ok()).toBeTruthy();
  const j = await res.json();
  expect(j.hello).toBe(name);
});
