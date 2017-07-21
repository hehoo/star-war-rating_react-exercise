class SwcNameFilter {
    constructor(characters) {
        this.characters = characters;
    }

    filter(keyword) {
        if(this.characters) {
            return [...this.characters.values()].filter(character => character.name.toLowerCase().includes(keyword.toLowerCase()));
        }
        return null;
    }
}

export default SwcNameFilter;