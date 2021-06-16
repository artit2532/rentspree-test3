const axios = require("axios");

const dictionaryURL = "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt";

let dict = Object.create(null), words, wordsIndex;
const prepareDictBeforeReady = false;

const ready = new Promise(function (resolve, reject) {
  axios.get(dictionaryURL)
    .then(response => {
      // do something about response
      words = response.data.split('\r\n');
      wordsIndex = new Array(words.length);
      for (let i = 0; i < wordsIndex.length; i++) {
        wordsIndex[i] = i;
      }
      if (prepareDictBeforeReady) {
        for (let i = 0; i < words.length; i++) {
          searchNode(words[i]);
        }
      }

      resolve();
    })
    .catch(err => {
      console.error(err)
      reject(err);
    })
});

function search(searchText) {
  if (!searchText || searchText.length === 0) return words; // return all

  let node = searchNode(searchText);
  let c = node.length;
  if (c === 0) return [];

  let result = new Array(c);
  for (let i = 0; i < c; i++) {
    result[i] = words[node[i]];
  }
  return result;
}

function createNode(key, parentNode) {
  let node = [];
  let charAt = key.length - 1;
  let char = key[charAt];
  let c = parentNode.length;
  for (let i = 0; i < c; i++) {
    let wIndex = parentNode[i];
    let word = words[wIndex];
    if (char === word[charAt]) {
      node.push(wIndex);
    }
  }
  return node;
}

/**
 * travel, create and search node
 */
function searchNode(searchText) {
  if (!dict[searchText]) {
    let flagment = '';
    let node = wordsIndex;
    for (let i = 0; i < searchText.length; i++) {
      flagment += searchText[i];
      if (dict[flagment]) {
        node = dict[flagment];
        continue; // continue to create new node
      } else {
        if (node.length === 0) return node;
        if (node.length === 1) { // has one child then check and return
          let wordIndex = node[i];
          let word = words[wordIndex];
          if (word === searchText) return node;
        }

        // create new node
        node = dict[flagment] = createNode(flagment, node);
      }
    }
  }

  return dict[searchText];
}

module.exports = { search, ready };