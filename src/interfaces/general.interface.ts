export enum Mode {
    Default = 'default', //when user delete search bar or choose "sve" for category it will be default mode and display infinite scroll
    Search = 'search',   //when user type something in search bar it will be search mode and display search result
    Category = 'category', //when user click on category it will be category mode and display category result
}