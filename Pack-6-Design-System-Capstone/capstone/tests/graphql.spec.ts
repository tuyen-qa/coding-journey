import { test, expect } from '@playwright/test';
test('hello from gateway', async ({ request, baseURL })=>{
  const res = await request.post(baseURL + '/graphql', { data: { query: '{ hello }' } });
  expect(res.ok()).toBeTruthy();
  const j = await res.json();
  expect(j.data.hello).toBe('world');
});
