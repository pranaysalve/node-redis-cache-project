const sessionFactory = require("./factories/sessionFactory");
const userFactory = require("./factories/userFactory");
const Page = require("./helpers/page");
const soundPlay = require("./sound/sound");
let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto("localhost:3000");
});

afterEach(async () => {
  await page.close();
});

test("Test1 Header has correct text", async () => {
  const selector = "a.brand-logo";
  await page.waitForSelector(selector, {
    visible: true,
    timeout: 5000,
  });
  const text = await page.$eval(selector, (el) => el.innerHTML);
  expect(text).toEqual("Blogster");
});

test("Test2 clicking login start oauth flow", async () => {
  await page.click("ul.right a");
  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test("Test3 when signed in, shows logout button", async () => {
  const user = await userFactory();
  const { session, sig } = sessionFactory(user);
  await page.setCookie({ name: "session", value: session });
  await page.setCookie({ name: "session.sig", value: sig });

  await page.goto("localhost:3000");

  const selector = 'a[href="/auth/logout"]';

  await page.waitForSelector(selector, {
    visible: true,
    timeout: 5000,
  });

  const text = await page.$eval(selector, (el) => el.innerHTML);

  expect(text).toEqual("Logout");
  soundPlayer();
});
