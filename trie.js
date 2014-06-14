
Trie = function(){
  this.characters = {};
  isWord = false;
};

// you create a new trie only if it doesn't exist
 // else you just return the already learnt word
Trie.prototype.learn = function(word, index){
  index = index || 0;
  var char = word[index];
  if (index == word.length) {
    this.isWord = true;
    return this;
  } else if (this.characters[char] === undefined) {
    this.characters[char] = new Trie();
    this.characters[char].learn(word, index + 1);
  } else {
    this.characters[char].learn(word, index + 1);
  }
};

Trie.prototype.getWords = function(words, currentWord){
  words = words || [];
  currentWord = currentWord || "";
  if (this.isWord === true) {
    words.push(currentWord);
  }
  for (var char in this.characters) {
    var child = this.characters[char];
    stuff = currentWord + char;
    child.getWords(words, stuff);
  }
  return words;
};

Trie.prototype.find = function(word, index){
  index = index || 0;

  if (index > word.length || index < 0) {
    return false;
  }

  var char = word[index];

  if (index === word.length) {
    return this;
  } else if (this.characters[char]) {
    return this.characters[char].find(word, index + 1);
  } else {
    return false;
  }
};


Trie.prototype.autoComplete = function(prefix){
  //find the given prefix
  //return all words for that prefix
  prefix = prefix || "";
  
  var prefixNode = this.find(prefix);
  //if prefix is found, return all results of words for the given prefix
  //if it is not found, return sorry not found
  if(prefixNode !== false){
    results = prefixNode.getWords()
    for (var i = 0; i < results.length; i++) {
      results[i] = prefix + results[i];
    }
    return results;
  } else {
    return [];  
  }
};

try{
  module.exports = Trie
} catch(e){

}