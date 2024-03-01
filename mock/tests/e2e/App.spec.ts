import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach("load page", async ({ page }) => {
  await page.goto("http://localhost:8000/"); // ... you'd put it here. // TODO: Is there something we need to do before every test case to avoid repeating code?
});

test("on page load, i see a login button", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box unless proper login, not empty", async ({
  page,
}) => {
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible(); // click the login button shouldn't move foward without details (even multiple times)

  await page.getByLabel("Login").click(); // await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();
});

test("entering valid credentials logs the user in, then logging out", async ({
  page,
}) => {
  await expect(page.getByLabel("Command input")).not.toBeVisible();
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  const usernameLabel = page.getByText("Username:");
  expect(usernameLabel).toBeVisible();
  const usernameLabel1 = page.getByText("Password:");
  expect(usernameLabel1).toBeVisible();

  await page.fill('input[name="username"]', "admin");
  await page.fill('input[name="password"]', "password");
  await page.getByLabel("Login").click();

  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel('input[name="username"]')).not.toBeVisible();
  await expect(page.getByLabel('input[name="password"]')).not.toBeVisible();

  await expect(page.getByLabel("Command input")).toBeVisible();

  await page.getByLabel("Sign Out").click();
  await expect(page.getByLabel("Command input")).not.toBeVisible();
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
});

test("incorrect credentials don't move forwards", async ({ page }) => {
  // Fill in the username input field
  await page.fill('input[name="username"]', "error"); // Fill in the password input field

  await page.fill('input[name="password"]', "wrong");

  await page.getByLabel("Login").click(); // page not progressed
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
});

test("loading and viewing different files", async ({ page }) => {
  // Step 1: Navigate to a URL

  // Fill in the username input field
  await page.fill('input[name="username"]', "admin"); // Fill in the password input field

  await page.fill('input[name="password"]', "password");

  await page.getByLabel("Login").click(); // loading standard file

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load standard");
  const mock_input = `load standard`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
  await page.click('button:has-text("Submit")'); // view call

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.click('button:has-text("Submit")'); // confirming file has been loaded

  const replHistoryText = await page.textContent(".repl-history");
  expect(replHistoryText).toContain("11223"); // loading new file to replace

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load malformed");
  await page.click('button:has-text("Submit")'); // viewing
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.click('button:has-text("Submit")'); // confirming second file was also successfully produced
  const replHistoryTextPost = await page.textContent(".repl-history");
  expect(replHistoryTextPost).toContain("Sanfrancisco"); // loading empty file

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load empty");
  await page.click('button:has-text("Submit")'); // viewing empty
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.click('button:has-text("Submit")');
});

test("Proper Mode Reactions", async ({ page }) => {
  // Step 1: Navigate to a URL

  // Fill in the username input field
  await page.fill('input[name="username"]', "admin"); // Fill in the password input field

  await page.fill('input[name="password"]', "password");

  await page.getByLabel("Login").click(); // load standard file

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load standard");
  const mock_input = `load standard`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
  await page.click('button:has-text("Submit")'); // view and confirm lack of verbose "command"

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.click('button:has-text("Submit")');
  const replHistoryTextPre = await page.textContent(".repl-history");
  expect(replHistoryTextPre).not.toContain("Command:"); // enter mode to change

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.click('button:has-text("Submit")'); // confirm verbose mode

  const replHistoryText = await page.textContent(".repl-history");
  expect(replHistoryText).toContain("Command:"); // switch back and confirm again

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.click('button:has-text("Submit")');
  const replHistoryTextPost = await page.textContent(".repl-history");
  expect(replHistoryTextPost).not.toContain("Command:");
});

test("Searching files by different methods", async ({ page }) => {
  // Fill in the username input field
  await page.fill('input[name="username"]', "admin"); // Fill in the password input field

  await page.fill('input[name="password"]', "password");

  await page.getByLabel("Login").click(); // loads file

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load standard");
  await page.click('button:has-text("Submit")'); // searches file

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search tx state"); //search_3
  await page.click('button:has-text("Submit")'); // confirms search is produced

  const replHistoryTextPost = await page.textContent(".repl-history");
  expect(replHistoryTextPost).toContain(
    "Output: The file 'standard' was successfully loadedOutput: 90249755MadisonTXUSA69738631FranklinTXUSA24321394DallasTXUSA"
  );
  // second load and search
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load malformed");
  await page.click('button:has-text("Submit")');

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 12345 1"); //search_4
  await page.click('button:has-text("Submit")'); // confirms search result

  const replHistoryText = await page.textContent(".repl-history");
  expect(replHistoryText).toContain(
    "Output: The file 'standard' was successfully loadedOutput: 90249755MadisonTXUSA69738631FranklinTXUSA24321394DallasTXUSAOutput: The file 'malformed' was successfully loadedOutput: 12312345SpringfieldILUSA"
  );
});

test("All ill commands and confirming proper error printing", async ({
  page,
}) => {
  // Step 1: Navigate to a URL

  // Fill in the username input field
  await page.fill('input[name="username"]', "admin"); // Fill in the password input field

  await page.fill('input[name="password"]', "password");

  await page.getByLabel("Login").click(); // loading nonexistent file

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load DNE");
  await page.click('button:has-text("Submit")'); // improper file call

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load 1 2");
  await page.click('button:has-text("Submit")'); // viewing without file loaded

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.click('button:has-text("Submit")');

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load standard");
  await page.click('button:has-text("Submit")'); // improper search format

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 1 2");
  await page.click('button:has-text("Submit")'); // nothing found

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 1");
  await page.click('button:has-text("Submit")'); // improper call to mode

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode 2");
  await page.click('button:has-text("Submit")'); // unknown command

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("orange");
  await page.click('button:has-text("Submit")'); // checks for presence of all unique errors.

  const replHistoryText = await page.textContent(".repl-history");

  // Confirming that every unique error message has been added to the history
  expect(replHistoryText).toContain("Output: The file 'DNE' not found");
  expect(replHistoryText).toContain(
    "Output: Invalid args: load_file should have one argument (example: load_file <filename>)"
  );
  expect(replHistoryText).toContain("Output: Load a CSV file first");
  expect(replHistoryText).toContain(
    "Output: Invalid argument: search should have two arguments (example: search <value> <column> )"
  );
  expect(replHistoryText).toContain("Output: No results for '1 1'");

  expect(replHistoryText).toContain("Output: Mode should have no arguments.");
  expect(replHistoryText).toContain("Output: Please enter a valid command");
});
