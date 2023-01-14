# hello,glad you're here
### lets talk briefly about the project
> there was a game before called flappy bird can you recall it? well if you can't that one would remind you..
ideaa of the game is you're playing in bird rule passing through some obstacles you avoid crashing or you'll start again , obstacles are 2 collums vertically alligned and you need to pass between them to keep playing and get a point for every obstacle you passed...
### how that was done with react?
>simply using some constants for bird size and game-box size, and obstacles size(width and height), clicking on game box in beginning will start the game then it'll make the bird jump(decraease top positioning of the bird inside the game box),and starting the game will triger 3 useEffects
1. for gravity and making the bird position go down continously with time
2. for moving the obstacles horizontally so the bird whichs position is fixed horizontally pass by it
- if he passed will create new obstacle with new heights, increment the total score by one, and with time gap between 2 columns decrease to make it more difficult.

3. that one willl check if bird have height within any obstacle barrier and the same time bird and obstacles are met horizontally when obstacle position horizontally be 0 (which will be last till it pass by the full width) and that's the default fixed bird position
 - if that happened the score will be reset and game will end and we get back to the starting point