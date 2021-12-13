# CODE PUSH

Refer: https://docs.microsoft.com/en-us/appcenter/sdk/getting-started/react-native

## Sign up account in CodePush https://appcenter.ms 

## Install code-push cli and add application in code-push

$ npm install -g code-push-cli
$ code-push login
$ code-push app add <project-name> ios react-native


code-push app add prostylee-ios ios react-native

┌────────────┬───────────────────────────────────────┐
│ Name       │ Deployment Key                        │
├────────────┼───────────────────────────────────────┤
│ Production │ qQST4Mf7mYj9Kyy8ngxol_W5nBAGNqRH_JQ8v │
├────────────┼───────────────────────────────────────┤
│ Staging    │ TutHwsJQsyGyGleH_uF7gdID1VlBGvmc3Jn83 │
└────────────┴───────────────────────────────────────┘

code-push app add prostylee-android android react-native
┌────────────┬───────────────────────────────────────┐
│ Name       │ Deployment Key                        │
├────────────┼───────────────────────────────────────┤
│ Production │ dbrGodNJ24v3mmxe1SFj51DCLabws8MZyQCch │
├────────────┼───────────────────────────────────────┤
│ Staging    │ U72SWKiRzh6sI3_X_aCix1PLpYTw6R4_EVDCT │
└────────────┴───────────────────────────────────────┘



## Deployment and release

Refer: https://docs.microsoft.com/en-us/appcenter/cli/

$ npm install -g appcenter-cli

Logging in:
- Open a terminal/command window.
- Run `appcenter login`. This opens a browser and generates a new API token.
- Copy the API token from the browser, and paste this into the command window.
- Run `appcenter profile list` to get the information about logged in user.

Deployment: "Staging" and "Production"

> appcenter codepush release-react -a prostylee.com/prostylee-ios -d Staging