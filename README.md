# funda

First, replace in `.env` file value of USER_AGENT with propper one.

Then, run the tests with `npx playwright test`

# P.S.

guys you have inconsistent usage of test locators `data-test-id` and `data-testid`.
The most pitty thing that `data-testid` is default in playwright but in funda.nl it have been used only several times and there is more `data-test-id` which bring additional burden of custom configuraion. Maybe you have some reason to do that, but it puzzled me.
