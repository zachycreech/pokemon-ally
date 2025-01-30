# Simple Pokedex

This is app was created with `create-expo-app@latest` and displays the first 151 pokemon, their descriptions from all of the games, and allows you to add Pokemon to your party. 

## How to Run

Clone this repo and cd into it.
`npm i && npm run ios`
This will spin up a expo, and you will be able to Scan the QR code and install the app on your phone.

### API
https://pokeapi.co/
I decided to use the pokeapi because I thought it would be fun to make a bulbapedia type app. And I limited the pokemon fetched to the first 151 or the first generation pokemon, to limit the amount of data necessary for this app to keep it clean and fast and the first gen pokemon are my personal favorite. I have used react-query to fetch the api's various endpoints.

### Functionality
- The app display a list of sprites which onPress navigate you to a details page. 
- On the details page I have setup a larger front and back sprite image, along with the types of that pokemon, descriptions from the various games, and the legacy sounds of the pokemon from the game.
- Additionally I have added the ability to add and remove pokemon from your team, which can be seen at in the drawer on the Home screen.
- The drawer shows your Team of pokemon with a limit of 6, just like in the games, and onPressing the pokemon it will vibrate the phone and play the pokemon's sound while navigating you to their details page. LongPressing will remove that pokemon from the spot on your team, allowing you to add an additional pokemon.
- Async Storage
- Haptic Feedback onPress for Team

### UI Design
- React-Navigation, stack and drawers, I chose to go with these because of the simlicity to implement and the natural flow that they provide
- React-Native-Paper, buttons, These provide some simplistic styling and easy to add props/icons and purple is the default color which is my favorite.
- React-Native, SafeAreaView/View/Text/Stylesheet, These are pretty standard with react-native apps, react-native-size-matters stylesheet does give more options to add more dynamic styling based on the users device, but I only tested this on my personal iPhone 14 pro and iPhone 16 pro simulator.
- Expo-Av, pokemon sounds, this was just a fun little side thing I worked on because I wanted to do more with ffmpeg, I will touch on this more in the challenges section.
- React-native-vector-icons, navigation icons, this just comes as a pre-requisite to react-navigation and didn't change any of the default icons.
- Redux and Async storage, persisiting your team through app closes, I didn't want to lose the team whenever the app was either hot-refreshed or close and re-opened. 

### Data Storage
I decided to go with a persisting redux store using async storage, to save Your Pokemon Team, allowing a user to add their favorite pokemon to their team and that saving with app closure. Chose a super simple approach just due to time restraints and I couldn't think of a use case for this app to go with something like a database. I am sure there is one, but nothing came to mind while running through this.

### Challenges
#### .ogg files on iPhone within a expo app. 
Expo limits a react native app to not allow for a react-native bridge to native code. This is a feature to keep it clean and simple, but in doing so some of the functionality like adding ffmpeg to convert .ogg files to .mp3. You can circumvent this by ejecting, but then you lose out on some of the features that are bundled with using an expo app. 

Which brings me to my first challenge. I wanted to play the legacy pokemon sounds on this app, one because my wife had no clue what I was talking about when describing them to her, and two because I think they are hilariously robotic and nostaligic. But the pokeapi only returns the pokemon cries as .ogg files, which do not work on iPhone. So I needed to convert them to an mp3. I could make a backend specifically to do just that but would have added a ton of unnecessary work, and would cause the app to be extremely dependent on the internet. So instead I decided I would just figure out where the pokemon sounds were coming from and write a quick bash script to download those sounds and then convert them to an mp3 and store it within the app.(Shout out to Google for helping with this bash script) 

So having done that, I now needed to require those assets within the app to allow for expo to play it with the expo-av package. But then I realized that the `require()`  is only available on static assets. So I couldn't import it dynamically which meant I would need to have 151 lines of require('./1.mp3') and so on. So thankfully I realized there was a bash command that could absolutely do that for me rather than me manually writing it all line by line. So a quick google search brought me to `seq` and I was able to make a soundMap file with all of those requires and got the sound to work without any errors.

Overall 10/10 solution at least for me, because I got to learn more about ffmpeg which is just the most ridicuously powerful tool for conversions and seq is a new bash command in my toolbelt. 

#### setup mac mini for development
So I originally bought this mac mini that I am presently developping on to be used to build out React-Native apps but never went through the process of getting my development workflow all setup. And thankfully I do have all of my dotfiles saved on my github with stow and all the good stuff. But it always surprises me how much extra you end up needing to add like ssh keys, LSPs for neovim, nvm, tiling managers, brew, and etc. So some time was spent just setting that up. But I am happy with where this mac mini is at now. 

### Improvements
- Add tests
- Add additional styling
- Add icons to pokemon types
- Add more data points to details page
- Add snackbar to show when pokemon is added to team/ remove from team

